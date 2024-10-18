import { Request, Response } from 'express';
import Mark from "../model/Mark";
import User from "../model/User";
import LabyrinthVersion from "../model/LabyrinthVersion";
import MarkPosition from "../model/MarkPosition";

export const getMarksByLabyrinthId = async (req: Request, res: Response) => {
    const { labyrinth_version_id } = req.params;

    try {
        const marks = await Mark.findAll({
            where: {
                labyrinth_version_id: labyrinth_version_id
            }
        });

        if (!marks.length) {
            return res.status(404).json({ message: 'Aucune marque trouvée pour ce labyrinthe.' });
        }

        return res.json(marks);
    } catch (error) {
        console.error('Erreur lors de la récupération des marques:', error);
        return res.status(500).json({ message: 'Erreur lors de la récupération des marques.' });
    }
}

export const createMark = async (req: Request, res: Response) => {
    const { user_id, labyrinth_version_id, text, position_x, position_y, position_z } = req.body;

    try{
        const user = await User.findByPk(user_id);
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé.' });
        }

        const labyrinthVersion = await LabyrinthVersion.findByPk(labyrinth_version_id);
        if (!labyrinthVersion) {
            return res.status(404).json({ message: 'Version de labyrinthe non trouvée.' });
        }

        const newMark = await Mark.create({
            user_id,
            labyrinth_version_id,
            text
        })

        const markPosition = await MarkPosition.create({
            mark_id: newMark.get("id"),
            labyrinth_version_id: labyrinthVersion.get("id"),
            x: position_x,
            y: position_y,
            z: position_z
        })

        const findMark = await Mark.findByPk(newMark.get("id"), {
            include: [MarkPosition]
        });

        if (!findMark) {
            return res.status(404).json({ message: 'Marque non trouvée.' });
        }


        return res.status(201).json({ message: "Mark created",mark: findMark});
    }catch(error){
        console.log(error)
        return res.status(500).json({ message: "Error creating mark" });
    }
}
