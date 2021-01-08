import { connect } from "react-redux";
import { State } from "../store";
import { router } from "../store/router";
import { user } from "../store/user";

const mapStateToProps = (state: State) => ({
  user: user.selectors.user(state),
  location: router.selectors.getCurrentLocation(state)
});

const mapDispatchToProps = {
  addUser: user.actions.addUser,
  gotoLogin: router.goto.login,
  gotoProfileUpdate: router.goto.updateProfile,
  gotoHome: router.goto.home,
  gotoAdminActions: router.goto.adminActions,
  gotoOldShows: router.goto.oldShows,
};

export default connect(mapStateToProps, mapDispatchToProps);
