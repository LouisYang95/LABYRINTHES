import { Request, Response } from 'express';
import sequelize from '../config/database';
import Objects from "../model/Objects";
import Marketplace from "../model/Marketplace";
import User from "../model/User";
import Inventory from "../model/Inventory";
import LabyrinthVersion from "../model/LabyrinthVersion";

interface CustomRequest extends Request {
    user?: { username: string };
}

export const getAllObjects = async (req: Request, res: Response) => {
    try {
        const objects = await Objects.findAll();
        res.status(200).json(objects);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Error getting objects' });
    }
};

export const getObjectById = async (req: Request, res: Response) => {
    try {
        const object = await Objects.findByPk(req.params.id);

        if (!object) {
            return res.status(404).json({ message: "No object found with this id" });
        }

        res.status(200).json(object);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Error during getting object by Id' });
    }
};

export const buyObject = async (req: CustomRequest, res: Response) => {
    const { user_id, object_id } = req.params;

    try {
        await sequelize.transaction(async (transaction: any) => {
            const user = await User.findByPk(user_id, { transaction });
            const object = await Objects.findByPk(object_id, { transaction });

            if (!user) {
                return res.status(404).json({ message: "No user found with this id" });
            }

            if (!object) {
                return res.status(404).json({ message: "No object found with this id" });
            }

            const shopPrice = await Objects.findOne({
                where: { id: object_id },
                transaction
            });

            const objectPrice = shopPrice!.get('price') as number;
            const objectType = object.get('type');

            if (objectType === 'good') {
                if (user.good_points < objectPrice) {
                    return res.status(400).json({ message: "Pas assez de bons points pour acheter cet objet" });
                }
                user.good_points -= objectPrice;
            } else if (objectType === 'bad') {
                if (user.bad_points < objectPrice) {
                    return res.status(400).json({ message: "Pas assez de mauvais points pour acheter cet objet" });
                }
                user.bad_points -= objectPrice;
            } else {
                return res.status(400).json({ message: 'Type d\'objet invalide' });
            }

            await user.save({ transaction });

            const activeLabyrinthVersionId = await LabyrinthVersion.findOne({
                where: { is_active: true },
                transaction
            });

            if (!activeLabyrinthVersionId) {
                return res.status(404).json({ message: 'No active labyrinth version found' });
            }

            await Marketplace.create({
                user_id: user.id,
                object_id: object.id,
                price: objectPrice,
            }, { transaction });

            await Inventory.create({
                user_id: user_id,
                object_id: object_id,
                labyrinth_version_id: activeLabyrinthVersionId.get("id"),
            }, { transaction });

            res.status(200).json({ user, object, message: 'Objet acheté avec succès' });
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Erreur lors de l\'achat de l\'objet' });
    }
};
