import React from "react";
import { Alert, FormGroup, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router";

export default function Login() {
  const navigate = useNavigate();
  const [errors, setErrors] = React.useState([]);

  const loginUser = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formDataEntries = Object.fromEntries(formData.entries());
    const basicAuthToken = btoa(formDataEntries["email"] + ":" + formDataEntries["password"]);
    fetch(
      "http://localhost:8080/auth/signin",      
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Basic " + basicAuthToken
        },
      }
    ).then((res) => {
      if (res.ok) {
        res.json().then((token) => {
          localStorage.setItem("userToken", token);
        });
        navigate("/");
      } else {
        res.text().then((result) => {
          console.log(result);
          setErrors(result);
        });
      }
    });
  };

  const navigateToSignUP = () => {
    navigate("/register");
  };
  console.log(errors);
  return (
    <div className="form-groups">
    <Form onSubmit={loginUser} >
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
      {/* {errors && <Alert>{errors}</Alert>} */}
    </Form>
    </div>
  );
}
