import {login} from "./login"
import { register } from "./register"
import { update } from "./update"

export const userClient = {
    login: login,
    register: register,
    update: update
}