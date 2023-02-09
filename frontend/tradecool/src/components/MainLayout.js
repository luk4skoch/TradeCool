import React, { useEffect } from "react";
import MainNavbar from "./MainNavbar";
import { Outlet } from "react-router";
import { Container } from "react-bootstrap";
import Logo from "./img/tradecool-scribble.png";
import ErrorBoundary from "./pages/ErrorBoundery";
import { useUserTokenContext } from "../context/UserTokenContext";
import { useNavigate } from "react-router-dom";

export default function MainLayout() {
  let userToken = useUserTokenContext();
  const navigate = useNavigate();
  useEffect(() => {
    if (userToken) {
      navigate("/home");
    } else {
      navigate("/login");
    }
  }, [userToken]);
  return (
    <div>
      <MainNavbar
        navTitle={
          <img
            width="100px"
            height="auto"
            className="img-responsive"
            src={Logo}
            alt="logo"
          />
        }
      />
      <Container>
        <ErrorBoundary />
        <Outlet />
      </Container>
    </div>
  );
}
