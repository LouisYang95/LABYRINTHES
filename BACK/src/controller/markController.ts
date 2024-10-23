import { Request, Response } from 'express';
import Mark from "../model/Mark";
import User from "../model/User";
import LabyrinthVersion from "../model/LabyrinthVersion";
import MarkPosition from "../model/MarkPosition";
import markInteraction from "../model/MarkInteraction";
import LabyrinthLevel from "../model/LabyrinthLevel";

export const getMarksByLabyrinthId = async (req: Request, res: Response) => {
    const { labyrinth_version_id, labyrinth_level_id } = req.params;

    try {
        const marks = await Mark.findAll({
            where: {
                labyrinth_version_id: labyrinth_version_id,
                labyrinth_level_id: labyrinth_level_id
            },
            include: [
                {
                    model: MarkPosition
                },
                {
                    model: markInteraction
                },
                {
                    model: User
                }
                ]
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
    const { user_id, labyrinth_version_id, labyrinth_level, text, position_x, position_y, position_z } = req.body;

    try {
        const user = await User.findByPk(user_id);
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé.' });
        }

        const labyrinthVersion = await LabyrinthVersion.findByPk(labyrinth_version_id);
        if (!labyrinthVersion) {
            return res.status(404).json({ message: 'Version de labyrinthe non trouvée.' });
        }

        const labyrinthLevel = await LabyrinthLevel.findOne({
            where: {
                labyrinth_version_id: labyrinth_version_id,
                level_number: labyrinth_level
            }
        });

        if(!labyrinthLevel){
            return res.status(404).json({ message: 'Niveau de labyrinthe non trouvé.' });
        }

        const sameTextMark = await Mark.findOne({
            where: {
                text: text,
                labyrinth_version_id: labyrinth_version_id,
                user_id: user_id,
                labyrinth_level_id: labyrinthLevel.id
            }
        });

        if(sameTextMark) {
            return res.status(400).json({ message: 'Vous avez déjà créé une marque avec ce texte.' });
        }

        if(!text) {
            return res.status(400).json({ message: 'Veuillez renseigner un texte.' });
        }

        if (position_x === null || position_x === undefined ||
            position_y === null || position_y === undefined ||
            position_z === null || position_z === undefined) {
            return res.status(400).json({ message: 'Veuillez renseigner les coordonnées.' });
        }

        const newMark = await Mark.create({
            user_id,
            labyrinth_version_id,
            labyrinth_level_id: labyrinthLevel.id,
            text
        });

        console.log('newMark', newMark.get("id"), newMark.get("user_id"), newMark.get("labyrinth_version_id"), newMark.get("text"), position_x, position_y, position_z);

        const markPosition = await MarkPosition.create({
            mark_id: newMark.get("id"),
            labyrinth_version_id: newMark.get("labyrinth_version_id"),
            labyrinth_level_id: newMark.get("labyrinth_level_id"),
            position_x: position_x,
            position_y: position_y,
            position_z: position_z
        });

        if(!markPosition) {
            return res.status(404).json({ message: 'Position de marque mal définie.' });
        }

        const findMark = await Mark.findByPk(newMark.get("id") as number, {
            include: [
                {
                    model: MarkPosition
                },
                {
                    model: markInteraction
                },
                {
                    model: User
                }
            ]
        });

        if (!findMark) {
            return res.status(404).json({ message: 'Marque non trouvée.' });
        }

        return res.status(201).json({ message: "Mark a été créé", mark: findMark });

    } catch (error) {
        console.error('Erreur lors de la création de la marque:', error);
        return res.status(500).json({ message: "Erreur lors de la création de la marque." });
    }
};

export const newInteractionForMark = async (req: Request, res: Response) => {
    const { mark_id, user_id, interaction } = req.body;

    try {
        const mark = await Mark.findByPk(mark_id);
        if (!mark) {
            return res.status(404).json({ message: 'Marque non trouvée.' });
        }

        const user = await User.findByPk(user_id);
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé.' });
        }

        if(!interaction || (interaction !== 'like' && interaction !== 'dislike')) {
            return res.status(400).json({ message: 'Veuillez renseigner une interaction valide.' });
        }

        const newInteraction = await markInteraction.create({
            mark_id,
            user_id,
            interaction
        });

        if (!newInteraction) {
            return res.status(500).json({ message: 'Erreur lors de la création de l\'interaction.' });
        }

        return res.status(201).json({ message: "Interaction created", interaction: newInteraction });

    } catch (error) {
        console.error('Erreur lors de la création de l\'interaction:', error);
        return res.status(500).json({ message: "Erreur lors de la création de l\'interaction." });
    }
}
