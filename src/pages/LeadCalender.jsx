import React, { useMemo, useCallback } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import {
  IoVideocam,
  IoChevronBack,
  IoChevronForward,
  IoCalendarOutline,
  IoPersonOutline,
  IoTodayOutline,
} from "react-icons/io5";
import { useGetAllMeetingsQuery } from "../features/slices/meetingSlice";

const localizer = momentLocalizer(moment);

const LeadCalendar = () => {
  const { data, isLoading } = useGetAllMeetingsQuery();

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

  const eventPropGetter = useCallback((event, start, end, isSelected) => {
    return {
      style: {
        backgroundColor: isSelected ? "#00969e" : "#00adb5",
        border: "none",
        borderLeft: "3px solid #008b93",
        borderRadius: "6px",
        color: "#fff",
        padding: "1px 6px",
        fontSize: "11px",
        fontWeight: 700,
        cursor: event.meetLink ? "pointer" : "default",
        boxShadow: isSelected
          ? "0 4px 12px rgba(0,173,181,0.3)"
          : "0 1px 4px rgba(0,173,181,0.15)",
        outline: "none",
        overflow: "hidden",
      },
    };
  }, []);

  const MonthEventComponent = ({ event }) => (
    <div className="flex items-center gap-1 w-full overflow-hidden h-full">
      <span className="text-[10px] font-bold text-white truncate flex-1 leading-tight">
        {event.title}
      </span>
      {event.meetLink && (
        <IoVideocam size={9} className="text-white/80 shrink-0" />
      )}
    </div>
  );

  const WeekDayEventComponent = ({ event }) => (
    <div className="flex flex-col gap-0.5 w-full overflow-hidden h-full py-0.5">
      <span className="text-[10px] font-extrabold text-white truncate uppercase leading-tight">
        {event.title}
      </span>
      {event.leadName && (
        <span className="text-[9px] font-semibold text-white/70 truncate flex items-center gap-0.5">
          <IoPersonOutline size={8} className="shrink-0" />
          {event.leadName}
        </span>
      )}
    </div>
  );

  const AgendaEventComponent = ({ event }) => (
    <div className="flex items-center justify-between gap-2 sm:gap-3 w-full py-2 px-1">
      <div className="flex flex-col min-w-0 flex-1 gap-0.5">
        <span className="text-[11px] sm:text-xs font-extrabold uppercase text-text truncate block">
          {event.title}
        </span>
        {event.leadName && (
          <span className="text-[10px] sm:text-[11px] text-btn-100 font-semibold truncate flex items-center gap-1">
            <IoPersonOutline size={10} className="shrink-0" />
            <span className="truncate">{event.leadName}</span>
          </span>
        )}
      </div>
      {event.meetLink && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            window.open(event.meetLink, "_blank", "noopener,noreferrer");
          }}
          className="flex items-center gap-1 bg-btn-100 text-white text-[10px] font-bold px-2 sm:px-3 py-1 sm:py-1.5 rounded-full shrink-0"
        >
          <IoVideocam size={11} />
          <span className="hidden sm:inline">Join</span>
        </button>
      )}
    </div>
  );

  const handleSelectEvent = useCallback((e) => {
    if (e.meetLink) {
      window.open(e.meetLink, "_blank", "noopener,noreferrer");
    }
  }, []);

  const CustomToolbar = useCallback(({ label, onNavigate, onView, view }) => {
    const viewOptions = [
      { key: "month", label: "Month" },
      { key: "week", label: "Week" },
      { key: "day", label: "Day" },
      { key: "agenda", label: "Agenda" },
    ];

    return (
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 mb-4 sm:mb-6 px-1">
        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate("TODAY")}
            className="flex items-center gap-1 px-3 py-2 text-[10px] sm:text-xs font-black uppercase tracking-wide bg-[#f0f0f0] hover:bg-[#00adb5] hover:text-white text-[#393e46] rounded-xl transition-all duration-200"
          >
            <IoTodayOutline size={12} />
            Today
          </button>
          <div className="flex items-center bg-[#f0f0f0] rounded-xl overflow-hidden">
            <button
              onClick={() => onNavigate("PREV")}
              className="p-2 hover:bg-btn-100 hover:text-white text-text transition-colors"
            >
              <IoChevronBack size={16} />
            </button>
            <div className="w-px h-5 bg-gray-300" />
            <button
              onClick={() => onNavigate("NEXT")}
              className="p-2 hover:bg-btn-100 hover:text-white text-text transition-colors"
            >
              <IoChevronForward size={16} />
            </button>
          </div>
        </div>

        <h3 className="text-sm sm:text-base lg:text-lg font-black uppercase tracking-wider text-text order-first sm:order-0 text-center flex-1">
          {label}
        </h3>

        <div className="flex bg-[#f0f0f0] rounded-xl p-1 gap-0.5">
          {viewOptions.map((v) => (
            <button
              key={v.key}
              onClick={() => onView(v.key)}
              className={`px-2.5 sm:px-3 py-1.5 sm:py-2 text-[9px] sm:text-[10px] font-black uppercase rounded-lg transition-all duration-200 ${
                view === v.key
                  ? "bg-btn-100 text-white shadow-md"
                  : "text-text hover:bg-white hover:shadow-sm"
              }`}
            >
              {v.label}
            </button>
          ))}
        </div>
      </div>
    );
  }, []);

  return (
    <div className="min-h-150 h-[calc(100vh-2rem)] max-h-225 bg-linear-to-br from-[#f0f0f0] to-[#e8e8e8] p-3 sm:p-5 lg:p-8 rounded-2xl sm:rounded-[2rem] border border-white/80 shadow-2xl flex flex-col font-sans">
      {/* Header */}
      <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-5 px-1 sm:px-3">
        <div className="bg-linear-to-br from-btn-100 to-[#008b93] p-2.5 sm:p-3 rounded-xl sm:rounded-2xl shadow-lg shadow-cyan-500/25 shrink-0">
          <IoCalendarOutline className="text-white" size={20} />
        </div>
        <div>
          <h2 className="text-lg sm:text-xl lg:text-2xl font-black text-text tracking-tight">
            Meeting Schedule
          </h2>
          <p className="text-[9px] sm:text-[10px] font-bold text-btn-100 uppercase tracking-[0.15em]">
            Syncing your CRM
          </p>
        </div>

         <div className="hidden sm:flex items-center gap-2 bg-white px-5 py-2 rounded-full shadow-sm border border-slate-100">
          <div className="w-2.5 h-2.5 bg-[#00adb5] rounded-full animate-pulse" />
          <span className="text-sm font-semibold text-[#393e46]">{events.length} Meetings</span>
        </div>
      </div>

      {/* Calendar */}
      <div className="flex-1 bg-white rounded-xl sm:rounded-2xl lg:rounded-3xl p-2 sm:p-3 lg:p-5 shadow-[inset_0_1px_4px_rgba(0,0,0,0.04)] border border-gray-100 overflow-hidden min-h-0 relative">
        {isLoading && (
          <div className="absolute inset-0 z-50 bg-white/70 backdrop-blur-sm flex flex-col items-center justify-center gap-3 rounded-2xl">
            <div className="animate-spin rounded-full h-10 w-10 border-[3px] border-[#e0e0e0] border-t-btn-100" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
              Loading…
            </span>
          </div>
        )}

        <style>{calendarCSS}</style>

        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          views={["month", "week", "day", "agenda"]}
          defaultView="month"
          popup
          selectable={false}
          style={{ height: "100%" }}
          components={{
            toolbar: CustomToolbar,
            month: { event: MonthEventComponent },
            week: { event: WeekDayEventComponent },
            day: { event: WeekDayEventComponent },
            agenda: { event: AgendaEventComponent },
          }}
          eventPropGetter={eventPropGetter}
          onSelectEvent={handleSelectEvent}
          tooltipAccessor={null}
        />
      </div>
    </div>
  );
};

