// All public routes are defined here...!

import React from 'react'
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../Screens/Login/login";
import SignUp from "../Screens/Sign-Up/signUp";
import ForgotPassword from "../Screens/Forgot-Password/forgotPassword"
import PublicHome from '../Screens/Public Home/publicHome';
const PublicRoutes = () => {
    const isAuthenticated = localStorage.getItem("isLogin") === "true";
    if (isAuthenticated) {
        return <Navigate to="/" />;
    }
    return (
        <Routes>
            <Route path='/' element={<PublicHome />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/forgotpassword' element={<ForgotPassword />} />
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    );
};

export default PublicRoutes;