import { Routes, Route, BrowserRouter } from 'react-router-dom'
import { HomePage } from '../pages/HomePage'
import { DataProvider } from '../providers/DataProvider'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'

export function Router() {
  return (
    <BrowserRouter>
      <DataProvider>
        <div className="flex flex-col min-h-screen h-screen w-full">
          <Header />
          <main className="flex-1 min-h-0 h-0 w-full">
            <Routes>
              <Route path="/" element={<HomePage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </DataProvider>
    </BrowserRouter>
  );
}