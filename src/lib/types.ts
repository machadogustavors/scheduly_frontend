// Tipo base para criação de compromisso
export interface AppointmentBase {
    datetime: Date;
    name: string;
    description: string;
}

export interface Appointment extends AppointmentBase {
    id: number;
    created_at: string | null;
}