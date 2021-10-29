import express from "express";
import CardsController from "./controllers/CardsController";
import UsersController from "./controllers/UsersController";

const routes = express.Router();

//users
routes.post("/users/create", UsersController.create);
routes.get("/users/read", UsersController.read);
routes.post("/users/update", UsersController.update);
routes.delete("/users/delete/:id", UsersController.delete);

//cards
routes.post("/cards/create", CardsController.create);
routes.get("/cards/read", CardsController.read);
routes.post("/cards/update", CardsController.update);
routes.delete("/cards/delete/:id", CardsController.delete);

export default routes;
