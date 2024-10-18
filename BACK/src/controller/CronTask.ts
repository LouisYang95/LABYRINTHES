import LabyrinthVersion from "../model/LabyrinthVersion";

import cron from "node-cron";

const scheduleDailySeed = () => {
    console.log("Cron job is scheduled");

    cron.schedule("0 0 * * *", async () => {
        try {
            console.log("Cron task started");
            let newSeed;
            let seedExist = true;

            while (seedExist) {
                newSeed = Math.floor(Math.random() * 1000000);
                const existingSeed = await LabyrinthVersion.findOne({ where: { seed: newSeed } });

                if (!existingSeed) {
                    seedExist = false;
                }
            }

            const updateResult = await LabyrinthVersion.update(
                { is_active: false },
                { where: { is_active: true } }
            );

            if (updateResult[0] === 0) {
                console.error("Aucune version active trouvée.");
            }

            const newVersion = await LabyrinthVersion.create({
                seed: newSeed,
                is_active: true,
            });

            console.log("New seed added successfully:", newSeed, newVersion);
            return { status: 201, message: "New seed added successfully", seed: newSeed };

        } catch (error) {
            console.error("Error adding new seed:", error);
            return { status: 500, message: "Error adding new seed", error };
        }
    });
}

export default scheduleDailySeed;
