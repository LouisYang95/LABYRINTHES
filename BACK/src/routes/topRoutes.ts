import express from "express";
import {getTop} from "../controller/topController";

const router = express.Router();

router.get('/', getTop);

export default router;
