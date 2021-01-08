import { connect } from "react-redux";
import { State } from "../../../store";
import { router } from "../../../store/router";

const mapStateToProps = (state: State) => ({});

const mapDispatchToProps = {
    gotoAdminActions: router.goto.adminActions
};

export default connect(mapStateToProps, mapDispatchToProps);
