import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Error404 from './Pages/Error404';
import DailyLogTable from './Pages/DailyLogTable';
import UserProfile from './Pages/UserProfile';
import { userLoader } from './component/utils';
import WeeklyTable from './Pages/WeeklyTable';
import AboutPage from './Pages/AboutPage';
import MainPage from './Pages/MainPage';


const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <Error404 />,
        loader: userLoader,
        children: [
            {
                path: 'select_daily',
                element: <DailyLogTable />,
            },
            {
                path: 'select_weekly',
                element: <WeeklyTable />,
            },
            {
                path: ':id',
                element: <UserProfile />,
            },
            {
                path: '',
                element: <MainPage />,
            },
            {
                path: 'about',
                element: <AboutPage />,
            }
        ],
    },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
