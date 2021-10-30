import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import api from "../../services/api";
import "./styles.css";
import "../../index.css";

function App() {
  const handleSubmit = () => {
    api.post("/", form);
  };
  const [form, setForm] = useState({ email: "", password: "" });
  return (
    <div className="App">
      <div className="formContainer">
        <div className="form">
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
            </Form.Group>
            <Button variant="primary" type="submit" onClick={handleSubmit}>
              Save
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default App;
