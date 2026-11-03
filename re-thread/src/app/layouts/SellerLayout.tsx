import { Outlet } from 'react-router-dom';

export function SellerLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-paper text-ink">
      <header className="border-b border-line p-4 flex justify-between items-center bg-mist">
        <span className="font-semibold tracking-wide">RE-thread Seller Hub</span>
      </header>
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
}

