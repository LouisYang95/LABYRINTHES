import express from "express";
import { createTrap, deleteTrap, getAllTrapsForLabyrinth, dieFromTrap } from "../controller/trapController";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Trap
 *   description: Gestion des pièges dans le labyrinthe
 */

/**
 * @swagger
 * /trap/create:
 *   post:
 *     summary: Créer un nouveau piège
 *     description: Créer un nouveau piège dans le labyrinthe avec une position donnée.
 *     tags: [Trap]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - object_id
 *               - labyrinth_version_id
 *               - labyrinth_level
 *               - position_x
 *               - position_y
 *               - position_z
 *             properties:
 *               object_id:
 *                 type: integer
 *                 description: ID de l'objet utilisé pour le piège
 *               labyrinth_version_id:
 *                 type: integer
 *                 description: ID de la version du labyrinthe
 *               labyrinth_level:
 *                 type: integer
 *                 description: Niveau du labyrinthe
 *               position_x:
 *                 type: integer
 *                 description: Position X du piège
 *               position_y:
 *                 type: integer
 *                 description: Position Y du piège
 *               position_z:
 *                 type: integer
 *                 description: Position Z du piège
 *     responses:
 *       201:
 *         description: Piège créé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Trap created successfully"
 *                 trap:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     object_id:
 *                       type: integer
 *                     labyrinth_version_id:
 *                       type: integer
 *                     labyrinth_level_id:
 *                       type: integer
 *                     position_x:
 *                       type: integer
 *                     position_y:
 *                       type: integer
 *                     position_z:
 *                       type: integer
 *       400:
 *         description: Paramètres manquants ou piège existant déjà
 *       500:
 *         description: Erreur serveur lors de la création du piège
 */

/**
 * @swagger
 * /trap/{id}:
 *   delete:
 *     summary: Supprimer un piège
 *     description: Supprimer un piège spécifique par son ID.
 *     tags: [Trap]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID du piège à supprimer
 *     responses:
 *       200:
 *         description: Piège supprimé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Trap deleted successfully"
 *       404:
 *         description: Piège non trouvé
 *       400:
 *         description: Paramètres manquants
 *       500:
 *         description: Erreur serveur lors de la suppression du piège
 */

/**
 * @swagger
 * /trap/{labyrinth_version_id}/{labyrinth_level}:
 *   get:
 *     summary: Récupérer tous les pièges d'un labyrinthe
 *     description: Récupérer la liste de tous les pièges pour un niveau spécifique d'une version du labyrinthe.
 *     tags: [Trap]
 *     parameters:
 *       - in: path
 *         name: labyrinth_version_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la version du labyrinthe
 *       - in: path
 *         name: labyrinth_level
 *         required: true
 *         schema:
 *           type: integer
 *         description: Niveau du labyrinthe
 *     responses:
 *       200:
 *         description: Pièges récupérés avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   object_id:
 *                     type: integer
 *                   labyrinth_version_id:
 *                     type: integer
 *                   labyrinth_level_id:
 *                     type: integer
 *                   position_x:
 *                     type: integer
 *                   position_y:
 *                     type: integer
 *                   position_z:
 *                     type: integer
 *       404:
 *         description: Aucun piège trouvé pour ce labyrinthe
 *       400:
 *         description: Paramètres manquants
 *       500:
 *         description: Erreur serveur lors de la récupération des pièges
 */

/**
 * @swagger
 * /trap/die/{user_id}/{trap_id}:
 *   post:
 *     summary: Enregistre la mort d'un utilisateur par un piège
 *     description: Enregistre la mort d'un utilisateur par un piège spécifique. Ajuste les points du propriétaire du piège et de l'utilisateur affecté.
 *     tags: [Trap]
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de l'utilisateur qui est mort
 *       - in: path
 *         name: trap_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID du piège ayant causé la mort
 *     responses:
 *       200:
 *         description: Mort enregistrée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Died successfully"
 *       400:
 *         description: Paramètres manquants
 *       404:
 *         description: Utilisateur ou piège non trouvé
 *       500:
 *         description: Erreur serveur lors de l'enregistrement de la mort
 */

router.post("/create", createTrap);
router.delete("/:id", deleteTrap);
router.get("/:labyrinth_version_id/:labyrinth_level", getAllTrapsForLabyrinth);
router.post("/die/:user_id/:trap_id", dieFromTrap);

export default router;
