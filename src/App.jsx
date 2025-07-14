import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainLayout from './Components/MainLayout';
import Home from './Pages/Home';
import Products from './Pages/Products';
import ProductDetail from './Pages/ProductDetail';
import Cart from './Pages/Cart';
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';
import PrivateRoute from './Components/PrivateRoute';
import About from './Pages/About';
import Profile from './Pages/Profile';
import OrderHistory from './Pages/OrderHistory';
import Checkout from './Pages/Checkout';
import ThankYou from './Pages/ThankYou';

export default function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <MainLayout />,
      children: [
        {
          path: '',
          element: <Home />,
        },
        {
          path: 'products',
          element: <Products />,
        },
        {
          path: 'products/:id',
          element: <ProductDetail />,
        },
        {
          path: 'cart',
          element: <Cart />,
        },
        {
          path: 'about',
          element: <About />,
        },
        {
          path: 'profile',
          element: (
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          ),
        },
        {
          path: 'orders',
          element: (
            <PrivateRoute>
              <OrderHistory />
            </PrivateRoute>
          ),
        },
        {
          path: 'checkout',
          element: (
            <PrivateRoute>
              <Checkout />
            </PrivateRoute>
          ),
        },
        {
          path: 'thankyou',
          element: <ThankYou />
        }
      ],
    },
    {
      path: '/login',
      element: <Login />,
    },
    {
      path: '/signup',
      element: <SignUp />,
    },
  ]);

  return <RouterProvider router={router} />;
}
