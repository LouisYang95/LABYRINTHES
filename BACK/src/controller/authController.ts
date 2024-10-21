import {Request, Response} from 'express';
import User from "../model/User";
import bcrypt from "bcrypt";

export const createUser = async (req: Request, res: Response) => {
    try {
        console.log(req.body);
        const { username, password } = req.body;

        // Vérifier si l'utilisateur existe déjà
        const existingUser = await User.findOne({ where: { username } });
        if (existingUser) {
            return res.status(400).json({ message: "Username already exists." });
        }

        // Vérifier la longueur du mot de passe
        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters long." });
        }

        // Hashage du mot de passe avant de le stocker
        const hashedPassword = await bcrypt.hash(password, 10);

        // Création de l'utilisateur
        await User.create({
            username,
            password: hashedPassword,
            good_points: 0,
            bad_points: 0,
        });

        return res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        console.error("Error creating user:", error);
        console.log(req.body);
        return res.status(500).json({ message: "Error creating user" });
    }
};
export const login = async (req: Request, res: Response) => {
    try {
        const {username, password} = req.body;

        if (!username || !password) {
            return res.status(400).json({message: "Username and password are required."});
        }

        const user = await User.findOne({
            where: {
                username: username,
            },
        });

        if (!user) {
            return res.status(400).json({message: "Invalid username or password."});
        }

        const userInfo = {
            username : user.get("username"),
            good_points: user.get("good_points"),
            bad_points: user.get("bad_points"),
        }

        const validPassword = bcrypt.compare(password, <string>user.get("password"));
        if (!validPassword) {
            return res.status(400).json({message: "Invalid username or password."});
        }

        return res.status(200).json({message: "Login successful", user: userInfo});
    } catch (error) {
        console.error("Error during user login :", error);
        res
            .status(500)
            .json({ message: "Error during user login" });
    }
}
