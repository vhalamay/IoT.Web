import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./links";

import Layout from "./views/layout";
import HomeContent from './views/home/home';
import LoginContent from './views/identity/login';

import DevicesContent  from './views/devices/devices';

import * as Links from './links';

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={ <Layout/>}>
                    <Route index element={ <HomeContent/>} />
                    
                    <Route path={Links.Link_Identity_Login()} element={<LoginContent/>} />
                    <Route path={Links.Link_Devices()} element={<DevicesContent/>} />

                    <Route path="*" element={ <Layout/>} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}