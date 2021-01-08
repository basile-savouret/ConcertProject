import { addShow } from "./addShow";
import { getAllPassedShows } from "./getAllPassedShows";
import { getAllShows } from "./getAllShows";
import { getShow } from "./getShow";
import { updateShow } from "./udateShow";

export const showClient = {
    getAllShows: getAllShows,
    getShow: getShow,
    updateShow: updateShow,
    addShow: addShow,
    getAllPassedShows: getAllPassedShows
}