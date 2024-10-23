import express from 'express';
import { getAllActualLabyrinthLevel, getSeedLabyrinthVersion } from '../controller/labyrinthController';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Seed
 *   description: Gestion des seeds et des niveaux du labyrinthe
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
 *                 id:
 *                   type: integer
 *                   description: ID de la version du labyrinthe
 *                 seed:
 *                   type: integer
 *                   description: Le seed du labyrinthe actuel
 *                 is_active:
 *                   type: boolean
 *                   description: Indique si la version du labyrinthe est active
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
 *                   example: "Aucune version de labyrinthe active trouvée."
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

/**
 * @swagger
 * /seed/level:
 *   get:
 *     summary: Récupérer tous les niveaux du labyrinthe actuel
 *     description: Cette route permet de récupérer tous les niveaux associés à la version actuelle du labyrinthe.
 *     tags: [Seed]
 *     responses:
 *       200:
 *         description: Les niveaux du labyrinthe ont été récupérés avec succès.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: ID du niveau du labyrinthe
 *                   labyrinth_version_id:
 *                     type: integer
 *                     description: ID de la version du labyrinthe
 *                   level_number:
 *                     type: integer
 *                     description: Numéro du niveau
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     description: Date et heure de la création du niveau
 *       404:
 *         description: Aucune version active du labyrinthe ou aucun niveau trouvé.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No labyrinth or levels found."
 *       500:
 *         description: Erreur lors de la récupération des niveaux du labyrinthe.
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
router.get('/level', getAllActualLabyrinthLevel);

export default router;
