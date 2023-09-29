import mongoose from "mongoose";
const Schema = mongoose.Schema;
import { Led, ledSchema } from "./Led";

const espSchema = new Schema({
    deviceType:{
        type: String,
        required: false
    }
    ,deviceName: {
        type: String,
        required: true
    },
    leds: [ledSchema]
}); 

const ESP32 = mongoose.model('ESP32', espSchema);
export default ESP32;
