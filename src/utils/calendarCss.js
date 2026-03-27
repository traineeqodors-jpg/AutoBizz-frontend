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

export default calendarCSS