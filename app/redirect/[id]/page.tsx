import React, { Suspense } from "react";
import type { Metadata, ResolvingMetadata } from "next";
import { getInfoFromDb } from "@/app/actions";
import Redirect from "./Redirect";
export const revalidate = 60;

type Props = {
  params: { id: string };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const id = params.id;
  const {
    Title,
    url,
    TargetAmount,
    percentage,
    TotalNumberOfDonations,
    ImageName,
    TotalAmount,
    Summary,
  } = await getInfoFromDb(id);
  const imageString = `/api/og?title=${Title}&TargetAmount=${TargetAmount}&percentage=${percentage}&TotalNumberOfDonations=${TotalNumberOfDonations}&CurrentTotal=${TotalAmount}&ImageName=${ImageName}&cache=${Date.now()}`;
  return {
    title: Title,
    description: Summary,
    openGraph: {
      title: Title,
      description: Summary,
      url: url,
      siteName: "JustGiving",
      images: [
        {
          url: `https://alzheimers-society.tedspace.dev/${imageString}`, // Must be an absolute URL
          width: 1200,
          height: 630,
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: Title,
      description: Summary,
      creator: "@justgiving",
      images: {
        url: `https://alzheimers-society.tedspace.dev/${imageString}`,
        alt: `Image for ${Title} campaign`,
      },
    },
  };
}

const ResultPage = async ({ params }: Props) => {
  const id = params.id;
  const { url } = await getInfoFromDb(id);

  return (
    <>
      <Suspense
        fallback={
          <div className="flex flex-col justify-center">
            <p className="text-2xl font-bold text-center">Redirecting...</p>
          </div>
        }
      >
        <Redirect url={url} />
      </Suspense>
    </>
  );
};

export default ResultPage;
