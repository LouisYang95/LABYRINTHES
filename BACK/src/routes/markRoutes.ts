import express from 'express';
import {createMark, getMarksByLabyrinthId, newInteractionForMark} from '../controller/markController'

const router = express.Router();

router.get('/:labyrinth_version_id', getMarksByLabyrinthId);
router.post('/create', createMark);
router.post('/interaction', newInteractionForMark);

export default router;
