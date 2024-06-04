import { ImageResponse } from "next/og";

const defaultProps = {
  bgColor: "#FFFFFF",
  fgColor: "#000000",
  level: "L",
  size: 300,
};

// App router includes @vercel/og.
// No need to install it.

export const runtime = "edge";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const hasTitle = searchParams.has("title");
    const title = hasTitle
      ? searchParams.get("title")?.slice(0, 100) || ""
      : "";
    const amount = new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: "GBP",
      maximumFractionDigits: 0,
    }).format(Math.round(parseInt(searchParams.get("TargetAmount") || "")));
    const percentage = searchParams.get("percentage") || "";
    const donations = new Intl.NumberFormat("en-GB", {}).format(
      searchParams.get("TotalNumberOfDonations") || ""
    );
    const image = searchParams.get("ImageName") || "";
    const currentTotal = new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: "GBP",
      maximumFractionDigits: 0,
    }).format(Math.round(parseInt(searchParams.get("CurrentTotal") || "", 10)));
    console.log({
      title,
      amount,
      percentage,
      donations,
      image,
    });
    return new ImageResponse(
      (
        // Modified based on https://tailwindui.com/components/marketing/sections/cta-sections
        <div
          tw="flex flex-col w-full h-full justify-center "
          style={{
            backgroundImage: `url(https://images.justgiving.com/image/${image})`,
            backgroundSize: "1200 px 630px",
            badkgroundReapeat: "no-repeat",
            backgroundPosition: "center",
          }}
        >
          <div tw="flex flex-col items-end self-end justify-end bg-white/70 w-auto p-6 rounded-l-lg">
            <div tw="flex flex-row items-center justify-center self-center">
              <svg width="260" height="260" viewBox="0 0 260 260">
                <circle
                  class="bg"
                  cx="130"
                  cy="130"
                  r="115"
                  fill="none"
                  stroke="none"
                  strokeWidth="25"
                ></circle>
                <circle
                  class="fg"
                  cx="130"
                  cy="130"
                  r="115"
                  fill="none"
                  stroke="#5E2A93"
                  strokeWidth="25"
                  strokeLinecap="round"
                  strokeDasharray={`${(percentage / 100) * 722.5} ${
                    722.5 - (percentage / 100) * 722.5
                  } `}
                  transform="rotate(-90 130 130)"
                ></circle>
              </svg>
              <p
                tw="text-[50px] font-black text-gray-800 ml-4"
                style={{
                  position: "absolute",
                }}
              >
                {percentage}%
              </p>
            </div>
            <div tw="flex flex-col justify-center items-center">
              <div
                tw="flex"
                class="cp-heading-large branded-text"
                style={{
                  color: "#5E2A93",
                  fontSize: "3.6rem",
                  lineHeight: "4.8rem",
                }}
              >
                {currentTotal}
              </div>
              <div
                class="cp-body-medium text-gray-800"
                tw="flex gap-2"
                style={{
                  fontSize: "1.6rem",
                  lineHeight: "2.4rem",
                  letterSpacing: ".005em",
                  fontWeight: "400",
                }}
              >
                <span tw="mh-2 inline-flex">raised of</span>{" "}
                <span
                  tw="mx-1 inline-flex"
                  class="branded-text"
                  style={{
                    color: "#5E2A93",
                  }}
                >
                  {amount}
                </span>{" "}
                <span>target</span>
              </div>
              <div
                class="cp-body-medium"
                tw="flex"
                style={{
                  fontSize: "1.6rem",
                  lineHeight: "2.4rem",
                  letterSpacing: ".005em",
                  fontWeight: "400",
                }}
              >
                <span class="text-color-grey-300" tw="mx-1 inline-flex">
                  by
                </span>{" "}
                <span tw="mx-1 inline-flex text-[#5E2A93]">{donations}</span>{" "}
                supporters
              </div>
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
