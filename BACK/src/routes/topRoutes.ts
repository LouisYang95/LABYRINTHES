import express from "express";
import { getTop, getTopByBadPoints, getTopByGoodPoints } from "../controller/topController";

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
 *     summary: Récupérer le classement général des joueurs
 *     description: Cette route permet de récupérer le classement général des joueurs.
 *     tags: [Top]
 *     responses:
 *       200:
 *         description: Classement général récupéré avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   user_id:
 *                     type: integer
 *                     description: ID de l'utilisateur
 *                   username:
 *                     type: string
 *                     description: Nom d'utilisateur du joueur
 *                   timer:
 *                     type: integer
 *                     description: Timer total de l'utilisateur
 *       500:
 *         description: Erreur serveur lors de la récupération du classement
 */

/**
 * @swagger
 * /top/good:
 *   get:
 *     summary: Récupérer le classement des joueurs par Good Points
 *     description: Cette route permet de récupérer le classement des joueurs en fonction de leurs good points.
 *     tags: [Top]
 *     responses:
 *       200:
 *         description: Classement des joueurs par Good Points récupéré avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   user_id:
 *                     type: integer
 *                     description: ID de l'utilisateur
 *                   username:
 *                     type: string
 *                     description: Nom d'utilisateur du joueur
 *                   good_points:
 *                     type: integer
 *                     description: Nombre de good points
 *       500:
 *         description: Erreur serveur lors de la récupération du classement
 */

/**
 * @swagger
 * /top/bad:
 *   get:
 *     summary: Récupérer le classement des joueurs par Bad Points
 *     description: Cette route permet de récupérer le classement des joueurs en fonction de leurs bad points.
 *     tags: [Top]
 *     responses:
 *       200:
 *         description: Classement des joueurs par Bad Points récupéré avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   user_id:
 *                     type: integer
 *                     description: ID de l'utilisateur
 *                   username:
 *                     type: string
 *                     description: Nom d'utilisateur du joueur
 *                   bad_points:
 *                     type: integer
 *                     description: Nombre de bad points
 *       500:
 *         description: Erreur serveur lors de la récupération du classement
 */

router.get('/', getTop);
router.get('/good', getTopByGoodPoints);
router.get('/bad', getTopByBadPoints);

export default router;
