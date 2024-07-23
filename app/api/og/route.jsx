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
    const donations = searchParams.get("TotalNumberOfDonations")
      ? new Intl.NumberFormat("en-GB", {}).format(
          searchParams.get("TotalNumberOfDonations") || ""
        )
      : null;

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
            backgroundSize: "1200px auto",
            badkgroundReapeat: "no-repeat",
            backgroundPosition: "center",
          }}
        >
          <div tw="flex flex-col items-end self-end justify-end bg-white/70 w-auto p-6 rounded-l-lg">
            <svg
              width="252"
              height="52"
              viewBox="0 0 252 52"
              transform="scale(2)"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0 1.1001V4.64931H6.41471V20.3001H10.5182V4.64931H16.9615V1.1001H0Z"
                fill="#BD2269"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M24.7616 4.92745C29.1855 4.867 32.9681 8.46078 32.8765 12.7186C32.9681 16.9763 29.1558 20.6306 24.7311 20.5399C20.3073 20.6306 16.5857 16.9763 16.6764 12.7186C16.5857 8.46078 20.3378 4.83678 24.7616 4.92745ZM24.7616 8.64211C22.4734 8.64211 20.8569 10.363 20.8569 12.7488C20.8569 15.0741 22.4734 16.795 24.7616 16.795C26.9888 16.795 28.6673 15.0741 28.6673 12.7488C28.6673 10.4234 26.9888 8.64211 24.7616 8.64211Z"
                fill="#BD2269"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M59.3562 20.2068H55.2377V11.5108C55.2377 9.72951 54.1699 8.61129 52.5525 8.61129C50.936 8.61129 49.7766 9.75885 49.7766 11.4193V20.2068H45.6581V11.5108C45.6581 9.72951 44.5903 8.61129 42.9729 8.61129C41.2953 8.61129 40.197 9.72951 40.197 11.5108V20.2068H36.0776V5.26018H39.8611V6.58907C40.8679 5.53129 42.3928 4.92773 44.1323 4.92773C46.1152 4.92773 47.6105 5.65307 48.6172 7.07173C49.8062 5.74285 51.5763 4.92773 53.6499 4.92773C57.19 4.92773 59.3562 7.31262 59.3562 10.9366V20.2068Z"
                fill="#BD2269"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M86.5661 20.2068H82.4476V11.5108C82.4476 9.72951 81.3807 8.61129 79.7624 8.61129C78.1459 8.61129 76.9866 9.75885 76.9866 11.4193V20.2068H72.8681V11.5108C72.8681 9.72951 71.8012 8.61129 70.1829 8.61129C68.5062 8.61129 67.407 9.72951 67.407 11.5108V20.2068H63.2876V5.26018H67.0711V6.58907C68.0778 5.53129 69.6036 4.92773 71.3423 4.92773C73.3252 4.92773 74.8204 5.65307 75.8272 7.07173C77.0171 5.74285 78.7863 4.92773 80.8608 4.92773C84.4 4.92773 86.5661 7.31262 86.5661 10.9366V20.2068Z"
                fill="#BD2269"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M104.258 5.25977V18.698C104.258 20.9629 103.587 22.7442 102.275 24.0429C100.963 25.3407 99.2255 26.0055 97.0279 26.0055C94.3122 26.0055 91.8111 24.9184 90.0105 23.2269L92.1775 20.3887C93.6719 21.6864 94.9839 22.3202 96.6004 22.3202C98.7055 22.3202 100.14 21.2944 100.14 19.0295V18.1238C99.0108 19.1807 97.6386 19.6927 95.9601 19.6927C92.543 19.6927 90.3464 17.2784 90.3464 13.6535V5.25977H94.4649V13.0811C94.4649 14.8624 95.5632 16.01 97.2722 16.01C98.9803 16.01 100.14 14.8322 100.14 13.1113V5.25977H104.258Z"
                fill="#BD2269"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M108.288 0.277344H112.987L111.278 8.67201H108.135L108.288 0.277344Z"
                fill="#BD2269"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M115.925 15.1948C117.238 16.553 118.671 17.2179 120.166 17.2179C121.264 17.2179 122.087 16.7948 122.087 15.9797C122.087 15.3459 121.662 15.1041 120.532 14.6206L118.914 13.9566C116.139 12.8392 114.796 11.601 114.796 9.39658C114.796 6.58858 117.055 4.92725 120.35 4.92725C122.606 4.92725 124.406 5.6828 125.78 7.16191L123.705 9.66858C122.698 8.73258 121.569 8.2508 120.319 8.2508C119.311 8.2508 118.702 8.61169 118.702 9.30591C118.702 9.88013 119.098 10.1521 120.288 10.6348L121.752 11.2392C124.681 12.417 125.994 13.5939 125.994 15.7984C125.994 17.2784 125.444 18.4561 124.315 19.3015C123.216 20.1468 121.813 20.5699 120.104 20.5699C117.451 20.5699 115.224 19.4828 113.85 17.6704L115.925 15.1948Z"
                fill="#BD2269"
              />
            </svg>
            <div tw="flex flex-row items-center justify-center self-center mt-4">
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
                  stroke="#bd2269"
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
                  color: "#bd2269",
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
                    color: "#bd2269",
                  }}
                >
                  {amount}
                </span>{" "}
                <span>target</span>
              </div>
              {donations !== "NaN" ? (
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
              ) : (
                <></>
              )}
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
