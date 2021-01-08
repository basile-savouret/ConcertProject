import React, { useCallback, useEffect, useState } from "react";
import withConnect from "./withConnect";
import { Box, Button, makeStyles, Paper, TextField } from "@material-ui/core";
import { Member } from "../../../models";
import { memberClient } from "../../../api/member";
import { useParams } from "react-router-dom";

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

interface MemberEditProps {
}

const MemberEdit = (props: MemberEditProps) => {
  const { } = props;
  const classes = useStyles();
  const [member, setMember] = useState<Member | undefined>(undefined)
  //@ts-ignore
  const { memberId } = useParams()
  useEffect(() => {
    memberClient.getMember(memberId).then((response) => {
      if (response) {
        setMember(response)
      }
    })
  }, [])

  const updateMember = useCallback(
    () => {
      member && memberClient.updateMember(member).then((response) => {
        if (response) {
          setMember(member)
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
          <Button variant="outlined" onClick={updateMember} className={classes.button}>Modifier</Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default withConnect(MemberEdit)