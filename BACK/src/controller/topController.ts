import {Request, Response} from "express";
import Top from "../model/Top";
import User from "../model/User";

export const fetchGeneralTop = async () => {
    return await Top.findAll({
        order: [['timer', 'ASC']],
        limit: 10,
        include: [{ model: User, attributes: ['username'] }]
    });
};

export const fetchTopByGoodPoints = async () => {
    return await User.findAll({
        order: [['good_points', 'DESC']],
        limit: 10,
        attributes: ['username', 'good_points']
    });
};

export const fetchTopByBadPoints = async () => {
    return await User.findAll({
        order: [['bad_points', 'DESC']],
        limit: 10,
        attributes: ['username', 'bad_points']
    });
};

export const getTop = async (req: Request, res: Response) => {
    try {
        const top = await fetchGeneralTop();
        res.json(top);
    } catch (error) {
        console.error("Erreur lors de la récupération du top:", error);
        res.status(500).json({ message: 'Erreur lors de la récupération du top.' });
    }
};

export const getTopByGoodPoints = async (req: Request, res: Response) => {
    try {
        const top = await fetchTopByGoodPoints();
        await res.json(top);
    } catch (error) {
        console.error("Erreur lors de la récupération du top par Good Points:", error);
        res.status(500).json({ message: 'Erreur lors de la récupération du top par Good Points.' });
    }
};

export const getTopByBadPoints = async (req: Request, res: Response) => {
    try {
        const top = await fetchTopByBadPoints();
        res.json(top);
    } catch (error) {
        console.error("Erreur lors de la récupération du top par Bad Points:", error);
        res.status(500).json({ message: 'Erreur lors de la récupération du top par Bad Points.' });
    }
};
