import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from 'react-toastify';
import { Router } from "./router";
import { registerServiceWorker } from "./lib/pushNotifications";


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false
    }
  }
})

function App() {

  useEffect(() => {
    registerServiceWorker();
  }, [])

  return (
    <QueryClientProvider client={queryClient}>
      <ToastContainer />
      <Router />
    </QueryClientProvider>
  )
}

export default App;