import express from "express";
import {getUserInfo, saveTimer} from "../controller/UserController";
import { getInventory, useObject } from "../controller/inventoryController";

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
 *                 top:
 *                   type: object
 *                   description: Top mis à jour après la sauvegarde du minuteur
 *       400:
 *         description: Requête incorrecte
 *       404:
 *         description: Utilisateur non trouvé
 *       500:
 *         description: Erreur serveur lors de la sauvegarde du minuteur
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
 *         name: user_id
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

/**
 * @swagger
 * /user/{user_id}/{inventory_id}/delete:
 *   post:
 *     summary: Utiliser un objet de l'inventaire de l'utilisateur
 *     description: Cette route permet à un utilisateur de supprimer un objet de son inventaire.
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de l'utilisateur
 *       - in: path
 *         name: inventory_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de l'objet dans l'inventaire
 *     responses:
 *       200:
 *         description: Objet utilisé et supprimé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Objet utilisé avec succès."
 *       404:
 *         description: Utilisateur ou objet non trouvé
 *       500:
 *         description: Erreur serveur lors de la suppression de l'objet
 */

/**
 * @swagger
 * /user/me/{user_id}:
 *   get:
 *     summary: Récupérer les informations de l'utilisateur connecté
 *     description: Cette route permet de récupérer les informations d'un utilisateur spécifique sans retourner son mot de passe.
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de l'utilisateur dont on veut récupérer les informations
 *     responses:
 *       200:
 *         description: Informations de l'utilisateur récupérées avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user_id:
 *                   type: integer
 *                   description: ID de l'utilisateur
 *                 username:
 *                   type: string
 *                   description: Nom d'utilisateur
 *                 email:
 *                   type: string
 *                   description: Adresse e-mail de l'utilisateur
 *                 // Ajoutez d'autres propriétés de l'utilisateur selon votre modèle
 *       404:
 *         description: Utilisateur non trouvé
 *       500:
 *         description: Erreur serveur lors de la récupération des informations de l'utilisateur
 */

router.post('/:user_id/finish', saveTimer);
router.get('/:user_id/inventory', getInventory);
router.post('/:user_id/:inventory_id/delete', useObject);
router.get('/me/:user_id', getUserInfo);

export default router;
