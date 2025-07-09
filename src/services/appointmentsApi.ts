import { httpClient } from '../services/httpClient';
import type { AppointmentBase, Appointment } from '../lib/types';

export interface UpdateAppointmentRequest extends Partial<AppointmentBase> {
    id: number;
}

export async function getAppointments(): Promise<Appointment[]> {
    const response = await httpClient.get('');
    return response.data;
}

export async function createAppointment(data: AppointmentBase): Promise<Appointment> {
    const response = await httpClient.post('', data);
    return response.data;
}

export async function updateAppointment(id: number, data: UpdateAppointmentRequest): Promise<Appointment> {
    const response = await httpClient.put(`/${id}`, data);
    return response.data;
}

export async function deleteAppointment(id: number): Promise<void> {
    await httpClient.delete(`/${id}`);
}