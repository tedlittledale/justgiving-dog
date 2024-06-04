"use server";
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
import { redirect } from "next/navigation";

const uri = process.env.MNG_CONNECTION_STRING;
console.log({ uri });

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export async function getInfoFromDb(id: String) {
  try {
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    const collection = client.db("Justgiving-dog").collection("campaigns");
    const row = await collection.findOne({ _id: new ObjectId(id) });
    console.log({ row });
    return row;
  } catch (error) {
    console.log({ error });
  }
}

export async function getCampaignInfo(formData: FormData) {
  const url: string = "" + formData.get("url");

  const shortName = url?.match(/campaign\/([^?]+)/)?.[1];
  console.log({ shortName, url });
  console.log(
    `https://api.justgiving.com/f7da7f38/v1/campaign/byshortname/${shortName}?format=json`
  );
  let redirectUrl = "/";
  try {
    const jgData = await fetch(
      `https://api.justgiving.com/f7da7f38/v1/campaign/byshortname/${shortName}?format=json`
    ).then((res) => res.json());
    const {
      TargetAmount,
      Title,
      Summary,
      Fundraising: {
        Defaults: {
          HeroImage: { ImageName },
        },
      },
      DonationSummary: { TotalAmount, TotalNumberOfDonations },
    } = jgData;
    const percentage = Math.round((TotalAmount / TargetAmount) * 100);
    console.log({
      TargetAmount,
      Title,
      ImageName,
      TotalAmount,
      TotalNumberOfDonations,
      percentage,
      Summary,
    });
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    const collection = client.db("Justgiving-dog").collection("campaigns");
    const row = await collection.insertOne({
      shortName,
      url,
      TargetAmount,
      Title,
      ImageName,
      TotalAmount,
      TotalNumberOfDonations,
      percentage,
      Summary,
    });
    console.log({ row });

    console.log("Connected to MongoDB");
    const insertedId = row.insertedId.toHexString();
    redirectUrl = `/new/${insertedId}`;
    console.log({ redirectUrl });
  } catch (error) {
    console.log({ error });
  }

  redirect(redirectUrl);

  // mutate data
  // revalidate cache
}
