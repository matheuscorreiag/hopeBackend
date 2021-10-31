import React, { useEffect, useState } from "react";
import { Form, Button, Card } from "react-bootstrap";
import api from "../../services/api";
import "./styles.css";
import "../../index.css";

interface UserForm {
  id?: number;
  email: string;
  password: string;
}

function App() {
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await api.post("/users/create", form).then((res) => {
      console.log(res);
    });
  };
  const [form, setForm] = useState({ email: "", password: "" });
  const [users, setUsers] = useState([]);

  useEffect(() => {
    api.get("/users/read").then((res) => {
      setUsers(res.data);
    });
  }, [users]);
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
            <Button
              variant="primary"
              type="submit"
              onClick={(e) => handleSubmit(e)}
            >
              Save
            </Button>
          </Form>
        </div>
      </div>
      <div className="usersListContainer">
        {users.length > 0 && <h2>Users on the database</h2>}

        {users.map((user: UserForm) => (
          <Card>
            <Card.Body>
              <div>
                {user.id} | {user.email}
              </div>
              <Button
                variant="danger"
                onClick={() =>
                  api.delete(`/users/delete/${user.id}`).then((res) => {
                    console.log(res);
                  })
                }
              >
                X
              </Button>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default App;
