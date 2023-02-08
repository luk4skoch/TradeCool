import React from "react";

import { useState } from "react";
import { Alert, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { API } from "../../const/AppConstants";
export default function Register() {
  const navigate = useNavigate();
  const [errors, setErrors] = useState();

  function registerUser(e) {
    console.log("registering...");
    e.preventDefault();
    const formData = new FormData(e.target);
    const formDataEntries = Object.fromEntries(formData.entries());
    if (formDataEntries.password === formDataEntries.passwordTest) {
      fetch(API + "/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formDataEntries),
      }).then((res) => {
        if (res.ok) {
          navigate("/login");
        } else {
          res.text().then((result) => {
            setErrors(result);
          });
        }
      });
    } else {
      setErrors("passwords dont match")
    }

  }
  return (
    <div className="form-groups">
      {errors && (
        <Alert key={"warning"} variant={"warning"}>
          {errors}
        </Alert>
      )}
      <Form onSubmit={registerUser}>
        <h3>Sign up</h3>
        <Form.Group className="mb-3" controlId="regName">
          <Form.Label>Username</Form.Label>
          <Form.Control
            name="username"
            type="text"
            placeholder="Enter your username"
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="regMail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            onChange={() => {
              setErrors("");
            }}
            name="email"
            type="email"
            placeholder="Enter your email"
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="regLocation">
          <Form.Label>Location</Form.Label>
          <Form.Control
            name="location"
            type="text"
            placeholder="Enter your Location"
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="regPW">
          <Form.Label>Password</Form.Label>
          <Form.Control
            name="password"
            type="password"
            placeholder="Enter your password"
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="regPWRepeat">
          <Form.Label>Password</Form.Label>
          <Form.Control name={"passwordTest"} type="password" placeholder="Repeat your password" required />
        </Form.Group>
        <Button variant="primary" type="submit">
          Sign up now
        </Button>
      </Form>
    </div>
  );
}
