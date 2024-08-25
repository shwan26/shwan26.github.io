import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import HighlightedCars from './pages/HighlightedCars';
import CarList from './pages/CarList';

const router = createBrowserRouter([
  {
    path: "/car-market/",
    element: <Dashboard />,
  },
  {
    path: "/car-market/highlighted-cars",
    element: <HighlightedCars />,
  },
  {
    path: "/car-market/carlist",
    element: <CarList />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
