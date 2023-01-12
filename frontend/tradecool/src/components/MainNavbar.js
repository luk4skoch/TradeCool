import React, { useContext } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function MainNavbar({ navTitle }) {
  const navigate = useNavigate();
  const navigateTo = (route) => {
    navigate(route);
  };
  const userToken = localStorage.getItem("userToken");
  const userName = userToken ? atob(userToken).name : null;
  const signOut = () => {
    localStorage.setItem("userToken", null);
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

          {!userToken && (
            <Nav.Link
              href="#"
              onClick={() => {
                navigateTo("/login");
              }}
            >
              SignIn
            </Nav.Link>
          )}

          {!userToken && (
            <Nav.Link
              href="#"
              onClick={() => {
                navigateTo("/register");
              }}
            >
              SignUp
            </Nav.Link>
          )}

          {userToken && (
            <Nav.Link href="#" onClick={signOut}>
              <Nav.Item>Welcome, {userName}! Sign out</Nav.Item>
            </Nav.Link>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}
