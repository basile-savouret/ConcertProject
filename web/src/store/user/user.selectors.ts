import { State } from "../index";
import { createSelector } from "reselect";

const getUserState = (state: State) => state.user;

export const getUser = createSelector([getUserState], (state) => state.user);

export const getToken= createSelector([getUserState], (state) => state.token);

export const selectors = {
  user: getUser,
  token: getToken
};
