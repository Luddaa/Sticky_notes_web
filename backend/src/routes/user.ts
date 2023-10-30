import express from "express";
import* as Usercontroller from "../controllers/user2";

const routes = express.Router();

routes.post("/signup", Usercontroller.signUp);

export default routes;