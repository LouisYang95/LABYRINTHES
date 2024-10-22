import {Request, Response} from 'express';
import LabyrinthVersion from "../model/LabyrinthVersion";

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
