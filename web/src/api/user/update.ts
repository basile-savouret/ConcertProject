import { loginResponse } from "../../models";
import store from "../../store";
import { user } from "../../store/user";

export const update = (name: string, role: string): Promise<loginResponse | undefined> => {
    const state = store.getState()
    return fetch(`http://localhost:8000/api/user`, {
        method: "PUT",
        headers: {
            Authorization: user.selectors.token(state) ? `Bearer ${user.selectors.token(state)}` : "",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: name, roles: [role] })
    }).then((response) => {
        if (!response.ok) {
            console.log(response.text(), response.status)
            return
        }
        return response.json();
    })
}