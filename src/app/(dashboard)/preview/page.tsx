"use client";

import Error from "@/@core/components/common/Error";
import LinkCard from "@/@core/components/common/LinkCard";
import Loading from "@/@core/components/common/Loading";
import withAuth from "@/@core/components/common/WithAuth";
import DisplayPreviewProfile from "@/@core/components/sections/DisplayPreviewProfile";
import PreviewBanner from "@/@core/components/sections/PreviewBanner";
import { useLinks } from "@/@core/hook/useLinks";

const Preview = (): JSX.Element => {
  const { links } = useLinks();

  const loading = false;
  const error = null;

  if (loading) return <Loading />;
  if (error) return <Error />;

  const containerClass =
    links && links.length > 5
      ? "sm:no-scrollbar sm:h-[360px] sm:overflow-y-auto "
      : "h-auto";

  return (
    <main className="relative">
      <PreviewBanner />
      <section className="relative">
        <div className="hidden sm:block absolute top-[-120px] left-0 z-10 bg-dark-purple w-full h-[357px] rounded-b-3xl"></div>
        <div className="relative z-0 bg-white sm:bg-background-white w-screen h-screen"></div>
        <div className="absolute z-20 top-0 left-0 w-full h-full">
          <div className="flex justify-center">
            <div className="w-full sm:w-[390px] h-full sm:h-[710px] bg-white sm:rounded-3xl sm:shadow-custom-gray sm:mt-10">
              <div className=" flex flex-col items-center w-full h-full p-12 gap-10">
                <div className="w-[200px] h-[200px]">
                  <DisplayPreviewProfile />
                </div>
                <div className={`${containerClass} w-full`}>
                  <LinkCard links={links} />
                </div>
              </div>
             
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default withAuth(Preview);
