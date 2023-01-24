import React from "react";
import {Container, Nav, Navbar} from "react-bootstrap";
import {redirect, useNavigate} from "react-router-dom";
import jwtDecode from "jwt-decode";
import {useUserTokenContext, useUserTokenUpdateContext} from "../context/UserTokenContext";

export default function MainNavbar({navTitle}) {
    const userToken = useUserTokenContext();
    const setUserToken = useUserTokenUpdateContext();
    const navigate = useNavigate();
    const navigateTo = (route) => {
        navigate(route);
    };
    const userName = userToken ? jwtDecode(userToken).sub : null;
    const signOut = () => {
        localStorage.removeItem("userToken");
        setUserToken(null);
        redirect("/")
    };

    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand
                    onClick={() => {
                        navigateTo("/home");
                    }}
                    href="#"
                >
                    {navTitle}
                </Navbar.Brand>
                <Nav>
                    <Nav.Link
                        href="#"
                        onClick={() => {
                            navigateTo("/home");
                        }}
                    >
                        Home
                    </Nav.Link>

                    <Nav.Link
                        href="#"
                        onClick={() => {
                            navigateTo("/products");
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
                        <>
                            <Nav.Link href="#">
                                <Nav.Item>Welcome, {userName}!
                                </Nav.Item>
                            </Nav.Link>
                            <Nav.Link href="#" onClick={signOut}>
                                <Nav.Item> Sign out</Nav.Item>
                            </Nav.Link>
                        </>
                    )}
                </Nav>
            </Container>
        </Navbar>
    );
}
