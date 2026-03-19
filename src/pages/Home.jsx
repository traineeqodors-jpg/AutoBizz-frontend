import React from "react";
import { useGetMeQuery } from "../features/slices/orgSlice";
import { useNavigate } from "react-router-dom";
import OrgInfo from "../components/Home/OrgInfo";
import { GrMagic } from "react-icons/gr";
import GenerateSOP from "../components/Home/Sop/GenerateSOP";
import SupportCard from "../components/Home/SupportCard";
import OrgCard from "../components/Home/OrgCard";

const Home = () => {
  //Homepage
  const { data, isLoading, isFetching } = useGetMeQuery(undefined, {
    skip: !localStorage.getItem("isLoggedIn"),
  });
  const user = data?.data;

  return (
    <>
      <div className="min-h-screen bg-back w-full flex flex-col items-center p-4 gap-3">
        <div className="bg-white p-3 rounded-2xl flex flex-wrap justify-center gap-4 w-full items-center min-h-75">
          <OrgInfo user={user} />
          <div className="grid md:grid-cols-2 gap-5 w-full rounded-2xl">
            {/* Businexx Details */}
            <OrgCard user={user} />
            <SupportCard />
          </div>
        </div>
        
        <GenerateSOP />

        <div className="rounded-2xl flex md:flex-row flex-col flex-wrap gap-3 justify-evenly w-full items-stretch flex-1 min-h-0">
          <div className="bg-white md:w-[50%] w-full md:flex-1 flex-3 rounded-2xl shadow-sm p-3">
            Recent Leads
          </div>
          <div className="bg-white md:w-[50%] w-full flex-3 rounded-2xl shadow-sm p-3">
            Analytics
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;