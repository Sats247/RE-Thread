import React from 'react';
import { NavLink } from 'react-router-dom';
import { ROUTES } from '@/config/routes';
import { Home, Compass, Calendar, PlusSquare, User as UserIcon } from 'lucide-react';
import { useAuthStore } from '@/stores/auth.store';
import { cn } from '@/shared/lib/cn';

export const BottomTabBar: React.FC = () => {
  const { user } = useAuthStore();

  const tabs = [
    { label: 'Home', href: ROUTES.HOME, icon: Home },
    { label: 'Browse', href: ROUTES.BROWSE, icon: Compass },
    { label: 'Rent', href: ROUTES.RENT, icon: Calendar },
    { label: 'Sell', href: ROUTES.SELL, icon: PlusSquare },
    { label: 'Profile', href: user ? ROUTES.PROFILE : ROUTES.AUTH, icon: UserIcon },
  ];

  return (
    <nav
      data-testid="bottom-tab-bar"
      aria-label="Mobile Navigation"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-paper/95 backdrop-blur-md border-t border-line h-14 pb-[env(safe-area-inset-bottom)] select-none"
    >
      <div className="grid grid-cols-5 h-full items-center">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <NavLink
              key={tab.label}
              to={tab.href}
              data-testid={`tab-${tab.label.toLowerCase()}`}
              className={({ isActive }) =>
                cn(
                  'flex flex-col items-center justify-center h-full transition-colors',
                  isActive ? 'text-ink font-semibold' : 'text-muted hover:text-ink'
                )
              }
            >
              <Icon className="h-4 w-4 mb-0.5 stroke-[1.75]" />
              <span className="text-[10px] uppercase tracking-wider font-medium">
                {tab.label}
              </span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};

