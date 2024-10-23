import express from 'express';
import { createMark, getMarksByLabyrinthId, newInteractionForMark } from '../controller/markController';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Mark
 *   description: Gestion des marques dans le labyrinthe
 */

/**
 * @swagger
 * /mark/{labyrinth_version_id}/{labyrinth_level_id}:
 *   get:
 *     summary: Récupérer toutes les marques d'un niveau de labyrinthe
 *     description: Cette route permet de récupérer toutes les marques pour une version et un niveau spécifique du labyrinthe.
 *     tags: [Mark]
 *     parameters:
 *       - in: path
 *         name: labyrinth_version_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la version du labyrinthe
 *       - in: path
 *         name: labyrinth_level_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID du niveau du labyrinthe
 *     responses:
 *       200:
 *         description: Marques récupérées avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   text:
 *                     type: string
 *                   user_id:
 *                     type: integer
 *                   position:
 *                     type: object
 *                     properties:
 *                       position_x:
 *                         type: integer
 *                       position_y:
 *                         type: integer
 *                       position_z:
 *                         type: integer
 *       404:
 *         description: Aucune marque trouvée pour ce labyrinthe et niveau
 */

/**
 * @swagger
 * /mark/create:
 *   post:
 *     summary: Créer une nouvelle marque
 *     description: Créer une nouvelle marque avec un texte et une position dans le labyrinthe.
 *     tags: [Mark]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user_id
 *               - labyrinth_version_id
 *               - labyrinth_level_id
 *               - text
 *               - position_x
 *               - position_y
 *               - position_z
 *             properties:
 *               user_id:
 *                 type: integer
 *               labyrinth_version_id:
 *                 type: integer
 *               labyrinth_level_id:
 *                 type: integer
 *               text:
 *                 type: string
 *               position_x:
 *                 type: integer
 *               position_y:
 *                 type: integer
 *               position_z:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Marque créée avec succès
 *       400:
 *         description: Mauvaise requête
 */

/**
 * @swagger
 * /mark/interaction:
 *   post:
 *     summary: Ajouter une interaction avec une marque
 *     description: Permet à un utilisateur d'ajouter une interaction (like ou dislike) à une marque existante.
 *     tags: [Mark]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - mark_id
 *               - user_id
 *               - interaction_type
 *             properties:
 *               mark_id:
 *                 type: integer
 *               user_id:
 *                 type: integer
 *               interaction_type:
 *                 type: string
 *                 enum: [like, dislike]
 *     responses:
 *       201:
 *         description: Interaction ajoutée avec succès
 *       400:
 *         description: Mauvaise requête
 *       404:
 *         description: Marque non trouvée
 */

router.get('/:labyrinth_version_id/:labyrinth_level_id', getMarksByLabyrinthId);
router.post('/create', createMark);
router.post('/interaction', newInteractionForMark);

export default router;

