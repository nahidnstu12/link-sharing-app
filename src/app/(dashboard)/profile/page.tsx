"use client";

import Error from "@/@core/components/Error";
import Loading from "@/@core/components/Loading";
import MainLayout from "@/@core/components/MainLayout";
import MobileContainer from "@/@core/components/MobileContainer";
import ProfilContainer from "@/@core/components/ProfilContainer";
import withAuth from "@/@core/components/WithAuth";

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
