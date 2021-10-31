import React, { useEffect, useState } from "react";
import { Form, Button, Card, InputGroup } from "react-bootstrap";
import api from "../../services/api";
import "./styles.css";
import "../../index.css";

interface cardForm {
  id?: number;
  message: string;
}

function Cards() {
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    await api.post("/cards/create", form).then((res) => {
      console.log(res);
    });
  };
  const handleUpdate = async (e: any) => {
    e.preventDefault();

    console.log(form);
    await api.post("/cards/update", form).then((res) => {
      console.log(res);
    });
  };
  const [form, setForm] = useState<cardForm>({
    message: "",
  });
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
              <Form.Label>Type your new message</Form.Label>
              <Form.Control
                autoComplete="off"
                type="message"
                placeholder="Enter message"
                onChange={(e: any) =>
                  setForm({ ...form, message: e.target.value })
                }
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
        <div className="form">
          <Form>
            <Form.Group className="mb-3" controlId="formBasicMessage">
              <Form.Label>Update your message</Form.Label>
              <InputGroup size="sm" className="mb-3">
                <InputGroup.Text id="inputGroup-sizing-sm">Id</InputGroup.Text>
                <Form.Control
                  onChange={(e: any) =>
                    setForm({ ...form, id: Number(e.target.value) })
                  }
                  aria-label="Small"
                  autoComplete="off"
                  aria-describedby="inputGroup-sizing-sm"
                />
              </InputGroup>

              <Form.Control
                type="message"
                placeholder="Enter message"
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                autoComplete="off"
              />
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              onClick={(e) => handleUpdate(e)}
            >
              Update
            </Button>
          </Form>
        </div>
      </div>
      <div className="cardsListContainer">
        {cards.length > 0 && <h2>Cards on the database</h2>}
        {cards.map((card: cardForm) => (
          <Card key={card.id}>
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

export default Cards;
