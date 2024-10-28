import { Request, Response } from "express";
import SelectedItem from "../model/SelectedItem";
import Inventory from "../model/Inventory";
import Objects from "../model/Objects";

export const getSelectedItem = async (req: Request, res: Response) => {
    try {
        const { user_id } = req.params;

        const selectedItem = await SelectedItem.findOne({
            where: { user_id },
            include: [{
                model: Inventory,
                include: [
                    { model: Objects, attributes: ['id', 'name', 'image'] },
                ]
            }]
        });

        if(!selectedItem) {
            return null;
        }

        return res.status(200).json({selectedItem})

    } catch (error) {
        return res.status(500).json({error: error})
    }
}

export const saveSelectedItem = async (req: Request, res: Response) => {
    try {
        const { user_id, object_id } = req.body;

        const object = await Objects.findByPk(object_id);

        if (!object) {
            return res.status(404).json({ message: "Objet non trouvé" });
        }

        const inventory = await Inventory.findOne({ where: { user_id, object_id } });

        if (!inventory) {
            return res.status(400).json({ message: "Vous ne possédez pas cet objet" });
        }

        let selectedItem = await SelectedItem.findOne({ where: { user_id } });

        if (selectedItem) {
            selectedItem.inventory_id = inventory.id;
            await selectedItem.save();
            return res.status(200).json({ message: 'Pièce sélectionnée mise à jour avec succès.', selectedItem });
        } else {
            selectedItem = await SelectedItem.create({
                user_id,
                inventory_id: inventory.id
            });
            return res.status(201).json({ message: 'Pièce sélectionnée avec succès.', selectedItem });
        }

    } catch (error) {
        return res.status(500).json({ error: error });
    }
}

export const useSelectedItem = async (req: Request, res: Response) => {

    try {
        const { user_id } = req.params;

        const selectedItem = await SelectedItem.findOne({ where: { user_id } });

        const inventory = await Inventory.findOne({ where: { id: selectedItem?.get('inventory_id') } });

        if(!inventory) {
            return res.status(404).json({ error: "Pièce non trouvée ou utilisateur non autorisé." });
        }

        await Inventory.destroy({where: {id: inventory?.get('id')}});

        return res.status(200).json({ message: "Pièce utilisée et retirée avec succès." });

    } catch (error) {
        return res.status(500).json({ error: error });
    }

}

