import express from "express";
import * as esp from "../controller/espController";
import * as led from "../controller/ledController";

export const router = express.Router();

router.route('/led')
    .get(led.getLedState)
    .put(led.setLedState);

router.route('/esp')
    .get(esp.getAllEsp32s)
    .post(esp.createNewEsp32)


