import express from 'express';
import { getSeedLabyrinthVersion } from '../controller/labyrinthController';

const router = express.Router();

router.get('/', getSeedLabyrinthVersion);

export default router;
