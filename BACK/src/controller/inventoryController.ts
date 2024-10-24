import { Request, Response } from "express";
import Inventory from "../model/Inventory";
import Objects from "../model/Objects";

export const getInventory = async (req: Request, res: Response) => {
    console.log(req.params);
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

export const useObject = async (req: Request, res: Response) => {
    try {
        const { user_id, inventory_id } = req.params;

        const inventory = await Inventory.findOne({ where: { user_id, id: inventory_id } })

        if (!inventory) {
            return res.status(404).json({ error: "Inventory item not found or user not authorized." });
        }

        await Inventory.destroy({ where: { user_id, id: inventory_id } });

        return res.status(200).json({ message: "Inventory item used and removed successfully.", inventory });

    } catch (error) {
        return res.status(500).json({error: error});
    }
}
