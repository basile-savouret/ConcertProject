import { push } from "connected-react-router";

const login = () => push(`/login`);

const home = () => push(`/`);

const oldShows = () => push(`/oldShows`);

const updateProfile = () => push(`/profile/update`);

const showView = (showId: number) => push(`/shows/${showId}/view`);

const showEdit = (showId: number) => push(`/shows/${showId}/edit`);

const addShow = () => push(`/shows/add`);

const memberEdit = (memberId: number) => push(`/members/${memberId}/edit`);

const addMember = () => push(`/members/add`);

const hallEdit = (hallId: number) => push(`/halls/${hallId}/edit`);

const addHall = () => push(`/halls/add`);

const bandEdit = (bandId: number) => push(`/bands/${bandId}/edit`);

const addBand = () => push(`/bands/add`);

const adminActions = () => push(`/admin/actions`);

const pushUrl = (url: string) => push(url);

export const goto = {
  push: pushUrl,
  login: login,
  showView: showView,
  showEdit: showEdit,
  addShow: addShow,
  updateProfile: updateProfile,
  adminActions: adminActions,
  home: home,
  memberEdit: memberEdit,
  addMember: addMember,
  hallEdit: hallEdit,
  addHall: addHall,
  bandEdit: bandEdit,
  addBand: addBand,
  oldShows: oldShows
};
