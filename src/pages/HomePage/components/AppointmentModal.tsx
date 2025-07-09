import React, { useState, useEffect } from "react";
// import type { Appointment } from "../../../lib/types";

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: { name: string; description: string }) => void;
  initialData?: { name: string; description: string };
  dateTime: Date;
  isEdit?: boolean;
  onDelete?: () => void;
}


export const AppointmentModal: React.FC<AppointmentModalProps & { loadingSave?: boolean; loadingDelete?: boolean }> = ({
  isOpen,
  onClose,
  onSave,
  initialData,
  dateTime,
  isEdit = false,
  onDelete,
  loadingSave = false,
  loadingDelete = false,
}) => {
  const [name, setName] = useState(initialData?.name || "");
  const [description, setDescription] = useState(initialData?.description || "");

  useEffect(() => {
    setName(initialData?.name || "");
    setDescription(initialData?.description || "");
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30 animate-fade-in">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md animate-fade-in-up relative">
        <button
          className="absolute top-2 right-2 text-gray-400 hover:text-blue-500 transition"
          onClick={onClose}
        >
          <span className="material-icons">close</span>
        </button>
        <h2 className="text-xl font-bold mb-2 text-blue-700">
          {isEdit ? "Editar compromisso" : "Novo compromisso"}
        </h2>
        <p className="text-sm text-gray-500 mb-4">
          {dateTime.toLocaleString("pt-BR", { dateStyle: "full", timeStyle: "short" })}
        </p>
        <form
          onSubmit={e => {
            e.preventDefault();
            if (!loadingSave) onSave({ name, description });
          }}
          className="flex flex-col gap-3"
        >
          <input
            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
            placeholder="Nome do compromisso"
            value={name}
            onChange={e => setName(e.target.value)}
            required
            disabled={loadingSave || loadingDelete}
          />
          <textarea
            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
            placeholder="Descrição"
            value={description}
            onChange={e => setDescription(e.target.value)}
            required
            disabled={loadingSave || loadingDelete}
          />
          <div className="flex justify-end gap-2 mt-2">
            {isEdit && (
              <button
                type="button"
                className="px-3 py-1 rounded bg-red-100 text-red-600 hover:bg-red-200 transition flex items-center min-w-[90px] justify-center"
                onClick={onDelete}
                disabled={loadingDelete || loadingSave}
              >
                {loadingDelete ? (
                  <>
                    <span className="loader border-red-400 mr-2"></span>
                    Excluindo...
                  </>
                ) : (
                  "Excluir"
                )}
              </button>
            )}
            <button
              type="button"
              className="px-3 py-1 rounded bg-gray-100 text-gray-600 hover:bg-gray-200 transition"
              onClick={onClose}
              disabled={loadingSave || loadingDelete}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700 transition font-semibold flex items-center min-w-[90px] justify-center"
              disabled={loadingSave || loadingDelete}
            >
              {loadingSave ? (
                <>
                  <span className="loader border-blue-400 mr-2"></span>
                  Salvando...
                </>
              ) : (
                "Salvar"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
