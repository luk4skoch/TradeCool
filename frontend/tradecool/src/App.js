import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./components/MainLayout";
import Home from "./components/pages/Home";
import Overview from "./components/pages/Overview";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import Chat from "./components/Chat";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/overview" element={<Overview />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/chat/:senderId/:productId/:receiverId" element={<Chat />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
