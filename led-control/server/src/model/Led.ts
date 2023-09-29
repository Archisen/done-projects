import mongoose from "mongoose";
const Schema = mongoose.Schema;


export const ledSchema = new Schema({
    state: {
        type: Boolean,
        required: true
    },
    lumosity: {
        type: Number,
        required: false
    },
    red: {
        type: Number,
        required: false
    },
    green: {
        type: Number,
        required: false
    },
    blue: {
        type: Number,
        required: false
    }
});

export const Led = mongoose.model('LED', ledSchema);
