import React, { useCallback, useEffect, useState } from "react";
import withConnect from "./withConnect";
import { Box, Button, makeStyles, Paper, TextField, MenuItem, Select, InputLabel, FormControl } from "@material-ui/core";
import { User } from "../../models";
import { userClient } from "../../api/user";
import { decode } from 'jsonwebtoken'

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
  },
  link: {
    cursor: "pointer",
    color: "blue"
  }
}));

interface EditProfileProps {
  addUser: (user: User, token: string) => void
  user?: User
}

const EditProfile = (props: EditProfileProps) => {
  const { addUser, user } = props;
  const classes = useStyles();
  const [name, setname] = useState<string>(user ? user.name : "")
  const [role, setrole] = useState<string>(user ? user.roles[0] : "")

  const userUpdate = useCallback(
    () => {
      userClient.update(name, role).then((response) => {
        if (response) {
          const user = decode(response.token) as User
          addUser(user, response.token)
        }
      })
    },
    [addUser, name, role],
  )
  useEffect(() => {
    if (user) {
      setname(user.name)
      setrole(user.roles[0])
    }
  }, [user])

  return (
    <Box display="flex" justifyContent="center" alignItems="center" width="100vw" height="100vh">
      <Paper className={classes.container} elevation={5}>
        <Box display="flex" flexDirection="column" alignItems="center">
          <TextField value={name} onChange={(event) => setname(event.target.value)} label="nom" type="nom" className={classes.flexItems} />
          <FormControl >
            <InputLabel id="select-user-role-label">Role</InputLabel>
            <Select
              labelId="select-user-role-label"
              id="select-user-role"
              value={role}
              className={classes.flexItems}
              onChange={(event) => setrole(event.target.value as string)}
            >
              <MenuItem value="ROLE_USER">Utilisateur</MenuItem>
              <MenuItem value="ROLE_ADMIN_SHOW">CRUD concert</MenuItem>
              <MenuItem value="ROLE_ADMIN_BAND">CRUD groupe</MenuItem>
              <MenuItem value="ROLE_ADMIN_MEMBER">CRUD membres</MenuItem>
            </Select>
          </FormControl>
          <Button onClick={userUpdate} variant="outlined" className={classes.button}>Modifier</Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default withConnect(EditProfile);
