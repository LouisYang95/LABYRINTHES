import express from "express";
import { getTop } from "../controller/topController";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Top
 *   description: Gestion des tops des joueurs
 */

/**
 * @swagger
 * /top:
 *   get:
 *     summary: Récupérer le classement des joueurs
 *     description: Cette route permet de récupérer le top des joueurs classés.
 *     tags: [Top]
 *     responses:
 *       200:
 *         description: Classement récupéré avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   user_id:
 *                     type: integer
 *                   username:
 *                     type: string
 *                   score:
 *                     type: integer
 *       500:
 *         description: Erreur serveur lors de la récupération du classement
 */

router.get('/', getTop);

export default router;
