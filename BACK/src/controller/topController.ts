import {Request, Response} from "express";
import Top from "../model/Top";
import User from "../model/User";

export const fetchTop = async () => {
    try {
        const top = await Top.findAll({
            order: [['timer', 'ASC']],
            limit: 10,
            include: [{ model: User, attributes: ['username'] }]
        });

        return top.map((entry) => ({
            id: entry.id,
            timer: entry.timer,
            User: {
                username: entry.User.username
            }
        }));
    } catch (error) {
        console.error("Erreur lors de la récupération du top:", error);
        throw error;
    }
};
export const getTop = async () => {
    try {
        const top = await Top.findAll({
            order: [['timer', 'ASC']],
            limit: 10,
            include: [{ model: User, attributes: ['username'] }]
        });
        return top;
    } catch (error) {
        console.error('Erreur lors de la récupération du top:', error);
        throw error;
    }
};

export const getTopByGoodPoints = async () => {
    try {
        const top = await User.findAll({
            order: [['good_points', 'DESC']],
            limit: 10,
            attributes: ['username', 'good_points']
        });
        return top;
    } catch (error) {
        console.error('Erreur lors de la récupération du top:', error);
        throw error;
    }
};

export const getTopByBadPoints = async () => {
    try {
        const top = await User.findAll({
            order: [['bad_points', 'DESC']],
            limit: 10,
            attributes: ['username', 'bad_points']
        });
        return top;
    } catch (error) {
        console.error('Erreur lors de la récupération du top:', error);
        throw error;
    }
};
