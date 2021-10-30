import React from "react";
import { Button, Card } from "react-bootstrap";
import "./styles.css";
import "../../index.css";

function Cards() {
  return (
    <div className="App">
      <div className="cardsContainer">
        <Card style={{ width: "18rem" }}>
          <Card.Body>
            <Card.Title>Type your message</Card.Title>
            <textarea />
            <Button variant="primary">Save</Button>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}

export default Cards;
