import LabyrinthVersion from "../model/LabyrinthVersion";

var cron = require("node-cron")

const scheduleDailySeed = () => {
    cron.schedule("*/5 * * * *", async () => {
        try {

            let newSeed;
            let seedExist = true

            while (seedExist) {
                newSeed = Math.floor(Math.random() * 1000000)
                const existingSeed = await LabyrinthVersion.findOne({ where: {seed: newSeed} })

                if (!existingSeed) {
                    seedExist = false;
                }
            }

            await LabyrinthVersion.update(
                { is_active: false },
                { where: { is_active: true } }
            );

            await LabyrinthVersion.create({
                seed: newSeed,
                is_active: true,
            });

            console.log("New seed added successfully:", newSeed);
        } catch (error) {
            console.error("Error new seed :", error);
        }
    })
}

export default scheduleDailySeed