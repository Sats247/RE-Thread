import { Outlet } from 'react-router-dom';

export function AdminLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-paper text-ink">
      <header className="border-b border-line p-4 bg-ink text-paper flex justify-between items-center">
        <span className="font-semibold uppercase tracking-wider text-sm">RE-thread Admin Lite</span>
      </header>
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
}

