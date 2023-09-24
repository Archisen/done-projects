import express, {Request, Response} from "express";
import dotenv from 'dotenv';
import { connect, Client, MqttClient } from 'mqtt';


let client: MqttClient;
const topic = "done-crusep23";

const connectMQTT = (req: Request, res: Response) => {
    client = connect('mqtt://broker.hivemq.com');

    client.on("connect", () => {
        console.log(" connected to MQTT broker");
        client.subscribe(topic, (err) => {
            if(!err) client.publish(topic, "app connect done");
        });
    });

    client.on("message", (topic, message) => {
        console.log(message.toString());
        client.end();
    });
}

const sendMQTT = (req: Request, res: Response) => {
    const mqttConnected = client.connected;
    
    if(mqttConnected) {
        try {
            client.publish(topic, req.body.text);
        } catch (error) {
            return res.status(500).json({error: 'Error sending mqtt message'});
        }
    } 
    else {
        console.log("Not conntected to MQTT Broker... Attempting ton reconnect");
        try {
            client.reconnect();
        } catch (error) {
            return res.status(500).json({error: 'Could not reconnect to Broker'});
        }
        sendMQTT(req, res);
    }
    
    res.json({
        "Text": req.body.Text
    });
}

const route = express.Router();

route.post("/", sendMQTT);
route.get("/", connectMQTT);

export default route;
