import { useMemo, useState, useCallback } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import {
  IoChevronBack,
  IoChevronForward,
  IoCalendarOutline,
} from "react-icons/io5";
import { useGetAllMeetingsQuery } from "../features/slices/meetingSlice";

import { motion, AnimatePresence } from "framer-motion";
import {
  useGetMeQuery,
  useGoogleTokenMutation,
} from "../features/slices/orgSlice";
import { useGoogleLogin } from "@react-oauth/google";
import { FaGoogle } from "react-icons/fa";
import { toast } from "react-hot-toast";

const localizer = momentLocalizer(moment);

// Animation Variants for the whole Calendar View
const viewVariants = {
  initial: (direction) => ({
    opacity: 0,
    x: direction > 0 ? 50 : -50,
    filter: "blur(10px)",
  }),
  animate: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { type: "spring", stiffness: 300, damping: 30 },
  },
  exit: (direction) => ({
    opacity: 0,
    x: direction > 0 ? -50 : 50,
    filter: "blur(10px)",
    transition: { duration: 0.1 },
  }),
};

const LeadCalendar = () => {
  const { data: user } = useGetMeQuery(undefined, {
    skip: !localStorage.getItem("isLoggedIn"),
  });
  const isGoogleLinked = !!user?.data?.googleRefreshToken;

  const { data, isLoading } = useGetAllMeetingsQuery(undefined, {
    skip: !isGoogleLinked,
  });

  const [googleToken] = useGoogleTokenMutation();

  // Track state to trigger animations on change
  const [view, setView] = useState("month");
  const [date, setDate] = useState(new Date());
  const [direction, setDirection] = useState(1);

  const events = useMemo(() => {
    const meetings = data?.data?.meetings || [];
    return meetings.map((m) => ({
      id: m.id,
      title: m.title,
      start: new Date(m.startTime),
      end: new Date(m.endTime),
      meetLink: m.meetLink,
      leadName: m.lead?.name,
    }));
  }, [data]);

  const onNavigate = useCallback((newDate, action) => {
    if (action === "PREV") setDirection(-1);
    else if (action === "NEXT") setDirection(1);
    else setDirection(0);
    setDate(newDate);
  }, []);

  const onView = useCallback((newView) => {
    setDirection(0);
    setView(newView);
  }, []);

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        console.log("Send this to BackEnd : ", response.code);
        const res = await googleToken(response.code).unwrap();
        console.log(res);

        toast.success(res?.message);
      } catch (error) {
        console.log(error);

        toast.error(error?.data?.message);
      }
    },
    flow: "auth-code",
    scope: "https://www.googleapis.com/auth/calendar.events",
    onError: (error) => {
      console.log(error);
    },
  });

  const CustomToolbar = (toolbar) => (
    <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
      <div className="flex items-center gap-2">
        <button
          onClick={() => toolbar.onNavigate("TODAY")}
          className="px-5 py-2.5 bg-back rounded-2xl text-[10px] font-black uppercase tracking-widest text-text hover:bg-btn-100 hover:text-white transition-all active:scale-95 shadow-sm"
        >
          Today
        </button>
        <div className="flex bg-back rounded-2xl overflow-hidden shadow-inner border border-white">
          <button
            onClick={() => toolbar.onNavigate("PREV")}
            className="p-2.5 hover:bg-btn-100 hover:text-white transition-colors active:bg-btn-200"
          >
            <IoChevronBack size={18} />
          </button>
          <div className="w-px h-4 bg-gray-200 self-center" />
          <button
            onClick={() => toolbar.onNavigate("NEXT")}
            className="p-2.5 hover:bg-btn-100 hover:text-white transition-colors active:bg-btn-200"
          >
            <IoChevronForward size={18} />
          </button>
        </div>
      </div>

      <motion.h3
        key={toolbar.label}
        initial={{ y: -10, opacity: 0 }}
        transition={{ duration: 0.1 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-sm font-extrabold uppercase tracking-[0.25em] text-text border-b-4 border-btn-100/30 px-4 pb-1"
      >
        {toolbar.label}
      </motion.h3>

      <div className="flex bg-back p-1.5 rounded-2xl gap-1 shadow-inner border border-white">
        {["month", "week", "day", "agenda"].map((v) => (
          <button
            key={v}
            onClick={() => toolbar.onView(v)}
            className={`px-4 py-2 text-[9px] font-extrabold uppercase rounded-xl transition-all active:scale-95 cursor-pointer ${
              toolbar.view === v
                ? "bg-btn-100 text-white shadow-lg -translate-y-px"
                : "text-text hover:bg-white/60"
            }`}
          >
            {v}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.1 }}
      className="min-h-screen w-full p-3 sm:p-6 lg:p-8 relative"
    >
      <div className="mx-auto space-y-6">
        {/* If Not Connceted to Google */}
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
                className="bg-btn-100 text-white px-6 py-3 rounded-xl flex items-center gap-2 mx-auto font-semibold tracking-wide cursor-pointer"
              >
                <FaGoogle /> Link Google
              </button>
            </div>
          </div>
        )}
        <div className="h-[88vh] bg-back dark:bg-gray-900 p-2 sm:p-10 rounded-3xl border-2 border-white shadow-lg flex flex-col overflow-hidden">
          <div className="flex items-center gap-5 mb-8 p-2">
            <div className="bg-btn-100 p-4 rounded-3xl shadow-2xl shadow-cyan-500/30">
              <IoCalendarOutline className="text-white" size={28} />
            </div>
            <div>
              <h2 className="text-3xl font-extrabold text-heading dark:text-white tracking-tighter leading-none">
                Calendar
              </h2>
              <p className="text-[11px] font-extrabold text-btn-100 uppercase tracking-wider mt-1.5">
                Lead Meetings Schedule
              </p>
            </div>
          </div>

          <div className="flex-1 bg-white/60 backdrop-blur-sm rounded-2xl p-2 sm:p-8 inset-shadow-sm/10 shadow-sm border border-white/50 overflow-hidden relative">
            <AnimatePresence mode="wait" custom={direction}>
              {isLoading ? (
                <motion.div
                  key="loader"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 z-50 bg-white/40 backdrop-blur-xl flex items-center justify-center"
                >
                  <div className="w-16 h-16 border-8 border-back border-t-btn-100 rounded-full animate-spin" />
                </motion.div>
              ) : (
                <motion.div
                  key={`${view}-${date.getTime()}`}
                  custom={direction}
                  variants={viewVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="h-full "
                >
                  <Calendar
                    localizer={localizer}
                    events={events}
                    view={view}
                    date={date}
                    onNavigate={onNavigate}
                    onView={onView}
                    startAccessor="start"
                    endAccessor="end"
                    components={{ toolbar: CustomToolbar }}
                    eventPropGetter={() => ({
                      className: "!bg-btn-100 !rounded-lg !border-0 shadow-sm",
                    })}
                    onSelectEvent={(e) =>
                      e.meetLink && window.open(e.meetLink, "_blank")
                    }
                    style={{ height: "100%" }}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default LeadCalendar;
