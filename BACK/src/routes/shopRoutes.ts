import express from "express";
import { buyObject, getAllObjects, getObjectById } from "../controller/shopController";
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Shop
 *   description: Gestion de la boutique d'objets
 */

/**
 * @swagger
 * /shop:
 *   get:
 *     summary: Récupérer tous les objets de la boutique
 *     description: Cette route permet de récupérer la liste de tous les objets disponibles dans la boutique.
 *     tags: [Shop]
 *     responses:
 *       200:
 *         description: Objets récupérés avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   price:
 *                     type: number
 *       500:
 *         description: Erreur serveur lors de la récupération des objets
 */

/**
 * @swagger
 * /shop/object/{id}:
 *   get:
 *     summary: Récupérer un objet spécifique par son ID
 *     description: Cette route permet de récupérer un objet spécifique de la boutique en fonction de son ID.
 *     tags: [Shop]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de l'objet à récupérer
 *     responses:
 *       200:
 *         description: Objet récupéré avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 price:
 *                   type: number
 *       404:
 *         description: Objet non trouvé
 *       500:
 *         description: Erreur serveur lors de la récupération de l'objet
 */

/**
 * @swagger
 * /shop/buy/{user_id}/{object_id}:
 *   get:
 *     summary: Acheter un objet de la boutique
 *     description: Cette route permet à un utilisateur d'acheter un objet de la boutique en fonction de son ID.
 *     tags: [Shop]
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de l'utilisateur acheteur
 *       - in: path
 *         name: object_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de l'objet à acheter
 *     responses:
 *       200:
 *         description: Objet acheté avec succès
 *       400:
 *         description: Requête incorrecte, comme des fonds insuffisants ou un objet non disponible
 *       404:
 *         description: Objet ou utilisateur non trouvé
 *       500:
 *         description: Erreur serveur lors de l'achat de l'objet
 */

router.get("/", getAllObjects);
router.get("/object/:id", getObjectById);
router.get("/buy/:user_id/:object_id", buyObject);

export default router;
