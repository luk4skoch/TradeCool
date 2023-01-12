import React from "react";
import MainNavbar from "./MainNavbar";
import { Outlet } from "react-router";
import { Container } from "react-bootstrap";

export default function MainLayout() {
  return (
    <div>
        <MainNavbar navTitle="Trade Cool" />
        <Container>
          <Outlet />
        </Container>
    </div>
  );
}
