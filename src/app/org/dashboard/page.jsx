"use client";

import OrgInfo from "./components/OrgInfo";
import OrgCard from "./components/OrgCard";
import SupportCard from "./components/SupportCard";
import GenerateSOP from "@/components/ui/GenerateSOP";
import AnimatedWrapper from "@/components/AnimatedWrapper";
import Leads from "./components/Leads";
import { Suspense, useEffect } from "react";
import Analysis from "./components/Analysis";
import { useGetMeQuery } from "@/features/slices/userSlice";
import EmployeeSOPBanner from "./components/EmployeeSOPBanner";

import tourData from "../../../Json data/tourData.json";
import { startTour } from "@/features/slices/tourSlice";
import { useDispatch } from "react-redux";

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
  }, [dispatch, user, shouldStart]);

  // Role check helpers
  const isOwnerOrSales = role === "owner" || role === "sales";
  const isOwner = role === "owner";
  return (
    <AnimatedWrapper>
      <div className="w-full min-h-screen py-3 sm:py-6 lg:py-8 mx-auto space-y-5">
        {/* Header Section */}

        <OrgInfo user={user} isOwner={isOwner} />
        <div
          className={`grid lg:grid-cols-2 place-items-center gap-5 w-full ${isOwner ? "xl:grid-cols-3" : ""}`}
        >
          <OrgCard user={user} isOwner={isOwner} />
          <SupportCard />

          {/* Generate SOP Section */}
          {isOwner && <GenerateSOP isHome={true} />}
        </div>

        {!isOwner && role === "employee" && <EmployeeSOPBanner />}

        {isOwnerOrSales && (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3 gap-5">
            <Leads />
            <div className="md:col-span-2 lg:col-span-1 xl:col-span-2 min-h-100 sm:max-h-full max-h-100 w-full bg-surface rounded-2xl shadow-sm dark:shadow-gray-700/40">
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
        )}
      </div>
    </AnimatedWrapper>
  );
}
