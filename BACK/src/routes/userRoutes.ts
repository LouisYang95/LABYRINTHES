import express from "express";
import { saveTimer } from "../controller/UserController";
import { getInventory } from "../controller/inventoryController";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: User
 *   description: Gestion des utilisateurs
 */

/**
 * @swagger
 * /user/{user_id}/finish:
 *   post:
 *     summary: Enregistrer le minuteur de l'utilisateur
 *     description: Cette route permet d'enregistrer le minuteur finalisé pour un utilisateur donné.
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de l'utilisateur pour lequel le minuteur est enregistré
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - timer
 *             properties:
 *               timer:
 *                 type: integer
 *                 description: La valeur du minuteur à enregistrer
 *     responses:
 *       200:
 *         description: Minuteur enregistré avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Minuteur enregistré avec succès."
 *       400:
 *         description: Requête incorrecte
 *       404:
 *         description: Utilisateur non trouvé
 */

/**
 * @swagger
 * /user/{user_id}/inventory:
 *   get:
 *     summary: Récupérer l'inventaire de l'utilisateur
 *     description: Cette route permet de récupérer l'inventaire d'un utilisateur spécifique.
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         user_id: user_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de l'utilisateur dont on veut récupérer l'inventaire
 *     responses:
 *       200:
 *         description: Inventaire récupéré avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   item_id:
 *                     type: integer
 *                     description: ID de l'objet dans l'inventaire
 *                   item_name:
 *                     type: string
 *                     description: Nom de l'objet
 *                   quantity:
 *                     type: integer
 *                     description: Quantité de l'objet dans l'inventaire
 *       404:
 *         description: Utilisateur ou inventaire non trouvé
 *       500:
 *         description: Erreur serveur lors de la récupération de l'inventaire
 */

router.post('/:user_id/finish', saveTimer);
router.get('/:user_id/inventory', getInventory);

export default router;
