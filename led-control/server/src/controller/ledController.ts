import { Led } from "../model/Led";
import ESP32 from "../model/Esp";
import express, {Request, Response} from "express";

export const getLedState =async (req:Request, res:Response) => {
    if(!req?.body?.deviceName) return res.status(400).json({
        'message':'Please specify device'
    });

}

export const setLedState = async (req:Request, res:Response) => {
    if(!req?.body?.deviceName) return res.status(400).json({
        'message':'Please specify device'
    });

    if(!req?.body?.state) return res.status(400).json({
        'message':'Please specify led state'
    });

    if(!req?.body?.ledNum) return res.status(400).json({
        'message':'Please specify led state'
    });
    
    const espLed = await ESP32.findOne({deviceName: req.body.deviceName});
    if(!espLed) return res.status(204).json({"message": `Device: ${req.body.deviceName} not found`});
    
    espLed.leds[req.body.ledNum].state = req.body.state;
    const result = await espLed.save();
    res.json(result);

}