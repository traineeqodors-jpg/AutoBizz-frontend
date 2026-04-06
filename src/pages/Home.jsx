import { useGetMeQuery } from "../features/slices/orgSlice";
import OrgInfo from "../components/Home/OrgInfo";
import GenerateSOP from "../components/Home/Sop/GenerateSOP";
import SupportCard from "../components/Home/SupportCard";
import OrgCard from "../components/Home/OrgCard";
import Leads from "../components/Leads";
import { motion } from "framer-motion";
import { lazy, Suspense } from "react";

const Analysis = lazy(() => import("../components/AnalysisGraphs/Analysis"));

const Home = () => {
  const isLoggedIn = !!localStorage.getItem("isLoggedIn");

  const { data, isLoading } = useGetMeQuery(undefined, {
    skip: !isLoggedIn,
  });

  const user = data?.data;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen  w-full p-3 sm:p-6 lg:p-8 "
    >
      <div className="mx-auto space-y-8">
        {/* Header Section */}
        <div className="rounded-2xl flex flex-wrap justify-center gap-8 w-full items-center">
          <OrgInfo user={user} />
          <div className="grid lg:grid-cols-2 xl:grid-cols-3 place-items-center gap-5 w-full">
            <OrgCard user={user} />
            <SupportCard />

            {/* Action Section */}
            <GenerateSOP isHome={true} />
          </div>
        </div>

        <div className="grid grid-cols-1 max-h-fit xl:grid-cols-3 gap-5">
          <Leads />
          <div className="xl:col-span-2 min-h-100 max-h-110 w-full bg-white dark:bg-gray-900 rounded-2xl shadow-md/10  dark:shadow-sm dark:shadow-gray-700/40">
            <Suspense
              fallback={
                <div className="min-h-100 flex items-center justify-center">
                  <div className="w-12 h-12 border-4 border-btn-100/20 border-t-btn-100 rounded-full animate-spin"></div>
                </div>
              }
            >
              <Analysis />
            </Suspense>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Home;
