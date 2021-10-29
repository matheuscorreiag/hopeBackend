import express from "express";
import UsersController from "./controllers/ UsersController";

const routes = express.Router();

routes.post("/create", UsersController.create);
routes.get("/read", UsersController.read);
routes.post("/update", UsersController.update);
routes.delete("/delete/:id", UsersController.delete);

export default routes;
