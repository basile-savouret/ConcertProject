import React, { useCallback, useState } from "react";
import withConnect from "./withConnect";
import { Box, Button, makeStyles, Paper, TextField } from "@material-ui/core";
import { memberClient } from "../../../api/member";
import { Member } from "../../../models";

const useStyles = makeStyles(() => ({
  container: {
    padding: "20px",
    borderRadius: "6px"
  },
  flexItems: {
    margin: "15px 10px"
  },
  button: {
    margin: "25px 10px"
  }
}));

interface MemberAddProps {
  gotoAdminActions: () => void
}

const MemberAdd = (props: MemberAddProps) => {
  const {gotoAdminActions } = props;
  const classes = useStyles();
  const [member, setMember] = useState<Partial<Member>>({
    firstName: undefined,
    id: undefined,
    job: undefined,
    name: undefined
  })

  const updateMember = useCallback(
    () => {
      member && memberClient.addMember(member as Member).then((response) => {
        if (response) {
          setMember(member)
          gotoAdminActions()
        }
      })
    },
    [member],
  )

  if (!member) return <> </>
  return (
    <Box display="flex" justifyContent="center" alignItems="center" width="100vw" height="100vh">
      <Paper className={classes.container} elevation={5}>
        <Box display="flex" flexDirection="column" alignItems="center">
          <TextField value={member.name} onChange={(event) => setMember({ ...member, name: event.target.value })} label="Prénom" className={classes.flexItems} />
          <TextField value={member.firstName} onChange={(event) => setMember({ ...member, firstName: event.target.value })} label="Nom de famille" className={classes.flexItems} />
          <TextField value={member.job} onChange={(event) => setMember({ ...member, job: event.target.value })} label="Role" className={classes.flexItems} />
          <Button variant="outlined" onClick={updateMember} className={classes.button}>Ajouter</Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default withConnect(MemberAdd)