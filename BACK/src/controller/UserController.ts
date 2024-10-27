import { Request, Response } from 'express';
import User from "../model/User";
import Top from "../model/Top";
import {getTop} from "./topController";


export const saveTimer = async (req: Request, res: Response) => {
    const { user_id, timer } = req.body;

    try {
        const user = await User.findByPk(user_id);
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé.' });
        }


        const newTimer = await Top.create({
            user_id: user.get('id'),
            timer: timer
        });

        if (!newTimer) {
            return res.status(500).json({ message: 'Erreur lors de la sauvegarde du timer.' });
        }

        const newTop = await getTop(req, res);

        return res.json({message: 'Timer sauvegardé', top: newTop});
    } catch (error) {
        console.error('Erreur lors de la sauvegarde du timer:', error);
        return res.status(500).json({ message: 'Erreur lors de la sauvegarde du timer.' });
    }
}
