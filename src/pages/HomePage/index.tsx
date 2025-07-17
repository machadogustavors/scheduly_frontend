import React, { useState, useMemo, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CalendarHeader } from "./components/CalendarHeader";
import { WeekCalendar } from "./components/WeekCalendar";
import { MonthCalendar } from "./components/MonthCalendar";
import { AppointmentModal } from "./components/AppointmentModal";
import { getWeekDays, getMonthDays } from "./components/utils";
import { useData } from "../../hooks/useData";
import { Loader } from "../../components/Loader";
import { createAppointment, updateAppointment, deleteAppointment } from "../../services/appointmentsApi";
import { toast } from "react-toastify";
import type { Appointment } from "../../lib/types";
import "./components/animations.css";

export function HomePage() {
  const { appointments = [], refetch, isLoading, error } = useData();
  const [loadingSave, setLoadingSave] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [view, setView] = useState<"week" | "month">("week");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [transition, setTransition] = useState<"left" | "right" | null>(null);
  const [prevContent, setPrevContent] = useState<React.ReactNode>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalDate, setModalDate] = useState<Date | null>(null);
  const [editAppointment, setEditAppointment] = useState<Appointment | null>(null);

  const weekDays = useMemo(() => getWeekDays(currentDate), [currentDate]);
  const monthDays = useMemo(() => getMonthDays(currentDate), [currentDate]);

  function handlePrev() {
    setTransition("right");
    setPrevContent(renderCalendar());
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setCurrentDate(prev => {
        if (view === "week") {
          const d = new Date(prev);
          d.setDate(d.getDate() - 7);
          return d;
        } else {
          const d = new Date(prev);
          d.setMonth(d.getMonth() - 1);
          return d;
        }
      });
      setTransition(null);
      setPrevContent(null);
    }, 10);
  }
  function handleNext() {
    setTransition("left");
    setPrevContent(renderCalendar());
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setCurrentDate(prev => {
        if (view === "week") {
          const d = new Date(prev);
          d.setDate(d.getDate() + 7);
          return d;
        } else {
          const d = new Date(prev);
          d.setMonth(d.getMonth() + 1);
          return d;
        }
      });
      setTransition(null);
      setPrevContent(null);
    }, 10);
  }

  function renderCalendar() {
    return view === "week" ? (
      <WeekCalendar
        weekDays={weekDays}
        appointments={appointments}
        onTimeSlotClick={handleTimeSlotClick}
        onAppointmentClick={handleAppointmentClick}
      />
    ) : (
      <MonthCalendar
        monthDays={monthDays}
        appointments={appointments}
        onDayClick={handleDayClick}
        onAppointmentClick={handleAppointmentClick}
      />
    );
  }

  function handleTimeSlotClick(date: Date) {
    setModalDate(date);
    setEditAppointment(null);
    setModalOpen(true);
  }
  function handleDayClick(date: Date) {
    const d = new Date(date);
    d.setHours(8, 0, 0, 0);
    setModalDate(d);
    setEditAppointment(null);
    setModalOpen(true);
  }
  function handleAppointmentClick(appointment: Appointment) {
    setEditAppointment(appointment);
    setModalDate(new Date(appointment.datetime));
    setModalOpen(true);
  }

  async function handleSave(data: { name: string; description: string }) {
    setLoadingSave(true);
    try {
      if (editAppointment && modalDate) {
        await updateAppointment(editAppointment.id, {
          ...data,
          datetime: modalDate,
          id: editAppointment.id,
        });
        toast.success("Compromisso atualizado!");
      } else if (modalDate) {
        await createAppointment({
          ...data,
          datetime: modalDate,
        });
        toast.success("Compromisso criado!");
      }
      setModalOpen(false);
      refetch();
    } catch {
      toast.error("Erro ao salvar compromisso");
    } finally {
      setLoadingSave(false);
    }
  }

  async function handleDelete() {
    if (!editAppointment) return;
    setLoadingDelete(true);
    try {
      await deleteAppointment(editAppointment.id);
      toast.success("Compromisso excluído!");
      setModalOpen(false);
      refetch();
    } catch {
      toast.error("Erro ao excluir compromisso");
    } finally {
      setLoadingDelete(false);
    }
  }

  return (
    <div className="w-full h-full min-h-0 flex flex-col bg-white overflow-hidden">
      <CalendarHeader
        view={view}
        onChangeView={setView}
        currentDate={currentDate}
        onPrev={handlePrev}
        onNext={handleNext}
      />
      <div className="flex-1 min-h-0 h-0 overflow-auto relative">
        {isLoading && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-white bg-opacity-70">
            <Loader />
          </div>
        )}
        {!!error && !isLoading && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-white">
            <div className="text-center p-8">
              <div className="text-red-500 text-xl mb-4">⚠️ Erro de Conexão</div>
              <p className="text-gray-600 mb-4">Não foi possível carregar os compromissos.</p>
              <button 
                onClick={() => refetch()} 
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Tentar Novamente
              </button>
            </div>
          </div>
        )}
        <div className="relative w-full h-full">
          <AnimatePresence initial={false} custom={transition}>
            {prevContent && transition && (
              <motion.div
                key="prev"
                className="absolute inset-0 z-10 pointer-events-none"
                initial={{ opacity: 1, x: 0 }}
                animate={{ opacity: 0, x: transition === "left" ? -60 : 60 }}
                exit={{ opacity: 0, x: transition === "left" ? -60 : 60 }}
                transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
              >
                {prevContent}
              </motion.div>
            )}
            <motion.div
              key={view + currentDate.toISOString()}
              initial={{ opacity: 0, x: transition === "left" ? 60 : transition === "right" ? -60 : 0 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: transition === "left" ? -60 : 60 }}
              transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
              className="w-full h-full"
            >
              {renderCalendar()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      <AppointmentModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        initialData={editAppointment ? { name: editAppointment.name, description: editAppointment.description } : undefined}
        dateTime={modalDate || new Date()}
        isEdit={!!editAppointment}
        onDelete={handleDelete}
        loadingSave={loadingSave}
        loadingDelete={loadingDelete}
      />
    </div>
  );
}