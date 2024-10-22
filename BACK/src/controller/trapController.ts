import {Request, Response} from 'express';
import Traps from "../model/Traps";

export const createTrap = async (req: Request, res: Response) => {
    try{

        const {object_id, labyrinth_version_id, position_x, position_y, position_z} = req.body;

        if(!object_id || !labyrinth_version_id || !position_x || !position_y || !position_z){
            return res.status(400).json({ message: "Missing parameters" });
        }

        const existingTrap = await Traps.findOne({ where: { object_id, labyrinth_version_id, position_x, position_y, position_z } });

        if(existingTrap){
            return res.status(400).json({ message: "Trap already exists." });
        }

        const newTrap = await Traps.create({
            object_id,
            labyrinth_version_id,
            position_x,
            position_y,
            position_z
        });

        const trap = await Traps.findByPk(newTrap.get("id") as number);

        return res.status(201).json({message: "Trap created successfully", trap: trap});

    }catch(e){
        console.error("Error creating trap:", e);
        return res.status(500).json({ message: "Error creating trap" });
    }
}

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
        const {labyrinth_version_id} = req.params;

        if(!labyrinth_version_id){
            return res.status(400).json({ message: "Missing parameters" });
        }

        const traps = await Traps.findAll({ where: { labyrinth_version_id } });

        return res.status(200).json(traps);
    }catch (e){
        console.error("Error getting traps:", e);
        return res.status(500).json({ message: "Error getting traps" });
    }
}
