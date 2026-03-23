import { useGetMeQuery } from "../features/slices/orgSlice";
import OrgInfo from "../components/Home/OrgInfo";
import GenerateSOP from "../components/Home/Sop/GenerateSOP";
import SupportCard from "../components/Home/SupportCard";
import OrgCard from "../components/Home/OrgCard";
import Analysis from "../components/AnalysisGraphs/Analysis";
import Leads from "../components/Leads";

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
          
            <Leads/>
          
          <div className="bg-white md:w-[50%] w-full flex-3 rounded-2xl shadow-sm p-3">
            Analytics
            
              <Analysis />
            
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;