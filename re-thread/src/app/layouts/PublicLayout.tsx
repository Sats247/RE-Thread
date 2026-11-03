import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { AnnouncementBar, Header, Footer, BottomTabBar } from '@/shared/layout';
import { Drawer, Button, ToastContainer } from '@/shared/ui';
import { DemoPanel } from '@/demo/DemoPanel';
import { useUIStore } from '@/stores/ui.store';
import { useCartStore } from '@/stores/cart.store';
import { formatINR } from '@/shared/lib/format';
import { ROUTES } from '@/config/routes';
import { ShoppingBag } from 'lucide-react';

export const PublicLayout: React.FC = () => {
  const navigate = useNavigate();
  const { isCartOpen, closeCart } = useUIStore();
  const { items, removeItem, clearCart } = useCartStore();

  const subtotal = items.reduce((sum, item) => sum + item.price, 0);

  const handleCheckout = () => {
    closeCart();
    navigate(ROUTES.CHECKOUT);
  };

  return (
    <div className="min-h-screen flex flex-col bg-paper text-ink font-sans antialiased">
      <AnnouncementBar />
      <Header />
      <main className="flex-1 w-full">
        <Outlet />
      </main>
      <Footer />
      <BottomTabBar />
      <ToastContainer />
      <DemoPanel />

      {/* Shared Cart Drawer */}
      <Drawer
        open={isCartOpen}
        onOpenChange={(open) => !open && closeCart()}
        title={`Your Bag (${items.length})`}
        footer={
          items.length > 0 ? (
            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm font-medium">
                <span className="uppercase tracking-wider">Subtotal</span>
                <span className="font-mono">{formatINR(subtotal)}</span>
              </div>
              <p className="text-[11px] text-muted">
                Taxes and courier calculated at checkout. Free courier over ₹999.
              </p>
              <Button
                variant="primary"
                size="lg"
                className="w-full"
                onClick={handleCheckout}
                data-testid="cart-checkout-btn"
              >
                Continue to Checkout
              </Button>
            </div>
          ) : null
        }
      >
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center text-muted">
            <ShoppingBag className="h-10 w-10 stroke-[1.2] mb-3" />
            <p className="text-sm font-medium uppercase tracking-wider text-ink mb-1">
              Your bag is empty
            </p>
            <p className="text-xs text-muted mb-6">
              Unique pre-owned pieces sell fast. Start browsing fresh seller drops.
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                closeCart();
                navigate(ROUTES.BROWSE);
              }}
              data-testid="cart-empty-browse-btn"
            >
              Shop New Arrivals
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-line">
              <span className="text-xs uppercase tracking-wider text-muted font-medium">
                Items ({items.length})
              </span>
              <button
                type="button"
                onClick={clearCart}
                className="text-xs text-muted hover:text-danger transition-colors underline"
              >
                Clear all
              </button>
            </div>
            <ul className="divide-y divide-line">
              {items.map((item) => (
                <li key={item.listingId} className="py-3 flex justify-between items-center text-sm">
                  <div>
                    <span className="font-mono text-xs text-muted block">
                      ID: {item.listingId}
                    </span>
                    <span className="font-mono font-medium text-ink">
                      {formatINR(item.price)}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeItem(item.listingId)}
                    className="text-xs text-muted hover:text-danger uppercase tracking-wider p-1"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </Drawer>
    </div>
  );
};
