import React from "react";
import { FormGroup } from "react-bootstrap";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router";
import { UserTokenContext } from "../context/UserToken";

export default function Login() {
  const navigate = useNavigate();

  const [userToken, setUserToken] = React.useContext(UserTokenContext);

  const loginUser = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formDataEntries = Object.fromEntries(formData.entries());

    fetch(
      "http://localhost:8080/auth/login?email=" +
        formDataEntries["email"] +
        "&password=" +
        formDataEntries["password"],
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((res) => {
      if (res.ok) {
        res.json().then((token) => {
          setUserToken(token);
          localStorage.setItem("userToken", userToken);
        });
        navigate("/");
      } else {
        res.json().then((errorResponse) => {
          console.log(errorResponse);
        });
      }
    });
  };

  const navigateToSignUP = () => {
    navigate("/register");
  };

  return (
    <Form onSubmit={loginUser}>
      <h3>Sign in</h3>
      <Form.Group className="mb-3" controlId="authMail">
        <Form.Label>Email</Form.Label>
        <Form.Control
          name="email"
          type="email"
          placeholder="Enter your email"
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="authPW">
        <Form.Label>Password</Form.Label>
        <Form.Control
          name="password"
          type="password"
          placeholder="Enter your password"
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Sign in
      </Button>
      <FormGroup>
        <p className="forgot-password text-right">
          Forgot{" "}
          <a href="/signup" onClick={navigateToSignUP}>
            password?
          </a>
        </p>
      </FormGroup>
    </Form>
  );
}
