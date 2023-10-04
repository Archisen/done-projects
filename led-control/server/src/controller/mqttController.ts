import express, {Request, Response} from "express";
import dotenv from 'dotenv';
import { connect, MqttClient, IClientOptions } from 'mqtt';

const topic = "done-crusep23";
let retryFlag = true;

const options: IClientOptions = {
    host: '7541ecb15ad243cb9a3732644a691b68.s2.eu.hivemq.cloud',
    port: 8883,
    protocol: 'mqtts',
    username: 'cruiseTest',
    password: 'password'
}

let client: MqttClient;


export const connectMQTT = (req: Request, res: Response) => {
    try {
        client = connect(options);
    } catch (error) {
        res.status(500).json({error: 'something went wrong trying to connect'});
    }
    res.status(200).json({body: "Connected to mqttBroker"});

    client.on("connect", () => {
        console.log(" connected to MQTT broker");
        client.subscribe(topic, (err) => {
            // if(!err) client.publish(topic, "app connect done");
        });
    });

    client.on("message", (topic, message) => {
        console.log("Messaging");
        console.log(message.toString());
    });
}

export const sendMQTT = (req: Request, res: Response) => {
    if(client.connected) console.log("Client connected");
    else {
        console.log("Bro wtf");
        try {
            client.reconnect();
        } catch (error) {
            return res.status(500).json({error: 'Could not reconnect to Broker'});
        }
    }
    const data = JSON.stringify(req.body);
    
    try {
        console.log("Message: " + data);

        client.publish(topic, data);
        retryFlag = false;
    } catch (error) {
        return res.status(500).json({error: 'Error sending mqtt message'});
    }
    
    res.json({
        "Text": req.body.Text
    });
}
