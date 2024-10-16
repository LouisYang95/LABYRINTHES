import sequelize from "../config/database";

import User from "./User";
import Objects from "./Objects";
import Marketplace from "./Marketplace";
import Inventory from "./Inventory";
import LabyrinthVersion from "./LabyrinthVersion";
import Top from "./Top";
import Mark from "./Mark";
import MarkPosition from "./MarkPosition";
import MarkInteraction from "./MarkInteraction";
import Traps from "./Traps";

export default function syncModels(): Promise<void> {
    sequelize.sync({ alter: true });
    User.sync();
    Objects.sync();
    Marketplace.sync();
    Inventory.sync();
    LabyrinthVersion.sync();
    Top.sync();
    Traps.sync();
    Mark.sync();
    MarkInteraction.sync();
    MarkPosition.sync();
    return Promise.resolve();
}
