import { Request, Response } from 'express';
import User from "../model/User";
import Top from "../model/Top";
import {getTop} from "./topController";


export const saveTimer = async (req: Request, res: Response) => {
    const { user_id } = req.params;
    const { timer } = req.body;

    try {
        const user = await User.findByPk(user_id);
        console.log(user_id);
        if (!user) {
            console.log(user);
            return res.status(404).json({ message: 'Utilisateur non trouvé.' });
        }


        const newTimer = await Top.create({
            user_id: user.get('id'),
            timer: timer
        });

        if (!newTimer) {
            return res.status(500).json({ message: 'Erreur lors de la sauvegarde du timer.' });
        }

        return res.json({message: 'Timer sauvegardé'});
    } catch (error) {
        console.error('Erreur lors de la sauvegarde du timer:', error);
        return res.status(500).json({ message: 'Erreur lors de la sauvegarde du timer.' });
    }
}

export const getUserInfo = async (req: Request, res: Response) => {
    const { user_id } = req.params;

    try {

        const user = await User.findByPk(user_id);

        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé.' });
        }

        const { password, ...userWithoutPassword } = user.get();

        return res.json(userWithoutPassword);

    } catch (error) {
        return res.status(500).json({ message: 'Erreur lors de la récupération des informations de l\'utilisateur.' });
    }
}
