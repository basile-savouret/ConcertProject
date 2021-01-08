import { connect } from "react-redux";
import { State } from "../../../store";
import { router } from "../../../store/router";
import { user } from "../../../store/user";

const mapStateToProps = (state: State) => ({
    user: user.selectors.user(state)
});

const mapDispatchToProps = {
    gotoShowView: router.goto.showView,
    gotoShowEdit: router.goto.showEdit
};

export default connect(mapStateToProps, mapDispatchToProps);
