import React from "react";
import { useGetMeQuery } from "../features/slices/orgSlice";
import { useNavigate } from "react-router-dom";
import OrgInfo from "../components/OrgInfo"

const Home = () => {
  const token = localStorage.getItem("token");
  const { data, isLoading, isFetching } = useGetMeQuery(undefined, {
    skip: !token,
  });
  const user = data?.data;
  
  
  return (
    <>
      <div className="min-h-screen bg-back w-full flex flex-col gap-3 items-center p-4">
        <div className="bg-white p-3 rounded-2xl flex flex-wrap justify-center w-full items-center min-h-75">
          <OrgInfo user={user} />
          <div className="grid md:grid-cols-2 gap-5 w-full rounded-2xl m-2">
            {/* Businexx Details */}
            <div className="h-40 w-full shadow-md/10 rounded-2xl p-5 bg-white space-y-3">
              <h2 className="text-text text-lg font-semibold">
                Organization Details
              </h2>
              <ul className="text-text/60 text-sm">
                <li>Business Name : {user?.businessName}</li>
                <li>Business Size : {user?.businessSize}</li>
                <li>Location : {user?.country}</li>
              </ul>
            </div>
            <div className="h-40 w-full shadow-md/10 rounded-2xl p-5 bg-white"></div>
          </div>
        </div>

        <div className="rounded-2xl flex md:flex-row flex-col flex-wrap gap-3 justify-evenly w-full items-stretch flex-1 min-h-0">
          <div className="bg-white md:w-[50%] w-full md:flex-1 flex-3 rounded-2xl shadow-sm">
            Recent Members
          </div>
          <div className="bg-white md:w-[50%] w-full flex-3 rounded-2xl shadow-sm">
            Analytics
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
