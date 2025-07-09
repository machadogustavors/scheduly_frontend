import { Link } from 'react-router-dom';

export function Header() {
  return (
    <header className="w-full shadow-md border-b border-gray-100">
      <div className="mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-10 w-10 text-primary">
            <rect x="3" y="6" width="18" height="15" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none"/>
            <path stroke="currentColor" strokeWidth="1.5" d="M16 2v4M8 2v4M3 10h18"/>
          </svg>
          <span className="text-2xl font-bold text-primary">Scheduly</span>
        </Link>
      </div>
    </header>
  );
}