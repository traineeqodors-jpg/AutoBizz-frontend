"use client";

import { Joyride, ACTIONS, EVENTS, STATUS } from "react-joyride";
import { useSelector, useDispatch } from "react-redux";
import { stopTour, setStepIndex } from "@/features/slices/tourSlice";
import CustomTooltip from "./ui/CustomTooltip";
import { useCallback } from "react";
import { useUpdateOnboardingMutation } from "@/features/slices/userSlice";
import CustomBeacon from "./ui/CustomBeacon";

export default function TourHandler() {
  const [updateOnboarding] = useUpdateOnboardingMutation();

  const dispatch = useDispatch();

  const { tourKey, run, stepIndex, steps } = useSelector((state) => state.tour);

  const handleCallback = useCallback(
    async (data) => {
      const { status, type, action, index } = data;

      const isFinished = status === STATUS.FINISHED;
      const isSkipped = status === STATUS.SKIPPED;
      const isClosed = action === ACTIONS.CLOSE && type === EVENTS.TOUR_STATUS;

      if (isFinished || isSkipped || isClosed) {
        const payload = {
          tourKey: tourKey,
          status: isFinished ? "completed" : "pending",
          lastStep: index + 1,
        };

        try {
          updateOnboarding(payload).unwrap();
        } catch (error) {
          console.error("Tour save failed:", error);
        }

        dispatch(stopTour());
        return; // Exit early
      }

      if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
        const payload = {
          tourKey: tourKey,
          status: "completed",
          lastStep: index,
        };

        try {
          updateOnboarding(payload).unwrap();
        } catch (error) {
          console.log("Failed to save tour progress:", error);
        }
      } else if (
        type === EVENTS.STEP_AFTER ||
        type === EVENTS.TARGET_NOT_FOUND
      ) {
        const isForward = action === ACTIONS.NEXT;
        if (isForward) {
          dispatch(setStepIndex(index + 1));
        } else {
          dispatch(setStepIndex(index - 1));
        }
      }
    },
    [dispatch, tourKey],
  );

  if (!run || !steps || steps.length === 0) {
    return null;
  }

  return (
    <Joyride
      key={tourKey || "tour-idle"}
      steps={steps}
      stepIndex={stepIndex}
      run={run}
      onEvent={handleCallback}
      continuous={true}
      showSkipButton={true}
      disableOverlayClose={true}
      spotlightClicks={true}
      tooltipComponent={CustomTooltip}
      beaconComponent={CustomBeacon}
      styles={{
        options: {
          zIndex: 999999,
          overlayColor: "rgba(0, 0, 0, 0.7)",
        },
      }}
    />
  );
}
