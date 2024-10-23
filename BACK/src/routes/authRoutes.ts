import express from 'express';
import { createUser, login } from '../controller/authController';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Gestion de l'authentification
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Créer un nouvel utilisateur
 *     description: Permet de créer un nouvel utilisateur en fournissant un nom d'utilisateur et un mot de passe.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Utilisateur créé avec succès
 *       400:
 *         description: Mauvaise requête
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Connexion utilisateur
 *     description: Permet à un utilisateur de se connecter en fournissant son nom d'utilisateur et son mot de passe. En cas de succès, retourne les informations de l'utilisateur ainsi que la version actuelle du labyrinthe.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 description: Le nom d'utilisateur de l'utilisateur
 *               password:
 *                 type: string
 *                 description: Le mot de passe de l'utilisateur
 *     responses:
 *       200:
 *         description: Connexion réussie
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Login successful"
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       description: ID de l'utilisateur
 *                     username:
 *                       type: string
 *                       description: Nom d'utilisateur
 *                 labyrinth_version:
 *                   type: object
 *                   description: La version actuelle du labyrinthe
 *                   properties:
 *                     id:
 *                       type: integer
 *                       description: ID de la version du labyrinthe
 *                     seed:
 *                       type: integer
 *                       description: Seed de la version du labyrinthe
 *       400:
 *         description: Mauvaise requête
 *       401:
 *         description: Authentification échouée
 */

router.post('/register', createUser);
router.post("/login", login);

export default router;
