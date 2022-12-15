import MainNavbar from "./MainNavbar";
import { Outlet } from "react-router";
import { Container } from "react-bootstrap";
import React from "react";
import { UserTokenContext } from "./context/UserToken";

export default function MainLayout() {
  const [userToken, setUserToken] = React.useState(
    localStorage.getItem("userToken")
  );


  return (
    <div>
      <UserTokenContext.Provider value={[userToken, setUserToken]}>
        <MainNavbar navTitle="Trade Cool" />
        <Container>
          <Outlet />
        </Container>
      </UserTokenContext.Provider>
    </div>
  );
}
