import {Request, Response} from 'express';
import LabyrinthVersion from "../model/LabyrinthVersion";
import LabyrinthLevel from "../model/LabyrinthLevel";

export const getSeedLabyrinthVersion = async (req: Request, res: Response) => {
    try {
        const activeLabyrinthVersion = await LabyrinthVersion.findOne({
            where: {
                is_active: true,
            },
        });

        if (!activeLabyrinthVersion) {
            return res.status(500).json({message: "No active labyrinth version found."});
        }

        return res.status(200).json(activeLabyrinthVersion);
    }catch (e){
        console.error("Error getting seed labyrinth version:", e);
        return res.status(500).json({message: "Error getting seed labyrinth version"});
    }
};

export const getAllActualLabyrinthLevel = async (req: Request, res: Response) => {
    try {
        const getActualLabyrinthVersion = await LabyrinthVersion.findOne({
            where: {
                is_active: true,
            },
        });

        if (!getActualLabyrinthVersion) {
            return res.status(404).json({message: "No labyrinth found."});
    }

        const labyrinthLevel = LabyrinthLevel.findAll({where: {labyrinth_version_id: getActualLabyrinthVersion.get("id")}});

        if(!labyrinthLevel){
            return res.status(404).json({message: "No labyrinth level found."});
        }

        return res.status(200).json(labyrinthLevel);
}catch (e) {
        console.error("Error getting actual labyrinth level:", e);
        return res.status(500).json({message: "Error getting actual labyrinth level"});
    }
}
