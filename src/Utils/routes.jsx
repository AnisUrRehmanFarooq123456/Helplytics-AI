import React, { useEffect, useState } from 'react'
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import PublicRoutes from './publicRoutes';
import ProtectedRoutes from './protectedRoutes';
import { publicRoutesData, protectedRoutesData } from './all-routes';

const AppRoutes = () => {

    // const [checkUserAuthStatus, setCheckUserAuthStatus] = useState(false);
    const navigate = useNavigate();
    const { pathname } = useLocation();
    // console.log('Current path: ', pathname);

    // useEffect(() => {
    //     if (localStorage.getItem('UserAuthenticated') != null) {
    //         const fetchUserAuthStatus = localStorage.getItem('UserAuthenticated');
    //         const authStatus = JSON.parse(fetchUserAuthStatus);
    //         setCheckUserAuthStatus(authStatus);
    //         // console.log('User auth status fetched: ', authStatus);
    //     }

    //     else {
    //         localStorage.setItem("UserAuthenticated", JSON.stringify(false));
    //         setCheckUserAuthStatus(false);
    //         // console.log('Auth status set succesfully!');
    //     };
    // }, []);
    // useEffect(() => {
    //     const isAuthenticated = localStorage.getItem("isLogin") === "true";
    //     setCheckUserAuthStatus(isAuthenticated);
    // }, []);

    // useEffect(() => {
    //     if (checkUserAuthStatus == false && protectedRoutesData.includes(pathname)) {
    //         navigate(publicRoutesData[0]);
    //     }

    //     else if (checkUserAuthStatus == true && publicRoutesData.includes(pathname)) {
    //         navigate(protectedRoutesData[0]);
    //     }
    // }, [checkUserAuthStatus]);
    const isAuthenticated = localStorage.getItem("isLogin") === "true";
    if (localStorage.getItem("isLogin") === null) {
        localStorage.setItem("isLogin", "false");
    }
    return (
        <>
            {/* {checkUserAuthStatus && <Navbar />} */}
            {
                (isAuthenticated)
                    ?
                    (<ProtectedRoutes />)
                    :
                    (<PublicRoutes />)
            }
        </>
    );
};

export default AppRoutes;