"use client";

import { Suspense, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useGetMeQuery } from "@/features/slices/userSlice";
import { startTour } from "@/features/slices/tourSlice"; // Your new slice
import tourData from "../../../Json data/tourData.json";

// Components
import OrgInfo from "./components/OrgInfo";
import OrgCard from "./components/OrgCard";
import SupportCard from "./components/SupportCard";
import GenerateSOP from "@/components/ui/GenerateSOP";
import AnimatedWrapper from "@/components/AnimatedWrapper";
import Leads from "./components/Leads";
import Analysis from "./components/Analysis";
import EmployeeSOPBanner from "./components/EmployeeSOPBanner";

export default function Dashboard() {
  const { data } = useGetMeQuery();
  const dispatch = useDispatch();

  const user = data?.data;
  const role = user?.role;

  const shouldStart = user?.onboarding?.dashboard?.status === "pending";
  

  useEffect(() => {
    if (tourData?.dashboard && user && shouldStart) {
      dispatch(
        startTour({
          tourKey: "dashboard",
          steps: tourData.dashboard,
          stepIndex: user?.onboarding?.dashboard?.lastStep ?? 0,
          run: true,
        }),
      );
    }
  }, [dispatch, tourData, user, shouldStart]);

  const isOwnerOrSales = role === "owner" || role === "sales";
  const isOwner = role === "owner";

  return (
    <AnimatedWrapper>

      <div className="w-full min-h-screen py-3 sm:py-6 lg:py-8 mx-auto space-y-5">
        <OrgInfo user={user} isOwner={isOwner} />

        <div
          className={`grid lg:grid-cols-2 place-items-center gap-5 w-full ${isOwner ? "xl:grid-cols-3" : ""}`}
        >
          <OrgCard user={user} isOwner={isOwner} />
          <SupportCard />

          <div id="generate-sop-card" className="w-full h-full">
            {isOwner && (
              <GenerateSOP
                // If these clicks need to jump the tour to a specific step,
                // use the Redux dispatch now:
                isHome={true}
              />
            )}
          </div>
        </div>

        {!isOwner && role === "employee" && <EmployeeSOPBanner />}

        {isOwnerOrSales && (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3 gap-5">
            <Leads />
            <div
              id="visual"
              className="md:col-span-2 lg:col-span-1 xl:col-span-2 min-h-100 w-full bg-surface rounded-2xl shadow-sm"
            >
              <Suspense fallback={<div className="animate-spin">...</div>}>
                <Analysis />
              </Suspense>
            </div>
          </div>
        )}
      </div>
    </AnimatedWrapper>
  );
}
