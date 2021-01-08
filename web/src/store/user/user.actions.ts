import { createActionCreator } from "deox";
import { User } from "../../models";

const addUser = createActionCreator(
  "USER_FETCH",
  (resolve) => (user?: User, token?: string) => resolve({ user: user, token: token })
);


export const actions = {
  addUser: addUser,
};
