import React, { useCallback, useEffect, useState } from "react";
import withConnect from "./withConnect";
import { Box, Button, makeStyles, Paper, FormControl, InputLabel, Select, MenuItem, Typography } from "@material-ui/core";
import { Band, Hall, Member, User } from "../../models";
import { hallClient } from "../../api/hall";
import { memberClient } from "../../api/member";
import { bandClient } from "../../api/band";

const useStyles = makeStyles(() => ({
  container: {
    padding: "20px",
    borderRadius: "6px",
    margin: "20px"
  },
  flexItems: {
    margin: "15px 10px"
  },
  button: {
    margin: "25px 10px"
  },
  link: {
    cursor: "pointer",
    color: "blue"
  }
}));

interface LoginHubProps {
  user?: User
  gotoAddShow: () => void
  gotoAddMember: () => void
  gotoMemberEdit: (memberId: number) => void,
  gotoAddHall: () => void,
  gotoHallEdit: (hallId: number) => void
  gotoAddBand: () => void,
  gotoBandEdit: (bandId: number) => void
}

const LoginHub = (props: LoginHubProps) => {
  const { user, gotoAddShow, gotoMemberEdit, gotoAddMember, gotoAddHall, gotoHallEdit, gotoAddBand, gotoBandEdit } = props;

  return (
    <Box display="flex" justifyContent="space-around" alignItems="center" flexWrap="wrap" height="100vh">
      {user?.roles.includes("ROLE_ADMIN_SHOW") && <AdminShows gotoHallEdit={gotoHallEdit} gotoAddHall={gotoAddHall} gotoAddShow={gotoAddShow} />}
      {user?.roles.includes("ROLE_ADMIN_MEMBER") && <AdminMembers gotoAddMember={gotoAddMember} gotoMemberEdit={gotoMemberEdit} />}
      {user?.roles.includes("ROLE_ADMIN_BAND") && <AdminBands gotoAddBand={gotoAddBand} gotoBandEdit={gotoBandEdit} />}
    </Box>
  );
};

interface AdminShowsProps {
  gotoAddShow: () => void
  gotoAddHall: () => void,
  gotoHallEdit: (hallId: number) => void
}

const AdminShows = (props: AdminShowsProps) => {
  const { gotoAddShow, gotoAddHall, gotoHallEdit } = props
  const classes = useStyles();
  const [halls, setHalls] = useState<Hall[]>([])
  const [selectedHall, setSelectedHall] = useState<Hall | undefined>(undefined)
  useEffect(() => {
    hallClient.getAllHalls().then((response) => {
      if (response) {
        setHalls(response)
      }
    })
  }, [])

  const updateHall = useCallback(
    (hallId: number) => {
      halls.forEach((hall) => {
        if (hall.id === hallId) {
          setSelectedHall(hall)
        }
      })
    },
    [halls],
  )

  return (
    <>
      <Paper className={classes.container} elevation={5}>
        <Box display="flex" flexDirection="column" alignItems="center">
          <Typography variant="h6">Concert</Typography>
          <Button onClick={gotoAddShow} variant="outlined" className={classes.button}>Ajouter un concert</Button>
        </Box>
      </Paper>
      <Paper className={classes.container} elevation={5}>
        <Box display="flex" flexDirection="column" alignItems="center">
          <Typography variant="h6">Salle</Typography>
          <Button onClick={gotoAddHall} variant="outlined" className={classes.button}>Ajouter une salle</Button>
          <FormControl className={classes.flexItems} style={{ width: "calc(100% - 20px)" }}>
            <InputLabel id="select-show-hall-label">Les Salles</InputLabel>
            <Select
              labelId="select-show-hall-label"
              id="select-show-hall"
              value={selectedHall ? selectedHall.id : undefined}
              onChange={(event) => updateHall(Number(event.target.value))}
            >
              {halls.map((hall) => (
                <MenuItem key={hall.id} value={hall.id}>{`${hall.name} à ${hall.city}`}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button onClick={() => selectedHall && gotoHallEdit(selectedHall.id)} disabled={selectedHall === undefined} variant="outlined" className={classes.button}>La modifier</Button>
        </Box>
      </Paper>
    </>
  );
};

interface AdminMembersProps {
  gotoAddMember: () => void
  gotoMemberEdit: (memberId: number) => void
}

const AdminMembers = (props: AdminMembersProps) => {
  const { gotoAddMember, gotoMemberEdit } = props
  const classes = useStyles();

  const [members, setMembers] = useState<Member[]>([])
  const [selectedMember, setSelectedMember] = useState<Member | undefined>(undefined)
  useEffect(() => {
    memberClient.getAllMembers().then((response) => {
      if (response) {
        setMembers(response)
      }
    })
  }, [])

  const updateMember = useCallback(
    (memberId: number) => {
      members.forEach((member) => {
        if (member.id === memberId) {
          setSelectedMember(member)
        }
      })
    },
    [members],
  )

  return (
    <Paper className={classes.container} elevation={5}>
      <Box display="flex" flexDirection="column" alignItems="center">
        <Typography variant="h6">Membre de groupe</Typography>
        <Button onClick={gotoAddMember} variant="outlined" className={classes.button}>Ajouter un membre</Button>
        <FormControl className={classes.flexItems} style={{ width: "calc(100% - 20px)" }}>
          <InputLabel id="select-show-hall-label">Les membres</InputLabel>
          <Select
            labelId="select-show-hall-label"
            id="select-show-hall"
            value={selectedMember ? selectedMember.id : undefined}
            onChange={(event) => updateMember(Number(event.target.value))}
          >
            {members.map((member) => (
              <MenuItem key={member.id} value={member.id}>{`${member.name} ${member.firstName}`}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button onClick={() => selectedMember && gotoMemberEdit(selectedMember.id)} disabled={selectedMember === undefined} variant="outlined" className={classes.button}>Le modifier</Button>
      </Box>
    </Paper>
  );
};

interface AdminBandsProps {
  gotoAddBand: () => void,
  gotoBandEdit: (bandId: number) => void
}

const AdminBands = (props: AdminBandsProps) => {
  const classes = useStyles();
  const {gotoAddBand, gotoBandEdit} = props
  const [bands, setBands] = useState<Band[]>([])
  const [selectedBand, setSelectedBand] = useState<Band | undefined>(undefined)
  useEffect(() => {
    bandClient.getAllBands().then((response) => {
      if (response) {
        setBands(response)
      }
    })
  }, [])

  const updateBand = useCallback(
    (bandId: number) => {
      bands.forEach((band) => {
        if (band.id === bandId) {
          setSelectedBand(band)
        }
      })
    },
    [bands],
  )

  return (
    <Paper className={classes.container} elevation={5}>
      <Box display="flex" flexDirection="column" alignItems="center">
        <Typography variant="h6">Groupe</Typography>
        <Button onClick={gotoAddBand} variant="outlined" className={classes.button}>Créer un groupe</Button>
        <FormControl className={classes.flexItems} style={{ width: "calc(100% - 20px)" }}>
          <InputLabel id="select-show-hall-label">Les groupes</InputLabel>
          <Select
            labelId="select-show-hall-label"
            id="select-show-hall"
            value={selectedBand ? selectedBand.id : undefined}
            onChange={(event) => updateBand(Number(event.target.value))}
          >
            {bands.map((band) => (
              <MenuItem key={band.id} value={band.id}>{band.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button onClick={() => selectedBand && gotoBandEdit(selectedBand.id)} disabled={selectedBand === undefined} variant="outlined" className={classes.button}>Le modifier</Button>
      </Box>
    </Paper>
  );
};

export default withConnect(LoginHub);
