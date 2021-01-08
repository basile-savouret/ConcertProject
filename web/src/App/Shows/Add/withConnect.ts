import { connect } from "react-redux";
import { State } from "../../../store";
import { router } from "../../../store/router";

const mapStateToProps = (state: State) => ({});

const mapDispatchToProps = {
    gotoShowView: router.goto.showView
};

export default connect(mapStateToProps, mapDispatchToProps);
