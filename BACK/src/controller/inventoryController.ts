import { Request, Response } from "express";
import Inventory from "../model/Inventory";
import Objects from "../model/Objects";

export const getInventory = async (req: Request, res: Response) => {
    try {
        const { user_id } = req.params;

        const inventory = await Inventory.findAll({
            where: { user_id },
            include: [
                { model: Objects, attributes: ['name', 'description'], },
            ]
        });

        return res.status(200).json({inventory})

    } catch (error) {
        return res.status(500).json({error: error})
    }
}