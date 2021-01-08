import { PaginatedList, Show } from "../../models";
import store from "../../store";
import { user } from "../../store/user";

export const getAllShows = (page: number, size: number, bandId?: number): Promise<PaginatedList<Show> | undefined> => {
    const state = store.getState()
    return fetch(`http://localhost:8000/api/shows/next?page=${page}&size=${size}&bandId=${bandId ?? ""}`, {
        method: "get",
        headers: {
            Authorization: user.selectors.token(state) ? `Bearer ${user.selectors.token(state)}` : "",
            "Content-Type": "application/json",
        },
    }).then((response) => {
        if (!response.ok) {
            console.log(response.text(), response.status)
            return
        }
        return response.json();
    })
}