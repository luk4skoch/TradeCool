import React from "react";
import { Alert, FormGroup, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import { useUserTokenUpdateContext } from "../../context/UserTokenContext";
import { basicFetch } from "../utils/FetchUtils";

export default function Login() {
  const navigate = useNavigate();
  const [errors, setErrors] = React.useState();
  const setUserToken = useUserTokenUpdateContext();
  if (!localStorage.getItem("userToken")) {
    setUserToken();
  }

  const loginUser = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formDataEntries = Object.fromEntries(formData.entries());
    const auth = formDataEntries["email"] + ":" + formDataEntries["password"];
    const basicAuthToken = btoa(auth);
    const authorization = "Basic " + basicAuthToken;

    let headers = new Headers();
    headers.append("Authorization", authorization);

    const requestOptions = {
      method: "POST",
      headers: headers,
    };
    basicFetch("/auth/signin", requestOptions).then((res) => {
      if (res.ok) {
        res.text().then((token) => {
          localStorage.setItem("userToken", token);
          setUserToken(token);
        });
        navigate("/");
      } else {
        setErrors("Wrong credentials! Try again!");
      }
    });
  };

  const navigateToSignUP = () => {
    navigate("/register");
  };

  return (
    <div className="form-groups">
      {errors ? <Alert>{errors}</Alert> : <br />}

      <Form
        onSubmit={loginUser}
        onChange={() => {
          setErrors(null);
        }}
      >
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
    </div>
  );
}
