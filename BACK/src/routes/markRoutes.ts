import express from 'express';
import {createMark, getMarksByLabyrinthId} from '../controller/markController'

const router = express.Router();

router.get('/:labyrinth_version_id', getMarksByLabyrinthId);
router.post('/create', createMark);

export default router;
