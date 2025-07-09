export function Footer() {
  return (
    <footer className="w-full border-t border-gray-100 shadow-inner mt-8">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-center">
        <span className="text-gray-800 text-sm">&copy; {new Date().getFullYear()} - Eu amo a Martina</span>
      </div>
    </footer>
  );
}