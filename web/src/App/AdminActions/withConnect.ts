import { connect } from "react-redux";
import { State } from "../../store";
import { router } from "../../store/router";
import { user } from "../../store/user";

const mapStateToProps = (state: State) => ({
    user: user.selectors.user(state)
});

const mapDispatchToProps = {
    gotoAddShow: router.goto.addShow,
    gotoAddMember: router.goto.addMember,
    gotoMemberEdit: router.goto.memberEdit,
    gotoAddHall: router.goto.addHall,
    gotoHallEdit: router.goto.hallEdit,
    gotoAddBand: router.goto.addBand,
    gotoBandEdit: router.goto.bandEdit,
};

export default connect(mapStateToProps, mapDispatchToProps);
