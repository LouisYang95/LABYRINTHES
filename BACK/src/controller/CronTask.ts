import LabyrinthVersion from "../model/LabyrinthVersion";
import cron from "node-cron";

const scheduleDailySeed = () => {
    console.log("Cron job is scheduled");

    // Planification toutes les 5 minutes
    cron.schedule("*/5 * * * *", async () => {
        try {
            console.log("Cron task started");  // Vérifier si la tâche est exécutée
            let newSeed;
            let seedExist = true;

            // Générer un seed unique
            while (seedExist) {
                newSeed = Math.floor(Math.random() * 1000000);
                const existingSeed = await LabyrinthVersion.findOne({ where: { seed: newSeed } });

                if (!existingSeed) {
                    seedExist = false;
                }
            }

            // Désactiver l'ancien labyrinthe
            const updateResult = await LabyrinthVersion.update(
                { is_active: false },
                { where: { is_active: true } }
            );

            if (updateResult[0] === 0) {
                console.error("Aucune version active trouvée.");
                return; // Pas de versions actives trouvées
            }

            // Créer une nouvelle version du labyrinthe avec le nouveau seed
            const newVersion = await LabyrinthVersion.create({
                seed: newSeed,
                is_active: true,
            });

            // Log du succès et renvoi d'une réponse
            console.log("New seed added successfully:", newSeed);
            return { status: 201, message: "New seed added successfully", seed: newSeed };

        } catch (error) {
            // Log des erreurs et réponse en cas d'échec
            console.error("Error adding new seed:", error);
            return { status: 500, message: "Error adding new seed", error };
        }
    });
}

export default scheduleDailySeed;
