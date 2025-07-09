import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from 'react-toastify';
import { Router } from "./router";



const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false
    }
  }
})

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <ToastContainer />
      <Router />
    </QueryClientProvider>
  )
}

export default App;