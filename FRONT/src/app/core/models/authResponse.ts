import { labyrinthVersion } from "./labyrinthVersion"
import { user } from "./user"

export interface authResponse {
    message: string,
    user: user,
    labyrinth_version: labyrinthVersion
}