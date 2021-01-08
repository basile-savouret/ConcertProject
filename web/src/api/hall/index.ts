import { addHall } from "./addHall";
import { getAllHalls } from "./getAllHalls";
import { getHall } from "./getHall";
import { updateHall } from "./updateHall";


export const hallClient = {
    getAllHalls: getAllHalls,
    getHall: getHall,
    updateHall: updateHall,
    addHall: addHall
}