import {  Member } from "../../models";
import store from "../../store";
import { user } from "../../store/user";

export const updateMember = (member: Member): Promise<Member | undefined> => {
    const state = store.getState()
    return fetch(`http://localhost:8000/api/members/${member.id}`, {
        method: "put",
        headers: {
            Authorization: user.selectors.token(state) ? `Bearer ${user.selectors.token(state)}` : "",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(member)
    }).then((response) => {
        if (!response.ok) {
            console.log(response.text(), response.status)
            return
        }
        return response.json();
    })
}