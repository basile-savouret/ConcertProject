import { Band } from "../../models";
import store from "../../store";
import { user } from "../../store/user";

export const getBand = (bandId: number): Promise<Band | undefined> => {
    const state = store.getState()
    return fetch(`http://localhost:8000/api/bands/${bandId}`, {
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