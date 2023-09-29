import express, {Request, Response} from "express";
import dotenv from 'dotenv';
import { connect, Client, MqttClient } from 'mqtt';
import { connectMQTT, sendMQTT } from "../controller/mqttController";


const route = express.Router();

route.post("/", sendMQTT);
route.get("/", connectMQTT);

export default route;
