import React from "react";
import type { Appointment } from "../../../lib/types";

interface WeekCalendarProps {
  weekDays: Date[];
  appointments: Appointment[];
  onTimeSlotClick: (date: Date) => void;
  onAppointmentClick: (appointment: Appointment) => void;
}


import { useState, useEffect } from "react";

export const WeekCalendar: React.FC<WeekCalendarProps> = ({
  weekDays,
  appointments,
  onTimeSlotClick,
  onAppointmentClick,
}) => {

  const hours = Array.from({ length: 24 }, (_, i) => {
    return `${i.toString().padStart(2, "0")}:00`;
  });

  const getCurrentDayIndex = () => {
    const today = new Date();
    return weekDays.findIndex(day => 
      day.toDateString() === today.toDateString()
    );
  };

  const [selectedDayIdx, setSelectedDayIdx] = useState(() => {
    const currentDayIndex = getCurrentDayIndex();
    return currentDayIndex >= 0 ? currentDayIndex : 0;
  });

  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < 930 : false
  );

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 930);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const currentDayIndex = getCurrentDayIndex();
    if (currentDayIndex >= 0) {
      setSelectedDayIdx(currentDayIndex);
    }
  }, [weekDays]);


  const daysToShow = isMobile ? [weekDays[selectedDayIdx]] : weekDays;

  return (
    <div className="overflow-x-auto w-full h-full bg-white animate-fade-in">

      <div className="sticky top-0 z-20 bg-white shadow-sm">
        <div className="grid grid-cols-8 min-w-[900px] hidden [@media(min-width:930px)]:grid">
          <div className="bg-white sticky left-0 z-30"></div>
          {weekDays.map((day, idx) => (
            <div key={idx} className="text-center py-2 font-semibold text-blue-700 bg-white">
              {day.toLocaleDateString("pt-BR", { weekday: "short", day: "2-digit", month: "2-digit" })}
            </div>
          ))}
        </div>

        <div className="flex [@media(min-width:930px)]:hidden items-center justify-between px-2 py-2 border-b bg-white">
          <button
            className="p-2 text-blue-600 disabled:opacity-30"
            onClick={() => setSelectedDayIdx(i => Math.max(0, i - 1))}
            disabled={selectedDayIdx === 0}
            aria-label="Dia anterior"
          >
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
          <span className="font-semibold text-blue-700">
            {weekDays[selectedDayIdx].toLocaleDateString("pt-BR", { weekday: "long", day: "2-digit", month: "2-digit" })}
          </span>
          <button
            className="p-2 text-blue-600 disabled:opacity-30"
            onClick={() => setSelectedDayIdx(i => Math.min(6, i + 1))}
            disabled={selectedDayIdx === 6}
            aria-label="Próximo dia"
          >
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
        </div>
      </div>

      <div className={`w-full h-[calc(100vh-120px)] ${isMobile ? "flex" : "grid grid-cols-8 min-w-[900px]"}`}>
        {isMobile ? (

          <div className="flex w-full h-full">
            <div className="flex flex-col bg-white min-w-[60px] w-[60px] border-r border-gray-100 h-full">
              {hours.map((h, i) => (
                <div key={i} className="min-h-[56px] h-[56px] text-xs text-gray-400 flex items-start justify-end pr-2 pt-1">
                  {h}
                </div>
              ))}
            </div>
            <div className="flex-1 flex flex-col h-full">
              {hours.map((h, i) => {
                const [hour, minute] = h.split(":");
                const slotDate = new Date(daysToShow[0]);
                slotDate.setHours(Number(hour), Number(minute), 0, 0);
                const slotAppointments = appointments.filter(
                  (a) => new Date(a.datetime).getTime() === slotDate.getTime()
                );
                return (
                  <div
                    key={i}
                    className="min-h-[56px] h-[56px] border-b border-gray-50 hover:bg-blue-50 transition cursor-pointer group relative"
                    onClick={() => onTimeSlotClick(slotDate)}
                  >
                    {slotAppointments.map((a, idx) => (
                      <div
                        key={idx}
                        className={`absolute left-1 right-1 top-1 h-8 rounded px-2 py-1 text-xs font-medium shadow-md transition-all cursor-pointer z-10 ${
                          new Date(a.datetime) < new Date()
                            ? "bg-blue-200 text-blue-900 opacity-60"
                            : "bg-blue-500 text-white hover:bg-blue-600"
                        } animate-fade-in`}
                        onClick={e => { e.stopPropagation(); onAppointmentClick(a); }}
                      >
                        {a.name + ' - ' + new Date(a.datetime).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          </div>
        ) : (

          <>
            <div className="flex flex-col bg-white min-w-[60px] w-[60px] border-r border-gray-100">
              {hours.map((h, i) => (
                <div key={i} className="h-10 text-xs text-gray-400 flex items-start justify-end pr-2 pt-1">
                  {h}
                </div>
              ))}
            </div>
            {daysToShow.map((day, dayIdx) => (
              <div key={dayIdx} className="border-l border-gray-100 relative bg-white flex-1">
                {hours.map((h, i) => {
                  const [hour, minute] = h.split(":");
                  const slotDate = new Date(day);
                  slotDate.setHours(Number(hour), Number(minute), 0, 0);
                  const slotAppointments = appointments.filter(
                    (a) => new Date(a.datetime).getTime() === slotDate.getTime()
                  );
                  return (
                    <div
                      key={i}
                      className="h-10 border-b border-gray-50 hover:bg-blue-50 transition cursor-pointer group relative"
                      onClick={() => onTimeSlotClick(slotDate)}
                    >
                      {slotAppointments.map((a, idx) => (
                        <div
                          key={idx}
                          className={`absolute left-1 right-1 top-1 h-8 rounded px-2 py-1 text-xs font-medium shadow-md transition-all cursor-pointer z-10 ${
                            new Date(a.datetime) < new Date()
                              ? "bg-blue-200 text-blue-900 opacity-60"
                              : "bg-blue-500 text-white hover:bg-blue-600"
                          } animate-fade-in`}
                          onClick={e => { e.stopPropagation(); onAppointmentClick(a); }}
                        >
                          {a.name + ' - ' + new Date(a.datetime).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}
                        </div>
                      ))}
                    </div>
                  );
                })}
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};
