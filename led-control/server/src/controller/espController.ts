import { Request, Response } from "express";
import ESP32 from "../model/Esp";

export const getAllEsp32s = async (req:Request, res:Response) => {
    const esp32s = await ESP32.find();
    if(!esp32s) return res.status(204).json({'message': 'No esp32s found'});
    res.json(esp32s);
}

export const createNewEsp32 = async (req:Request, res:Response) => {
    if(!req?.body?.deviceName) return res.status(400).json({'meaasge':'Device Name required'});

    try {
        const result = await ESP32.create({
            deviceName: req.body.deviceName
        });
        res.status(201).json(result);
    } catch (error) {
        console.log(error);
    }
}