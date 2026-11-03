import React, { Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { ROUTES } from '@/config/routes';
import { PublicLayout } from './layouts/PublicLayout';
import { SellerLayout } from './layouts/SellerLayout';
import { AdminLayout } from './layouts/AdminLayout';
import { PlaceholderPage } from './PlaceholderPage';
import { PageSkeleton } from './PageSkeleton';

const LandingPage = React.lazy(
  () => import('@/features/catalog/pages/LandingPage')
);
const AuthPage = React.lazy(
  () => import('@/features/auth/pages/AuthPage')
);
const KitchenSinkPage = React.lazy(
  () => import('@/features/catalog/pages/KitchenSinkPage')
);
const HomePage = React.lazy(
  () => import('@/features/catalog/pages/HomePage')
);
const BrowsePage = React.lazy(
  () => import('@/features/catalog/pages/BrowsePage')
);
const SearchPage = React.lazy(
  () => import('@/features/catalog/pages/SearchPage')
);

export const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <PublicLayout />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<PageSkeleton />}>
            <LandingPage />
          </Suspense>
        ),
      },
      {
        path: ROUTES.AUTH,
        element: (
          <Suspense fallback={<PageSkeleton />}>
            <AuthPage />
          </Suspense>
        ),
      },
      {
        path: ROUTES.USER_HOME,
        element: (
          <Suspense fallback={<PageSkeleton />}>
            <HomePage />
          </Suspense>
        ),
      },
      {
        path: ROUTES.BROWSE,
        element: (
          <Suspense fallback={<PageSkeleton />}>
            <BrowsePage />
          </Suspense>
        ),
      },
      {
        path: ROUTES.BROWSE_CATEGORY,
        element: (
          <Suspense fallback={<PageSkeleton />}>
            <BrowsePage />
          </Suspense>
        ),
      },
      {
        path: ROUTES.SEARCH,
        element: (
          <Suspense fallback={<PageSkeleton />}>
            <SearchPage />
          </Suspense>
        ),
      },
      { path: ROUTES.PRODUCT, element: <PlaceholderPage name="Product Detail" /> },
      { path: ROUTES.RENT, element: <PlaceholderPage name="Rent Feed" /> },
      { path: ROUTES.RENT_DETAIL, element: <PlaceholderPage name="Rental Detail" /> },
      { path: ROUTES.WISHLIST, element: <PlaceholderPage name="Wishlist" /> },
      { path: ROUTES.CART, element: <PlaceholderPage name="Cart Page" /> },
      { path: ROUTES.CHECKOUT, element: <PlaceholderPage name="Checkout" /> },
      { path: ROUTES.ORDERS, element: <PlaceholderPage name="My Orders" /> },
      { path: ROUTES.ORDER_DETAIL, element: <PlaceholderPage name="Order Tracking" /> },
      { path: ROUTES.RENTALS, element: <PlaceholderPage name="My Rentals" /> },
      { path: ROUTES.RENTAL_DETAIL, element: <PlaceholderPage name="Rental QC Timeline & Dues" /> },
      { path: ROUTES.OFFERS, element: <PlaceholderPage name="Offers & Combos" /> },
      { path: ROUTES.SELL, element: <PlaceholderPage name="Sell Landing" /> },
      { path: ROUTES.SELL_NEW, element: <PlaceholderPage name="Listing Wizard" /> },
      { path: ROUTES.SELLER_PROFILE, element: <PlaceholderPage name="Public Seller Store" /> },
      { path: ROUTES.SUPPORT, element: <PlaceholderPage name="Support & Grievances" /> },
      { path: ROUTES.SUPPORT_NEW, element: <PlaceholderPage name="Create Support Ticket" /> },
      { path: ROUTES.SUPPORT_DETAIL, element: <PlaceholderPage name="Ticket Detail" /> },
      { path: ROUTES.PROFILE, element: <PlaceholderPage name="Customer Profile" /> },
      { path: ROUTES.STORIES, element: <PlaceholderPage name="Stories & Editorial" /> },
      { path: ROUTES.STORY_DETAIL, element: <PlaceholderPage name="Story Article" /> },
      {
        path: ROUTES.KITCHEN_SINK,
        element: (
          <Suspense fallback={<PageSkeleton />}>
            <KitchenSinkPage />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: ROUTES.SELLER_DASHBOARD,
    element: <SellerLayout />,
    children: [
      { index: true, element: <PlaceholderPage name="Seller Overview (or Locked)" /> },
      { path: ROUTES.SELLER_LISTINGS, element: <PlaceholderPage name="Seller Listings" /> },
      { path: ROUTES.SELLER_ORDERS, element: <PlaceholderPage name="Seller Orders" /> },
      { path: ROUTES.SELLER_RENTALS, element: <PlaceholderPage name="Seller Rentals" /> },
      { path: ROUTES.SELLER_RETURNS, element: <PlaceholderPage name="Seller Returns Queue" /> },
      { path: ROUTES.SELLER_EARNINGS, element: <PlaceholderPage name="Seller Earnings" /> },
      { path: ROUTES.SELLER_STORE, element: <PlaceholderPage name="Store Settings & Verification" /> },
    ],
  },
  {
    path: ROUTES.ADMIN,
    element: <AdminLayout />,
    children: [
      { index: true, element: <PlaceholderPage name="Admin Dashboard Lite" /> },
      { path: ROUTES.ADMIN_VERIFICATION, element: <PlaceholderPage name="Admin Verification Queue" /> },
      { path: ROUTES.ADMIN_LISTINGS, element: <PlaceholderPage name="Admin Flagged Listings" /> },
      { path: ROUTES.ADMIN_COMPLAINTS, element: <PlaceholderPage name="Admin Escalated Complaints" /> },
    ],
  },
  {
    path: '*',
    element: <PlaceholderPage name="404 - Page Not Found" />,
  },
]);
