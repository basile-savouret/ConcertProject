import { loginResponse } from "../../models";
import store from "../../store";
import { user } from "../../store/user";

export const register = (email: string, password: string, name: string, role: string): Promise<loginResponse | undefined> => {
    const state = store.getState()
    return fetch(`http://localhost:8000/api/register`, {
        method: "post",
        headers: {
            Authorization: user.selectors.token(state) ? `Bearer ${user.selectors.token(state)}` : "",
        },
        body: JSON.stringify({ email: email, password: password, name: name, roles: [role] })
    }).then((response) => {
        if (!response.ok) {
            console.log(response.text(), response.status)
            return
        }
        return response.json();
    })
}