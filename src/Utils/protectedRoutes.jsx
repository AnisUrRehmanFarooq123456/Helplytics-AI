// All protected routes are defined here...!
import React from 'react'
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from '../Screens/Dashboard/dashboard';
import Details from '../Screens/Details/details';
import Explore from '../Screens/Explore/explore';
import Leaderboard from '../Screens/Leaderboard/leaderboard';
import Notifications from '../Screens/Notifications/notifications';
import AICenter from '../Screens/AICenter/aiCenter';
import CreateRequest from '../Screens/CreateRequest/createRequest';
import Messages from '../Screens/Messages/messages';

const ProtectedRoutes = () => {
    const isAuthenticated = localStorage.getItem("isLogin") === "true";
    if (!isAuthenticated) {
        return <Navigate to="/" />;
    }
    return (
        <Routes>
            <Route path='/' element={<Navigate to="/dashboard" />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/details' element={<Details />} />
            <Route path='/explore' element={<Explore />} />
            <Route path='/leaderboard' element={<Leaderboard />} />
            <Route path='/notifications' element={<Notifications />} />
            <Route path='/ai-center' element={<AICenter />} />
            <Route path='/create-request' element={<CreateRequest />} />
            <Route path='/messages' element={<Messages />} />
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    );
};
export default ProtectedRoutes;