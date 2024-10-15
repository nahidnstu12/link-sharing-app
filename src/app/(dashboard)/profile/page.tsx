"use client";

import Error from "@/@core/components/common/Error";
import Loading from "@/@core/components/common/Loading";
import withAuth from "@/@core/components/common/WithAuth";
import MainLayout from "@/@core/components/sections/MainLayout";
import MobileContainer from "@/@core/components/sections/MobileContainer";
import ProfilContainer from "@/@core/components/sections/ProfilContainer";

const Profil = (): JSX.Element => {
  const loading = false;
  const error = null;

  // useEffect(() => {
  //   fetchData();
  // }, [fetchData]);

  if (loading) return <Loading />;
  if (error) return <Error />;

  return (
    <MainLayout>
      <div className="flex gap-5 mx-auto sm:w-[95%] ">
        <div className=" lg:flex lg:justify-center bg-white w-[45%] hidden rounded-lg mb-6">
          <MobileContainer />
        </div>
        <div className="bg-white w-full lg:w-[60%] rounded-lg mb-6">
          <ProfilContainer />
        </div>
      </div>
    </MainLayout>
  );
};

export default withAuth(Profil);
