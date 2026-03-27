import { useGetMeQuery } from "../features/slices/orgSlice";
import OrgInfo from "../components/Home/OrgInfo";
import GenerateSOP from "../components/Home/Sop/GenerateSOP";
import SupportCard from "../components/Home/SupportCard";
import OrgCard from "../components/Home/OrgCard";
import Analysis from "../components/AnalysisGraphs/Analysis";
import Leads from "../components/Leads";
import { motion } from "framer-motion"; // Ensure correct import

const Home = () => {
  const isLoggedIn = !!localStorage.getItem("isLoggedIn");

  const { data, isLoading } = useGetMeQuery(undefined, {
    skip: !isLoggedIn,
  });

  const user = data?.data;

  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-back w-full p-3 sm:p-6 lg:p-8"
    >
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header Section */}
        <div className="rounded-2xl flex flex-wrap justify-center gap-4 w-full items-center">
          <OrgInfo user={user} />
          <div className="grid md:grid-cols-2 gap-5 w-full">
            <OrgCard user={user} />
            <SupportCard />
          </div>
        </div>

        {/* Action Section */}
        <GenerateSOP />

        {/* Change the parent div to this */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-5 w-full items-stretch">
          {/* Recent Leads: Full width on mobile, 1/3 on desktop */}
          <div className="xl:col-span-1 shadow-sm border border-gray-100 rounded-2xl bg-white overflow-hidden">
            <Leads />
          </div>

          {/* Analytics: Full width on mobile, 2/3 on desktop */}
          <div className="xl:col-span-2 bg-white rounded-2xl shadow-sm p-6 flex flex-col border border-gray-100">
            <h2 className="font-bold text-lg mb-4 text-gray-800">Analytics</h2>
            {/* min-h-[300px] ensures it doesn't collapse on mobile */}
            <div className="flex-1 min-h-75 md:min-h-100 w-full">
              <Analysis />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Home;