const calendarCSS = `
  /* ===== BASE ===== */
  .rbc-calendar {
    font-family: inherit;
    height: 100% !important;
    display: flex;
    flex-direction: column;
  }

  /* ===== MONTH VIEW ===== */
  .rbc-month-view {
    border: 1px solid #f0f0f0 !important;
    border-radius: 12px;
    overflow: hidden;
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  .rbc-month-header {
    background: #fafbfc;
  }

  .rbc-header {
    padding: 12px 8px !important;
    text-transform: uppercase;
    font-size: 10px !important;
    font-weight: 800 !important;
    color: #6b7280 !important;
    letter-spacing: 0.08em;
    border-bottom: 2px solid #edfeff !important;
    border-left: 1px solid #f0f0f0 !important;
    background: transparent !important;
  }

  .rbc-header:first-child {
    border-left: none !important;
  }

  .rbc-month-row {
    border-top: 1px solid #f0f0f0 !important;
    overflow: visible !important;
    flex: 1;
  }

  .rbc-day-bg {
    border-left: 1px solid #f0f0f0 !important;
  }

  .rbc-day-bg:first-child {
    border-left: none !important;
  }

  .rbc-today {
    background-color: #f0fffe !important;
  }

  .rbc-off-range-bg {
    background-color: #fafafa !important;
  }

  .rbc-date-cell {
    padding: 6px 8px !important;
    font-weight: 700;
    font-size: 12px;
    color: #b0b0b0;
    text-align: right;
  }

  .rbc-date-cell.rbc-now {
    color: #00adb5 !important;
    font-weight: 900;
  }

  .rbc-off-range {
    color: #d4d4d4 !important;
  }

  /* ===== EVENTS ===== */
  .rbc-event {
    outline: none !important;
    margin-bottom: 1px !important;
  }

  .rbc-event:focus {
    outline: none !important;
    box-shadow: 0 0 0 2px rgba(0,173,181,0.4) !important;
  }

  .rbc-event-content {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .rbc-row-segment {
    padding: 0 2px 1px !important;
  }

  .rbc-row-content {
    z-index: 2;
    position: relative;
  }

  .rbc-show-more {
    font-weight: 800;
    font-size: 10px;
    color: #00adb5;
    text-transform: uppercase;
    background: transparent !important;
    padding: 2px 4px;
    margin-top: 1px;
    cursor: pointer;
  }

  .rbc-show-more:hover {
    color: #008b93;
    text-decoration: underline;
  }

  /* ===== WEEK / DAY TIME VIEW ===== */
  .rbc-time-view {
    border: 1px solid #f0f0f0 !important;
    border-radius: 12px;
    overflow: hidden;
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  .rbc-time-header {
    border-bottom: 2px solid #edfeff !important;
  }

  .rbc-time-header-content {
    border-left: 1px solid #f0f0f0 !important;
  }

  .rbc-time-content {
    border-top: none !important;
    overflow-y: auto !important;
    overflow-x: hidden !important;
  }

  .rbc-time-content::-webkit-scrollbar {
    width: 5px;
  }

  .rbc-time-content::-webkit-scrollbar-track {
    background: transparent;
  }

  .rbc-time-content::-webkit-scrollbar-thumb {
    background: #d1d5db;
    border-radius: 10px;
  }

  .rbc-time-content::-webkit-scrollbar-thumb:hover {
    background: #00adb5;
  }

  .rbc-timeslot-group {
    border-bottom: 1px solid #f5f5f5 !important;
    min-height: 48px;
  }

  .rbc-time-slot {
    border-top: none !important;
  }

  .rbc-time-gutter .rbc-timeslot-group {
    color: #9ca3af;
    font-size: 10px;
    font-weight: 700;
    padding-right: 8px;
  }

  .rbc-day-slot .rbc-time-slot {
    border-top: 1px solid #fafafa !important;
  }

  .rbc-day-slot .rbc-events-container {
    margin-right: 0 !important;
  }

  .rbc-day-slot .rbc-event {
    border-radius: 6px !important;
    border-left: 3px solid #008b93 !important;
    border-top: none !important;
    border-right: none !important;
    border-bottom: none !important;
  }

  .rbc-day-slot .rbc-event-label {
    font-size: 9px !important;
    font-weight: 700;
    color: rgba(255,255,255,0.8);
    margin-bottom: 1px;
  }

  .rbc-current-time-indicator {
    background-color: #00adb5 !important;
    height: 2px !important;
  }

  .rbc-current-time-indicator::before {
    content: '';
    position: absolute;
    left: -5px;
    top: -4px;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #00adb5;
    box-shadow: 0 0 6px rgba(0,173,181,0.5);
  }

  .rbc-header.rbc-today {
    background: #f0fffe !important;
    color: #00adb5 !important;
  }

  .rbc-allday-cell {
    display: none;
  }

  .rbc-time-header-cell .rbc-header {
    padding: 10px 6px !important;
  }

  /* ===== AGENDA VIEW - FULLY RESPONSIVE, NO HOVER ISSUES ===== */
  .rbc-agenda-view {
    flex: 1;
    display: flex;
    flex-direction: column;
    border: none !important;
    overflow: hidden !important;
  }

  .rbc-agenda-view table.rbc-agenda-table {
    border: 1px solid #f0f0f0 !important;
    border-radius: 12px;
    overflow: hidden;
    border-collapse: collapse;
    border-spacing: 0;
    width: 100% !important;
    table-layout: fixed !important;
  }

  .rbc-agenda-view table.rbc-agenda-table thead > tr > th {
    padding: 10px 12px !important;
    text-transform: uppercase;
    font-size: 10px !important;
    font-weight: 800 !important;
    color: #6b7280 !important;
    letter-spacing: 0.1em;
    border-bottom: 2px solid #edfeff !important;
    background: #fafbfc !important;
    border-right: none !important;
    border-left: none !important;
  }

  .rbc-agenda-view table.rbc-agenda-table thead > tr > th:first-child {
    width: 90px !important;
  }

  .rbc-agenda-view table.rbc-agenda-table thead > tr > th:nth-child(2) {
    width: 120px !important;
  }

  .rbc-agenda-view table.rbc-agenda-table thead > tr > th:last-child {
    width: auto !important;
  }

  .rbc-agenda-view table.rbc-agenda-table tbody > tr > td {
    padding: 8px 12px !important;
    border-bottom: 1px solid #f3f4f6 !important;
    border-right: none !important;
    border-left: none !important;
    font-size: 11px;
    font-weight: 600;
    color: #393e46;
    vertical-align: middle;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-word;
  }

  .rbc-agenda-view table.rbc-agenda-table tbody > tr > td:first-child {
    width: 90px !important;
    min-width: 70px;
  }

  .rbc-agenda-view table.rbc-agenda-table tbody > tr > td:nth-child(2) {
    width: 120px !important;
    min-width: 90px;
  }

  /* REMOVE ALL HOVER FROM AGENDA ROWS */
  .rbc-agenda-view table.rbc-agenda-table tbody > tr:hover > td {
    background: transparent !important;
    transform: none !important;
    box-shadow: none !important;
  }

  .rbc-agenda-view table.rbc-agenda-table tbody > tr > td + td + td {
    padding: 0 8px !important;
  }

  .rbc-agenda-date-cell {
    font-weight: 800 !important;
    color: # !important;
    white-space: nowrap;
    font-size: 11px !important;
  }

  .rbc-agenda-time-cell {
    font-weight: 700 !important;
    color: #6b7280 !important;
    white-space: nowrap;
    font-size: 10px !important;
  }

  .rbc-agenda-time-cell .rbc-continues-after::after {
    content: "" !important;
  }

  .rbc-agenda-time-cell .rbc-continues-prior::before {
    content: "" !important;
  }

  .rbc-agenda-event-cell {
    overflow: hidden !important;
  }

  /* Remove agenda event hover completely */
  .rbc-agenda-view .rbc-event {
    background: transparent !important;
    border: none !important;
    box-shadow: none !important;
    padding: 0 !important;
    margin: 0 !important;
    border-radius: 0 !important;
    cursor: default !important;
    border-left: none !important;
  }

  .rbc-agenda-view .rbc-event:hover {
    background: transparent !important;
    transform: none !important;
    box-shadow: none !important;
  }

  .rbc-agenda-view .rbc-event:focus {
    outline: none !important;
    box-shadow: none !important;
  }

  /* Agenda scrollbar */
  .rbc-agenda-content {
    overflow-x: hidden !important;
    overflow-y: auto !important;
  }

  .rbc-agenda-content::-webkit-scrollbar {
    width: 5px;
  }

  .rbc-agenda-content::-webkit-scrollbar-track {
    background: transparent;
  }

  .rbc-agenda-content::-webkit-scrollbar-thumb {
    background: #d1d5db;
    border-radius: 10px;
  }

  .rbc-agenda-empty {
    text-align: center;
    padding: 50px 20px !important;
    color: #b0b0b0;
    font-weight: 700;
    font-size: 13px;
  }

  /* ===== POPUP OVERLAY ===== */
  .rbc-overlay {
    border-radius: 12px !important;
    border: 1px solid #e5e7eb !important;
    box-shadow: 0 16px 40px rgba(0,0,0,0.12) !important;
    padding: 6px !important;
    max-width: 260px;
    z-index: 100 !important;
    background: white !important;
  }

  .rbc-overlay-header {
    text-transform: uppercase;
    font-weight: 800;
    font-size: 10px;
    color: #393e46;
    padding: 8px 10px !important;
    border-bottom: 2px solid #edfeff !important;
    letter-spacing: 0.05em;
  }

  .rbc-overlay > .rbc-event {
    margin: 3px 0 !important;
    border-radius: 6px !important;
  }

  /* ===== RESPONSIVE ===== */
  @media (max-width: 768px) {
    .rbc-header {
      padding: 8px 4px !important;
      font-size: 9px !important;
    }

    .rbc-date-cell {
      padding: 4px 5px !important;
      font-size: 10px;
    }

    .rbc-time-gutter .rbc-timeslot-group {
      font-size: 9px;
      padding-right: 4px;
    }

    .rbc-event-content {
      font-size: 9px;
    }

    .rbc-show-more {
      font-size: 8px;
    }

    .rbc-time-header-cell .rbc-header {
      padding: 8px 4px !important;
      font-size: 9px !important;
    }

    .rbc-timeslot-group {
      min-height: 40px;
    }

    /* Agenda responsive */
    .rbc-agenda-view table.rbc-agenda-table thead > tr > th:first-child {
      width: 70px !important;
    }

    .rbc-agenda-view table.rbc-agenda-table thead > tr > th:nth-child(2) {
      width: 90px !important;
    }

    .rbc-agenda-view table.rbc-agenda-table thead > tr > th {
      padding: 8px 8px !important;
      font-size: 9px !important;
    }

    .rbc-agenda-view table.rbc-agenda-table tbody > tr > td {
      padding: 6px 8px !important;
      font-size: 10px;
    }

    .rbc-agenda-view table.rbc-agenda-table tbody > tr > td:first-child {
      width: 70px !important;
      min-width: 60px;
    }

    .rbc-agenda-view table.rbc-agenda-table tbody > tr > td:nth-child(2) {
      width: 90px !important;
      min-width: 70px;
    }

    .rbc-agenda-date-cell {
      font-size: 9px !important;
    }

    .rbc-agenda-time-cell {
      font-size: 9px !important;
    }
  }

  @media (max-width: 480px) {
    .rbc-header {
      padding: 6px 2px !important;
      font-size: 8px !important;
      letter-spacing: 0;
    }

    .rbc-date-cell {
      padding: 2px 3px !important;
      font-size: 9px;
    }

    .rbc-overlay {
      max-width: 200px;
    }

    .rbc-timeslot-group {
      min-height: 36px;
    }

    /* Agenda small screen */
    .rbc-agenda-view table.rbc-agenda-table {
      font-size: 9px;
    }

    .rbc-agenda-view table.rbc-agenda-table thead > tr > th:first-child {
      width: 55px !important;
    }

    .rbc-agenda-view table.rbc-agenda-table thead > tr > th:nth-child(2) {
      width: 70px !important;
    }

    .rbc-agenda-view table.rbc-agenda-table thead > tr > th {
      padding: 6px 4px !important;
      font-size: 8px !important;
      letter-spacing: 0.02em;
    }

    .rbc-agenda-view table.rbc-agenda-table tbody > tr > td {
      padding: 5px 4px !important;
      font-size: 9px;
    }

    .rbc-agenda-view table.rbc-agenda-table tbody > tr > td:first-child {
      width: 55px !important;
      min-width: 45px;
    }

    .rbc-agenda-view table.rbc-agenda-table tbody > tr > td:nth-child(2) {
      width: 70px !important;
      min-width: 55px;
    }

    .rbc-agenda-date-cell {
      font-size: 8px !important;
    }

    .rbc-agenda-time-cell {
      font-size: 8px !important;
    }
  }
`;

export default LeadCalendar;