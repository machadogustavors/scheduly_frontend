import type { ReactNode } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getAppointments } from '../services/appointmentsApi';
import { DataContext } from '../contexts/DataContext';

interface DataProviderProps {
  children: ReactNode;
}

export function DataProvider({ children }: DataProviderProps) {
    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ['appointments'],
        queryFn: getAppointments,
    });

    return (
        <DataContext.Provider value={{
            appointments: data,
            isLoading,
            error,
            refetch,
        }}>
            {children}
        </DataContext.Provider>
    );
}