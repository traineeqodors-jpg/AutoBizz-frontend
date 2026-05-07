"use client";

import { useGetAllMeetingsQuery } from "@/features/slices/meetingSlice";
import {
  useGetMeQuery,
  useGoogleTokenMutation,
} from "@/features/slices/userSlice";

import { useMemo, useState } from "react";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

import { useGoogleLogin } from "@react-oauth/google";

import { motion } from "framer-motion";
import { FaGoogle } from "react-icons/fa";
import { IoCalendarOutline } from "react-icons/io5";
import toast from "react-hot-toast";

import AnimatedWrapper from "@/components/AnimatedWrapper";

function LeadCalendar() {
  const [selectedSlot, setSelectedSlot] = useState(null);
  const { data: user } = useGetMeQuery();
  const isGoogleLinked = !!user?.data?.googleRefreshToken;

  const { data, isLoading } = useGetAllMeetingsQuery(undefined, {
    skip: !isGoogleLinked,
  });

  const [googleToken] = useGoogleTokenMutation();

  // ✅ Convert events for FullCalendar
  const events = useMemo(() => {
    const meetings = data?.data?.meetings || [];
    return meetings.map((m) => ({
      id: m.id,
      title: m.title,
      start: m.startTime,
      end: m.endTime,
      extendedProps: {
        meetLink: m.meetLink,
        leadName: m.lead?.name,
      },
    }));
  }, [data]);

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        const res = await googleToken(response.code).unwrap();
        toast.success(res?.message);
      } catch (error) {
        toast.error(error?.data?.message);
      }
    },
    flow: "auth-code",
    scope: "https://www.googleapis.com/auth/calendar.events",
  });

  return (
    <AnimatedWrapper>
      <div className="min-h-screen w-full px-2 sm:px-4 lg:px-6 py-4 space-y-4">
        {" "}
        {/* 🔒 Google Not Connected Overlay */}
        {!isGoogleLinked && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/40 dark:bg-gray-800/40 backdrop-blur-md p-2">
            <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-2xl text-center border border-gray-100">
              <h2 className="text-xl font-bold mb-2 dark:text-white">
                Google Calendar Required
              </h2>
              <p className="text-gray-600 dark:text-gray-500 mb-6">
                Link your account to manage leads and meetings.
              </p>
              <button
                onClick={handleGoogleLogin}
                className="bg-btn-100 text-white px-6 py-3 rounded-xl flex items-center gap-2 mx-auto font-semibold tracking-wide"
              >
                <FaGoogle /> Link Google
              </button>
            </div>
          </div>
        )}
        {/* 📅 Header */}
        <div className="h-[90vh] bg-back dark:bg-gray-900 rounded-3xl shadow-lg flex flex-col overflow-hidden">
          {" "}
          <div className="flex items-center gap-4 px-4 sm:px-6 py-4 border-b border-border/40">
            {" "}
            <div className="bg-btn-100 p-4 rounded-3xl shadow-2xl shadow-cyan-500/30">
              <IoCalendarOutline className="text-white" size={28} />
            </div>
            <div>
              <h2 className="text-3xl font-extrabold text-heading dark:text-white">
                Calendar
              </h2>
              <p className="text-[11px] font-extrabold text-btn-100 uppercase">
                Lead Meetings Schedule
              </p>
            </div>
          </div>
          {/* 📆 Calendar */}
          <div className="flex-1 w-full min-w-0 bg-surface rounded-2xl p-6 border-2 border-border overflow-hidden">
            {" "}
            {isLoading ? (
              <div className="absolute inset-0 z-50 flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-btn-100/20 border-t-btn-100 rounded-full animate-spin" />
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="h-full "
              >
                <FullCalendar
                  plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                  initialView="dayGridMonth"
                  headerToolbar={{
                    left: "prev,next today",
                    center: "title",
                    right: "dayGridMonth,timeGridWeek,timeGridDay",
                  }}
                    events={events}
                    themeSystem="Litera"
                  height="100%"
                  expandRows={true}
                  handleWindowResize={true}
                  selectMirror={true}
                  longPressDelay={150}
                  selectable={true}
                  select={(info) => {
                    const padding = 16;
                    const tooltipWidth = 220;
                    const tooltipHeight = 140;

                    let x = info.jsEvent?.clientX || window.innerWidth / 2;
                    let y = info.jsEvent?.clientY || window.innerHeight / 2;

                    // Clamp horizontally
                    if (x + tooltipWidth > window.innerWidth - padding) {
                      x = window.innerWidth - tooltipWidth - padding;
                    }

                    // Clamp vertically
                    if (y + tooltipHeight > window.innerHeight - padding) {
                      y = window.innerHeight - tooltipHeight - padding;
                    }

                    setSelectedSlot({
                      start: info.start,
                      x,
                      y,
                    });
                  }}
                  // ✅ click event
                  eventClick={(info) => {
                    const link = info.event.extendedProps.meetLink;
                    if (link) window.open(link, "_blank");
                  }}
                  // ✅ better event UI
                  eventContent={(arg) => (
                    <div className="bg-linear-to-r from-btn-100 to-btn-200 text-white px-2 py-0.5 rounded-md text-[11px] leading-tight shadow-sm">
                      <div className="font-semibold truncate">
                        {arg.event.title}
                      </div>
                      <div className="opacity-80 truncate">
                        {arg.event.extendedProps.leadName}
                      </div>
                    </div>
                  )}
                />
              </motion.div>
            )}
          </div>
          {selectedSlot && (
            <>
              {/* Overlay */}
              <div
                className="fixed inset-0 bg-black/30 z-40"
                onClick={() => setSelectedSlot(null)}
              />

              {/* Desktop Tooltip */}
              <div
                className="hidden sm:block fixed z-50 bg-surface border border-border rounded-xl shadow-xl p-3 w-56"
                style={{
                  top: selectedSlot.y,
                  left: selectedSlot.x,
                }}
              >
                <p className="text-xs font-semibold text-text mb-2">
                  New Event
                </p>

                <p className="text-[11px] text-muted-foreground mb-3">
                  {selectedSlot.start.toLocaleString()}
                </p>

                <button
                  className="w-full bg-btn-100 text-white text-xs py-2 rounded-lg font-semibold"
                  onClick={() => {
                    setSelectedSlot(null);
                  }}
                >
                  + Add Meeting
                </button>
              </div>

              {/* 📱 Mobile Bottom Sheet */}
              <div className="sm:hidden fixed bottom-0 left-0 right-0 z-50 bg-surface border-t border-border rounded-t-2xl p-4 shadow-2xl">
                <p className="text-sm font-semibold text-text mb-2">
                  New Event
                </p>

                <p className="text-xs text-muted-foreground mb-4">
                  {selectedSlot.start.toLocaleString()}
                </p>

                <button
                  className="w-full bg-btn-100 text-white py-3 rounded-xl font-semibold"
                  onClick={() => {
                    setSelectedSlot(null);
                  }}
                >
                  + Add Meeting
                </button>

                <button
                  className="w-full mt-2 text-sm text-muted-foreground"
                  onClick={() => setSelectedSlot(null)}
                >
                  Cancel
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </AnimatedWrapper>
  );
}

export default LeadCalendar;
