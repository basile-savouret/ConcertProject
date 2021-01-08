import { createReducer } from "deox";
import { decode } from "jsonwebtoken";
import { User } from "../../models";
import { actions } from "./user.actions";

export interface UserState {
  user?: User,
  token?: string
}

export const initialState = (): UserState => {
  const token = localStorage.getItem('jwt')
  const user = token ? decode(token) as User : undefined
  if (user && user.exp * 1000 < Date.now()) {
    return {
      user: undefined,
      token: undefined
    }
  }
  return {
    user: user,
    token: token ?? undefined
  }
};

export type UserStateTransformer = (state: UserState) => UserState;

const setUser = (user?: User, token?: string): UserStateTransformer => {
  localStorage.setItem('jwt', token ?? "");
  return (state: UserState) => ({ user: user, token: token })
};

export const userReducer = createReducer(initialState(), (handleAction) => [
  handleAction(actions.addUser, (state: UserState, action) =>
    setUser(action.payload.user, action.payload.token)(state)
  ),
]);
