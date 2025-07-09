import React from "react";
import type { Appointment } from "../../../lib/types";

interface MonthCalendarProps {
  monthDays: Date[];
  appointments: Appointment[];
  onDayClick: (date: Date) => void;
  onAppointmentClick: (appointment: Appointment) => void;
}

export const MonthCalendar: React.FC<MonthCalendarProps> = ({
  monthDays,
  appointments,
  onDayClick,
  onAppointmentClick,
}) => {
  
  const weeks: Date[][] = [];
  for (let i = 0; i < monthDays.length; i += 7) {
    weeks.push(monthDays.slice(i, i + 7));
  }

  return (
    <div className="w-full h-full bg-white animate-fade-in">
      <div className="grid grid-cols-7">
        {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"].map((d) => (
          <div key={d} className="text-center py-2 font-semibold text-blue-700">
            {d}
          </div>
        ))}
      </div>
      <div className="grid grid-rows-6 grid-cols-7 h-[calc(100vh-120px)]">
        {weeks.map((week) =>
          week.map((day, dIdx) => {
            const dayAppointments = appointments.filter(
              (a) => new Date(a.datetime).toDateString() === day.toDateString()
            );
            return (
              <div
                key={dIdx}
                className={`border p-1 relative cursor-pointer hover:bg-blue-50 transition group ${
                  day.getMonth() !== monthDays[15].getMonth() ? "bg-gray-50" : "bg-white"
                }`}
                onClick={() => onDayClick(day)}
              >
                <span className="absolute top-1 left-1 text-xs text-gray-400">
                  {day.getDate()}
                </span>
                <div className="flex flex-col gap-1 mt-5">
                  {dayAppointments.slice(0, 3).map((a, idx) => (
                    <div
                      key={idx}
                      className={`rounded px-2 py-1 text-xs font-medium shadow-md transition-all cursor-pointer z-10 truncate ${
                        new Date(a.datetime) < new Date()
                          ? "bg-blue-200 text-blue-900 opacity-60"
                          : "bg-blue-500 text-white hover:bg-blue-600"
                      } animate-fade-in`}
                      onClick={e => { e.stopPropagation(); onAppointmentClick(a); }}
                    >
                      {a.name + ' - ' + new Date(a.datetime).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}
                    </div>
                  ))}
                  {dayAppointments.length > 3 && (
                    <span className="text-xs text-blue-500">+{dayAppointments.length - 3} mais</span>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
