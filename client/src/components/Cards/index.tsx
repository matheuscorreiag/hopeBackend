import React, { useEffect, useState } from "react";
import { Form, Button, Card } from "react-bootstrap";
import api from "../../services/api";
import "./styles.css";
import "../../index.css";

interface cardForm {
  id?: number;
  message: string;
}

function App() {
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await api.post("/cards/create", form).then((res) => {
      console.log(res);
    });
  };
  const [form, setForm] = useState({ message: "", password: "" });
  const [cards, setCards] = useState([]);

  useEffect(() => {
    api.get("/cards/read").then((res) => {
      setCards(res.data);
    });
  }, [cards]);
  return (
    <div className="App">
      <div className="formContainer">
        <div className="form">
          <Form>
            <Form.Group className="mb-3" controlId="formBasicMessage">
              <Form.Label>Type your message</Form.Label>
              <Form.Control
                type="message"
                placeholder="Enter message"
                onChange={(e) => setForm({ ...form, message: e.target.value })}
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
      <div className="cardsListContainer">
        <h2>Cards on the database</h2>
        {cards.map((card: cardForm) => (
          <Card>
            <Card.Body>
              <div>
                {card.id} | {card.message}
              </div>
              <Button
                variant="danger"
                onClick={() =>
                  api.delete(`/cards/delete/${card.id}`).then((res) => {
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
