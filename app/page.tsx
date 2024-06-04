import Image from "next/image";
import { getCampaignInfo } from "@/app/actions";
import { SubmitButton } from "./SubmitButton";
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <form action={getCampaignInfo}>
        <section className="bg-white dark:bg-gray-900">
          <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
            <div className="mx-auto max-w-screen-md sm:text-center">
              <h2 className="mb-4 text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl dark:text-white">
                Improve your JustGiving campaign sharing link
              </h2>
              <p className="mx-auto mb-8 max-w-2xl font-light text-gray-500 md:mb-12 sm:text-xl dark:text-gray-400">
                Paste your JustGiving campaign URL below to generate a new
                sharing link with a dynamically generated opengraph image
                containing more details about the campaign.
              </p>

              <div className="items-center mx-auto mb-3 space-y-4 max-w-screen-sm sm:flex sm:space-y-0">
                <div className="relative w-full">
                  <label
                    htmlFor="url"
                    className="hidden mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    URL
                  </label>

                  <input
                    className="block p-3  w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:rounded-none sm:rounded-l-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="https://www.justgiving.com/campaign/Robburrowappeal"
                    type="text"
                    id="url"
                    name="url"
                    defaultValue="https://www.justgiving.com/campaign/Robburrowappeal"
                  />
                </div>
                <div>
                  <SubmitButton />
                </div>
              </div>
            </div>
          </div>
        </section>
      </form>
    </main>
  );
}
