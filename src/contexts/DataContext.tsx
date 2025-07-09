import { createContext } from 'react';
import type { Appointment } from '../lib/types';

interface DataContextType {
  appointments: Appointment[] | undefined;
  isLoading: boolean;
  error: unknown;
  refetch: () => void;
}

export const DataContext = createContext<DataContextType>({
  appointments: [],
  isLoading: false,
  error: null,
  refetch: () => {},
});