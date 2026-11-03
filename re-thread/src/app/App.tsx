import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { RootErrorBoundary } from '@/shared/ui/RootErrorBoundary';
import { PhoneFrame } from '@/demo/PhoneFrame';

export function App() {
  return (
    <RootErrorBoundary>
      <PhoneFrame>
        <RouterProvider router={router} />
      </PhoneFrame>
    </RootErrorBoundary>
  );
}
