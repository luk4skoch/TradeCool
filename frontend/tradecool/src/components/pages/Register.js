import React from "react";

import { useState } from "react";
import { Alert, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [errors, setErrors] = useState(null);

  function registerUser(e) {
    console.log("registering...");
    e.preventDefault();
    const formData = new FormData(e.target);
    const formDataEntries = Object.fromEntries(formData.entries());
    console.log(formDataEntries);

    fetch("http://localhost:8080/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formDataEntries),
    })
      .then((res) => {
        if (res.ok) {
          navigate("/login");
        }
        return res.text();
      })
      .then((res) => setErrors(res))
      .catch((err) => setErrors(err));
  }

  return (
    <div className="form-groups">
      <Form onSubmit={registerUser}>
        <h3>Sign up</h3>
        <Form.Group className="mb-3" controlId="regName">
          <Form.Label>Username</Form.Label>
          <Form.Control
            name="username"
            type="text"
            placeholder="Enter your username"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="regMail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            onChange={() => {
              setErrors(null);
            }}
            name="email"
            type="email"
            placeholder="Enter your email"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="regLocation">
          <Form.Label>Location</Form.Label>
          <Form.Control
            name="location"
            type="text"
            placeholder="Enter your Location"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="regPW">
          <Form.Label>Password</Form.Label>
          <Form.Control
            name="password"
            type="password"
            placeholder="Enter your password"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="regPWRepeat">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Repeat your password" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Sign up now
        </Button>
        {errors ? <Alert>{errors}</Alert> : <br />}
      </Form>
    </div>
  );
}
