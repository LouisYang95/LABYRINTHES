import express from "express";
import {buyObject, getAllObjects, getObjectById} from "../controller/shopController";
const router = express.Router();

router.get("/", getAllObjects);
router.get("/object/:id", getObjectById)
router.get("/buy/:user_id/:object_id", buyObject)

export default router;