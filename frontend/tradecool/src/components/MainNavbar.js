import React, { useContext } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { UserTokenContext } from "./context/UserToken";

export default function MainNavbar({ navTitle }) {
  const [userToken, setUserToken] = useContext(UserTokenContext);
  const navigate = useNavigate();
  const navigateTo = (route) => {
    navigate(route);
  };
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand
          onClick={() => {
            navigateTo("/");
          }}
          href="#"
        >
          {navTitle}
        </Navbar.Brand>
        <Nav>
          <Nav.Link
            href="#"
            onClick={() => {
              navigateTo("/");
            }}
          >
            Home
          </Nav.Link>
          <Nav.Link
            href="#"
            onClick={() => {
              navigateTo("/overview");
            }}
          >
            Overview
          </Nav.Link>
          {!userToken.userId && (
            <Nav.Link
              href="#"
              onClick={() => {
                navigateTo("/login");
              }}
            >
              SignIn
            </Nav.Link>
          )}
          {!userToken.userId && (
            <Nav.Link
              href="#"
              onClick={() => {
                navigateTo("/register");
              }}
            >
              SignUp
            </Nav.Link>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}
