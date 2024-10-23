import {Request, Response} from "express";
import Top from "../model/Top";
import User from "../model/User";

export const getTop = async (req: Request, res: Response) => {
    try {
        const top = await Top.findAll({
            order: [
                ['timer', 'ASC']
            ],
            limit: 10,
            include: [
                {
                    model: User,
                    attributes: ['username']
                }
            ]
        });

        return res.json(top);
    } catch (error) {
        console.error('Erreur lors de la récupération du top:', error);
        return res.status(500).json({ message: 'Erreur lors de la récupération du top.' });
    }
}

export const getTopByGoodPoints = async (req: Request, res: Response) => {
    try {
        const top = await User.findAll({
            order: [
                ['good_points', 'DESC']
            ],
            limit: 10,
            attributes: ['username', 'good_points']
        });

        return res.json(top);
    } catch (error) {
        console.error('Erreur lors de la récupération du top:', error);
        return res.status(500).json({ message: 'Erreur lors de la récupération du top.' });
    }
}

export const getTopByBadPoints = async (req: Request, res: Response) => {
    try {
        const top = await User.findAll({
            order: [
                ['bad_points', 'DESC']
            ],
            limit: 10,
            attributes: ['username', 'bad_points']
        });

        return res.json(top);
    } catch (error) {
        console.error('Erreur lors de la récupération du top:', error);
        return res.status(500).json({ message: 'Erreur lors de la récupération du top.' });
    }
}
