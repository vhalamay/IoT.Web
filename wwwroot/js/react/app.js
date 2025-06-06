import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./links";

import Layout from "./views/layout";
import HomeContent from './views/home/home';
import LoginContent from './views/identity/login';

import DevicesContent  from './views/devices/devices';
import DeviceSessionsContent from './views/devices/device-sessions';
import DeviceDashboardContent from './views/devices/dashboard';
import SessionsContent  from './views/sessions/sessions';
import SessionDashboardContent  from './views/sessions/dashboard';
import SessionImagesContent  from './views/sessions/images';

import * as Links from './links';

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={ <Layout/>}>
                    <Route index element={ <HomeContent/>} />
                    
                    <Route path={Links.Link_Identity_Login()} element={<LoginContent/>} />
                    <Route path={Links.Link_Devices()} element={<DevicesContent/>} />
                    <Route path={Links.Link_Device_Sessions()} element={<DeviceSessionsContent/>} />
                    <Route path={Links.Link_Sessions()} element={<SessionsContent/>} />
                    <Route path={Links.Link_Session_Dashboard()} element={<SessionDashboardContent/>} />
                    <Route path={Links.Link_Device_Dashboard()} element={<DeviceDashboardContent/>} />
                    <Route path={Links.Link_Device_Dashboard()} element={<DeviceDashboardContent/>} />
                    <Route path={Links.Link_Session_Images()} element={<SessionImagesContent/>} />

                    <Route path="*" element={ <Layout/>} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}