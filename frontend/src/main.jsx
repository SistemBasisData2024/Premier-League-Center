import React from 'react';

import ReactDOM from 'react-dom/client';
import App from './App';
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ClubsPage from './pages/ClubsPage';
import ClubDetail from './pages/ClubDetail';
import ErrorPage from './pages/Page404';
import DataManagementPage from './pages/DataManagementPage';
import LeaderboardPage from './pages/LeaderboardPage';
import './index.css';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<MainPage />} />
      <Route path="home" element={<MainPage />} />
      <Route path="*" element={<ErrorPage />} />
      <Route path="login" element={<LoginPage />} />
      <Route path="register" element={<RegisterPage />} />
      <Route path="clubs" element={<ClubsPage />} />
      <Route path="clubs/:team_code" element={<ClubDetail />} />
      <Route path="datamanagement" element={<DataManagementPage />} />
      <Route path="leaderboard" element={<LeaderboardPage />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}>
    </RouterProvider>
  </React.StrictMode>
);
