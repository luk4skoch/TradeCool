import React from "react";
import "./App.css"
import {BrowserRouter, Route, Routes} from "react-router-dom";
import MainLayout from "./components/MainLayout";
import Home from "./components/pages/Home";
import Overview from "./components/pages/Overview";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import Chat from "./components/Chat";
import {UserTokenContextProvider} from "./context/UserTokenContext";

export default function App() {
    return (
        <UserTokenContextProvider>
            <BrowserRouter>
                <Routes>
                    <Route element={<MainLayout/>}>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/overview" element={<Overview/>}/>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/register" element={<Register/>}/>
                        <Route path="/chat/:senderId/:productId/:receiverId" element={<Chat/>}/>
                    </Route>
                </Routes>
            </BrowserRouter>
        </UserTokenContextProvider>
    );
}
