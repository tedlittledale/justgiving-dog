import Image from "next/image";
import { getInfoFromDb } from "@/app/actions";

import SharingBox from "./SharingBox";
type Props = {
  params: { id: string };
};
export default async function New({ params }: Props) {
  const id = params.id;
  console.log({ id });

  const {
    Title,
    TargetAmount,
    percentage,
    TotalNumberOfDonations,
    ImageName,
    TotalAmount,
    Summary,
  } = await getInfoFromDb(id);

  const imageString = `/api/og?title=${Title}&TargetAmount=${TargetAmount}&percentage=${percentage}&TotalNumberOfDonations=${TotalNumberOfDonations}&CurrentTotal=${TotalAmount}&ImageName=${ImageName}&cache=${Date.now()}`;
  return (
    <main className="flex min-h-screen flex-col items-center content-around text-center  p-4 lg:p-16">
      <section className="bg-white dark:bg-gray-900 w-full">
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6 w-full">
          <div className="mx-auto max-w-screen-md sm:text-center w-full">
            <h2 className="mb-4 text-xl sm:text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl dark:text-white">
              Here is your new sharing link
            </h2>
            <SharingBox id={id} />
          </div>
        </div>
      </section>
      <h3 className="mb-4 text-xl sm:text-2xl text-balance font-extrabold text-gray-900 sm:text-2xl dark:text-white sm:w-[400px]">
        Here is a preview of how it will look when shared on social media
      </h3>
      {/* <Image src={imageString} alt="" width={1200} height={630} /> */}
      <div className="sm:w-[524px] max-w-full cursor-pointer font-[Helvetica]">
        <div className="border-[1px] border-b-0 border-[#dadde1] bg-cover bg-center bg-no-repeat">
          <div className="w-full relative ">
            <img
              className="w-full  top-0 object-cover block"
              src={imageString}
              alt="campaign image"
            />
          </div>
        </div>
        <div className="break-words border-[1px] border-[#dadde1] bg-[#f2f3f5] px-[12px] py-[10px] antialiased">
          <div className="overflow-hidden truncate whitespace-nowrap text-[12px] uppercase leading-[11px] text-[#606770]">
            justgiving.com
          </div>
          <div className="block h-[46px] max-h-[46px] border-separate select-none overflow-hidden break-words text-left">
            <div className="mt-[3px] truncate pt-[2px] text-[16px] font-semibold leading-[20px] text-[#1d2129]">
              {Title}
            </div>
            <div className="mt-[3px] block h-[18px] max-h-[80px] border-separate select-none overflow-hidden truncate whitespace-nowrap break-words text-left text-[14px] leading-[20px] text-[#606770]">
              {Summary}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
