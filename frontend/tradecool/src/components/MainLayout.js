import React from "react";
import MainNavbar from "./MainNavbar";
import { Outlet } from "react-router";
import { Container } from "react-bootstrap";
import { UserTokenContext } from "./context/UserToken";

export default function MainLayout() {
  const [userToken, setUserToken] = React.useState(
    localStorage.getItem("userToken")
  );
  if (!userToken) setUserToken({ userId: null });
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
