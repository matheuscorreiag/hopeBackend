import express from "express";
import UsersController from "./controllers/ UsersController";

const routes = express.Router();

routes.get("/create", UsersController.create);
routes.get("/read", UsersController.read);
routes.get("/update", UsersController.update);
routes.get("/delete", UsersController.delete);

export default routes;
