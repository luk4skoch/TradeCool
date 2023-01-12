import React from "react";
import MainNavbar from "./MainNavbar";
import { Outlet } from "react-router";
import { Container } from "react-bootstrap";
import Logo from './img/tradecool-scribble.png'

export default function MainLayout() {
  return (
    <div>
        <MainNavbar navTitle=<img width="100px" height="auto" className="img-responsive" src={Logo}  alt="logo" /> />
        <Container>
          <Outlet />
        </Container>
    </div>
  );
}
