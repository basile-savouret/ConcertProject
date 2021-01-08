import { Show } from "../../models";
import store from "../../store";
import { user } from "../../store/user";

export const updateShow = (show: Show): Promise<Show | undefined> => {
    const state = store.getState()
    return fetch(`http://localhost:8000/api/shows/${show.id}`, {
        method: "put",
        headers: {
            Authorization: user.selectors.token(state) ? `Bearer ${user.selectors.token(state)}` : "",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({...show, date: `${show.date}`})
    }).then((response) => {
        if (!response.ok) {
            console.log(response.text(), response.status)
            return
        }
        return response.json();
    })
}