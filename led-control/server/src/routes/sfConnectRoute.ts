import express from "express";
import { sfConnect, sfTestQuery } from "../controller/sfConnController";

const route = express.Router();

route.get("/connect", sfConnect);
route.get("/test", sfTestQuery);

export default route;