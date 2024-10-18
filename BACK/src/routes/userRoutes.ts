import express from "express";
import {saveTimer} from "../controller/UserController";

const router = express.Router();

router.get('/try', (req, res) => {
    res.send("What's up doc ?!");
})

router.post('/:user_id/finish', saveTimer);

export default router;
