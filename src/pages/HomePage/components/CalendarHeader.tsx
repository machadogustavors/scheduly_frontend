import React from "react";

interface CalendarHeaderProps {
  view: "week" | "month";
  onChangeView: (view: "week" | "month") => void;
  currentDate: Date;
  onPrev: () => void;
  onNext: () => void;
}

export const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  view,
  onChangeView,
  currentDate,
  onPrev,
  onNext,
}) => {
  return (
    <div className="flex items-center justify-between py-4 px-2 bg-white border-b">
      <div className="flex items-center gap-2">
        <button
          className="rounded-full p-2 hover:bg-blue-100 transition"
          onClick={onPrev}
          aria-label="Anterior"
        >
          <span className="material-icons">chevron_left</span>
        </button>
        <span className="font-semibold text-lg text-blue-700">
          {currentDate.toLocaleDateString("pt-BR", {
            month: "long",
            year: "numeric",
          })}
        </span>
        <button
          className="rounded-full p-2 hover:bg-blue-100 transition"
          onClick={onNext}
          aria-label="Próximo"
        >
          <span className="material-icons">chevron_right</span>
        </button>
      </div>
      <div className="flex gap-2">
        <button
          className={`px-3 py-1 rounded transition font-medium ${view === "week" ? "bg-blue-600 text-white" : "bg-blue-50 text-blue-700"}`}
          onClick={() => onChangeView("week")}
        >
          Semana
        </button>
        <button
          className={`px-3 py-1 rounded transition font-medium ${view === "month" ? "bg-blue-600 text-white" : "bg-blue-50 text-blue-700"}`}
          onClick={() => onChangeView("month")}
        >
          Mês
        </button>
      </div>
    </div>
  );
};
