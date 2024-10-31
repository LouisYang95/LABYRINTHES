import express from "express";
import {getSelectedItem, saveSelectedItem, useSelectedItem} from "../controller/selectedItemController";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Selected Item
 *   description: Gestion des objets sélectionnés par l'utilisateur
 */

/**
 * @swagger
 * /selected_item/{user_id}:
 *   get:
 *     summary: Récupérer l'objet sélectionné par l'utilisateur
 *     description: Cette route permet de récupérer l'objet sélectionné par l'utilisateur.  Si aucun objet n
    *     tags: [Selected Item]
    *     parameters:
    *       - in: path
    *         name: user_id
    *         required: true
    *         schema:
    *           type: integer
    *         description: ID de l'utilisateur dont on veut récupérer l'objet sélectionné
    *     responses:
    *       200:
    *         description: Objet sélectionné récupéré avec succès
    *         content:
    *           application/json:
    *             schema:
    *               type: object
    *               properties:
    *                 id:
    *                   type: integer
    *                   description: ID de l'objet sélectionné
    *                 name:
    *                   type: string
    *                   description: Nom de l'objet sélectionné
    *                 description:
    *                   type: string
    *                   description: Description de l'objet sélectionné
    *                 price:
    *                   type: integer
    *                   description: Prix de l'objet sélectionné
    *       404:
    *         description: Aucun objet sélectionné trouvé
    *       500:
    *         description: Erreur serveur lors de la récupération de l'objet sélectionné
 */

/**
 * @swagger
 * /selected_item/save:
 *   post:
 *     summary: Enregistrer un objet sélectionné par l'utilisateur
 *     description: Cette route permet d'enregistrer un objet sélectionné par l'utilisateur.
 *     tags: [Selected Item]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user_id
 *               - object_id
 *             properties:
 *               user_id:
 *                 type: integer
 *                 description: ID de l'utilisateur qui a sélectionné l'objet
 *               object_id:
 *                 type: integer
 *                 description: ID de l'objet sélectionné
 *     responses:
 *       200:
 *         description: Objet sélectionné enregistré avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Objet sélectionné enregistré avec succès."
 *                 selectedItem:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       description: ID de l'objet sélectionné
 *                     name:
 *                       type: string
 *                       description: Nom de l'objet sélectionné
 *                     description:
 *                       type: string
 *                       description: Description de l'objet sélectionné
 *                     price:
 *                       type: integer
 *                       description: Prix de l'objet sélectionné
 *       400:
 *         description: Mauvaise requête
 *       404:
 *         description: Aucun objet sélectionné trouvé
 *       500:
 *         description: Erreur serveur lors de l'enregistrement de l'objet sélectionné
 */

/**
 * @swagger
 * /selected_item/use/{user_id}/{object_id}:
 *   post:
 *     summary: Utiliser un objet sélectionné par l'utilisateur
 *     description: Cette route permet d'utiliser un objet sélectionné par l'utilisateur.
 *     tags: [Selected Item]
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de l'utilisateur qui utilise l'objet
 *       - in: path
 *         name: object_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de l'objet sélectionné à utiliser
 *     responses:
 *       200:
 *         description: Objet sélectionné utilisé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Objet utilisé avec succès."
 *       404:
 *         description: Objet ou utilisateur non trouvé
 *       500:
 *         description: Erreur serveur lors de l'utilisation de l'objet sélectionné
 */

router.get("/:user_id", getSelectedItem);
router.post("/save", saveSelectedItem);
router.post("/use/:user_id/:object_id", useSelectedItem);

export default router;
