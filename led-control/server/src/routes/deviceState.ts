import express from "express";
import * as esp from "../controller/espController";
import * as led from "../controller/ledController";


// - One tweak, we won't be setting state from the front end. The device will be do the updating
// - Getter will still be handled by the front end
// - commands will come throught the mqtt route. - rename to deviceState instead of command
const router = express.Router();

router.route('/led')
    .get(led.getLedState)
    .put(led.setLedState);

router.route('/esp')
    .get(esp.getAllEsp32s)
    .post(esp.createNewEsp32)


export default router;