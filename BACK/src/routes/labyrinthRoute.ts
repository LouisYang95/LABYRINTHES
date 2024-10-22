import express from 'express';
import { getSeedLabyrinthVersion } from '../controller/labyrinthController';

const router = express.Router();
/**
 * @swagger
 * tags:
 *   name: Seed
 *   description: Gestion des seeds du labyrinthe
 */

/**
 * @swagger
 * /seed:
 *   get:
 *     summary: Récupérer le seed de la version du labyrinthe
 *     description: Cette route permet de récupérer le seed de la version actuelle du labyrinthe.
 *     tags: [Seed]
 *     responses:
 *       200:
 *         description: Le seed de la version du labyrinthe a été récupéré avec succès.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 seed:
 *                   type: integer
 *                   description: Le seed du labyrinthe actuel
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   description: Date et heure de la création du labyrinthe
 *       404:
 *         description: Aucune version de labyrinthe active trouvée.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Aucune version de labyrinthe trouvée."
 *       500:
 *         description: Erreur lors de la récupération de la version du labyrinthe.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Erreur interne du serveur."
 */

router.get('/', getSeedLabyrinthVersion);

export default router;
