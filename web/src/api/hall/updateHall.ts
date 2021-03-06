import { Hall } from "../../models";
import store from "../../store";
import { user } from "../../store/user";

export const updateHall = (hall: Hall): Promise<Hall | undefined> => {
    const state = store.getState()
    return fetch(`http://localhost:8000/api/halls/${hall.id}`, {
        method: "put",
        headers: {
            Authorization: user.selectors.token(state) ? `Bearer ${user.selectors.token(state)}` : "",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(hall)
    }).then((response) => {
        if (!response.ok) {
            console.log(response.text(), response.status)
            return
        }
        return response.json();
    })
}