import {Request, Response} from 'express';
import Traps from "../model/Traps";
import LabyrinthLevel from "../model/LabyrinthLevel";
import Objects from "../model/Objects";
import User from "../model/User";
import labyrinthLevel from "../model/LabyrinthLevel";

export const createTrap = async (req: Request, res: Response) => {
    try {
        const { object_id, labyrinth_version_id, labyrinth_level, position_x, position_y, position_z } = req.body;

        if (!object_id || !labyrinth_version_id || !labyrinth_level || !position_x || !position_y || !position_z) {
            return res.status(400).json({ message: "Missing parameters" });
        }

        const labyrinthLevel = await LabyrinthLevel.findOne({
            where: {
                labyrinth_version_id: labyrinth_version_id,
                level_number: labyrinth_level
            }
        });

        if (!labyrinthLevel) {
            return res.status(404).json({ message: "Labyrinth level not found" });
        }

        const existingTrap = await Traps.findOne({
            where: {
                object_id,
                labyrinth_version_id,
                labyrinth_level_id: labyrinthLevel.id,
                position_x,
                position_y,
                position_z
            }
        });

        if (existingTrap) {
            return res.status(400).json({ message: "Trap already exists." });
        }

        const object = await Objects.findByPk(object_id);

        if(object && object.type !== "trap"){
            return res.status(400).json({ message: "Object is not a trap." });
        }

        const newTrap = await Traps.create({
            object_id,
            labyrinth_version_id,
            labyrinth_level_id: labyrinthLevel.id,
            position_x,
            position_y,
            position_z
        });

        if(!newTrap){
            return res.status(500).json({ message: "Error creating trap" });
        }

        const trap = await Traps.findByPk(newTrap.id);

        return res.status(201).json({ message: "Trap created successfully", trap: trap });

    } catch (e) {
        console.error("Error creating trap:", e);
        return res.status(500).json({ message: "Error creating trap" });
    }
};

export const deleteTrap = async (req: Request, res: Response) => {
    try{
        const {id} = req.params;

        if(!id){
            return res.status(400).json({ message: "Missing parameters" });
        }

        const trap = await Traps.findByPk(id);

        if(!trap){
            return res.status(404).json({ message: "Trap not found" });
        }

        await Traps.destroy({ where: { id } });

        return res.status(200).json({ message: "Trap deleted successfully" });

    }catch(e){
        console.error("Error deleting trap:", e);
        return res.status(500).json({ message: "Error deleting trap" });
    }
}

export const getAllTrapsForLabyrinth = async (req: Request, res: Response) => {
    try{
        const {labyrinth_version_id, labyrinth_level} = req.params;

        if(!labyrinth_version_id || !labyrinth_level){
            return res.status(400).json({ message: "Missing parameters" });
        }

        const labyrinth_level_info = await LabyrinthLevel.findOne({ where: {labyrinth_version_id, level_number: labyrinth_level } });

        if(!labyrinth_level_info){
            return res.status(404).json({ message: "Labyrinth level not found" });
        }

        const traps = await Traps.findAll(
            {
                where: { labyrinth_version_id, labyrinth_level_id: labyrinth_level_info.id },
                include:[{
                    model: Objects,
                },{
                    model: User,
                    attributes: { exclude: ['password'] }
                }]
        });

        return res.status(200).json(traps);
    }catch (e){
        console.error("Error getting traps:", e);
        return res.status(500).json({ message: "Error getting traps" });
    }
}
