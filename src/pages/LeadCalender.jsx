import React, { useMemo, useState, useCallback } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import {
  IoVideocam, IoChevronBack, IoChevronForward,
  IoCalendarOutline, IoPersonOutline, IoTodayOutline,
} from "react-icons/io5";
import { useGetAllMeetingsQuery } from "../features/slices/meetingSlice";
import { motion, AnimatePresence } from "framer-motion";

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
    transition: { duration: 0.2 },
  }),
};

const LeadCalendar = () => {
  const { data, isLoading } = useGetAllMeetingsQuery();
  
  // Track state to trigger animations on change
  const [view, setView] = useState("month");
  const [date, setDate] = useState(new Date());
  const [direction, setDirection] = useState(1); // 1 for next, -1 for prev

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

  // Handle Navigation with Direction
  const onNavigate = useCallback((newDate, action) => {
    if (action === "PREV") setDirection(-1);
    else if (action === "NEXT") setDirection(1);
    else setDirection(0); // Today
    setDate(newDate);
  }, []);

  // Handle View Change
  const onView = useCallback((newView) => {
    setDirection(0); // Reset direction for view jump
    setView(newView);
  }, []);

  const CustomToolbar = (toolbar) => (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
      <div className="flex items-center gap-2">
        <button 
          onClick={() => toolbar.onNavigate("TODAY")} 
          className="px-5 py-2.5 bg-back rounded-2xl text-[10px] font-black uppercase tracking-widest text-text hover:bg-btn-100 hover:text-white transition-all active:scale-95 shadow-sm"
        >
          Today
        </button>
        <div className="flex bg-back rounded-2xl overflow-hidden shadow-inner border border-white">
          <button onClick={() => toolbar.onNavigate("PREV")} className="p-2.5 hover:bg-btn-100 hover:text-white transition-colors active:bg-btn-200"><IoChevronBack size={18} /></button>
          <div className="w-[1px] h-4 bg-gray-200 self-center" />
          <button onClick={() => toolbar.onNavigate("NEXT")} className="p-2.5 hover:bg-btn-100 hover:text-white transition-colors active:bg-btn-200"><IoChevronForward size={18} /></button>
        </div>
      </div>

      <motion.h3 
        key={toolbar.label}
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-sm font-black uppercase tracking-[0.25em] text-text border-b-4 border-btn-100/30 px-4 pb-1"
      >
        {toolbar.label}
      </motion.h3>

      <div className="flex bg-back p-1.5 rounded-2xl gap-1 shadow-inner border border-white">
        {["month", "week", "day", "agenda"].map((v) => (
          <button
            key={v}
            onClick={() => toolbar.onView(v)}
            className={`px-4 py-2 text-[9px] font-black uppercase rounded-xl transition-all active:scale-95 ${
              toolbar.view === v ? "bg-btn-100 text-white shadow-lg -translate-y-px" : "text-text hover:bg-white/60"
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
      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      className="h-[88vh] bg-back p-4 sm:p-10 rounded-[3rem] border-4 border-white shadow-2xl flex flex-col overflow-hidden"
    >
      <div className="flex items-center gap-5 mb-8">
        <div className="bg-btn-100 p-4 rounded-3xl shadow-2xl shadow-cyan-500/30">
          <IoCalendarOutline className="text-white" size={28} />
        </div>
        <div>
          <h2 className="text-3xl font-black text-text tracking-tighter leading-none">Smart Calendar</h2>
          <p className="text-[11px] font-black text-btn-100 uppercase tracking-[0.3em] mt-1.5">Live CRM Integration</p>
        </div>
      </div>

      <div className="flex-1 bg-white/80 backdrop-blur-sm rounded-[2.5rem] p-6 sm:p-8 shadow-inner border border-white/50 overflow-hidden relative">
        <AnimatePresence mode="wait" custom={direction}>
          {isLoading ? (
            <motion.div 
              key="loader" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 z-50 bg-white/40 backdrop-blur-xl flex items-center justify-center"
            >
              <div className="w-16 h-16 border-8 border-back border-t-btn-100 rounded-full animate-spin" />
            </motion.div>
          ) : (
            <motion.div 
              key={`${view}-${date.getTime()}`} // Unique key forces re-animation
              custom={direction}
              variants={viewVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="h-full"
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
                eventPropGetter={() => ({ className: "!bg-btn-100 !rounded-lg !border-0 shadow-sm" })}
                onSelectEvent={(e) => e.meetLink && window.open(e.meetLink, "_blank")}
                style={{ height: "100%" }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default LeadCalendar;
