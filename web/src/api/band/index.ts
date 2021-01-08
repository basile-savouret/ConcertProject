import { addBand } from "./addBand";
import { getAllBands } from "./getAllBands";
import { getBand } from "./getBand";
import { updateBand } from "./updateBand";


export const bandClient = {
    getAllBands: getAllBands,
    getBand: getBand,
    updateBand: updateBand,
    addBand: addBand
}