import { connect } from "react-redux";
import { State } from "../../store";
import { user } from "../../store/user";

const mapStateToProps = (state: State) => ({
    user: user.selectors.user(state)
});

const mapDispatchToProps = {
    addUser: user.actions.addUser
};

export default connect(mapStateToProps, mapDispatchToProps);
