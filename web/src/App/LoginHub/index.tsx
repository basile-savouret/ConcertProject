import React, { useCallback, useState } from "react";
import withConnect from "./withConnect";
import { Box, Button, makeStyles, Paper, TextField, Link, FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";
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

interface LoginHubProps {
  addUser: (user: User, token: string) => void
  user?: User
}

const LoginHub = (props: LoginHubProps) => {
  const { addUser, user } = props;
  const classes = useStyles();
  const [email, setemail] = useState("")
  const [name, setname] = useState("")
  const [password, setpassword] = useState("")
  const [login, setlogin] = useState(true)
  const [role, setrole] = useState<string>(user ? user.roles[0] : "")

  const userLogin = useCallback(
    () => {
      userClient.login(email, password).then((response) => {
        if (response) {
          const user = decode(response.token) as User
          addUser(user, response.token)
        }
      })
    },
    [addUser, email, password],
  )

  const userRegister = useCallback(
    () => {
      userClient.register(email, password, name, role).then((response) => {
        if (response) {
          const user = decode(response.token) as User
          addUser(user, response.token)
        }
      })
    },
    [addUser, email, password, name, role],
  )

  return (
    <Box display="flex" justifyContent="center" alignItems="center" width="100vw" height="100vh">
      <Paper className={classes.container} elevation={5}>
        <Box display="flex" flexDirection="column" alignItems="center">
          {!login && <TextField value={name} onChange={(event) => setname(event.target.value)} label="nom" type="nom" className={classes.flexItems} />}
          {!login && <FormControl className={classes.flexItems} style={{width: "calc(100% - 20px)"}}>
            <InputLabel id="select-user-role-label">Role</InputLabel>
            <Select
              labelId="select-user-role-label"
              id="select-user-role"
              value={role}
              onChange={(event) => setrole(event.target.value as string)}
            >
              <MenuItem value="ROLE_USER">Utilisateur</MenuItem>
              <MenuItem value="ROLE_ADMIN_SHOW">CRUD concert</MenuItem>
              <MenuItem value="ROLE_ADMIN_BAND">CRUD groupe</MenuItem>
              <MenuItem value="ROLE_ADMIN_MEMBER">CRUD membres</MenuItem>
            </Select>
          </FormControl>}
          <TextField value={email} onChange={(event) => setemail(event.target.value)} label="email" type="email" className={classes.flexItems} />
          <TextField value={password} onChange={(event) => setpassword(event.target.value)} label="mot de passe" type="password" className={classes.flexItems} />
          <Button onClick={() => login ? userLogin() : userRegister()} variant="outlined" className={classes.button}>{login ? "Connexion" : "Inscription"}</Button>
          <Link onClick={() => setlogin(!login)} className={classes.link}>{!login ? "Connexion" : "Inscription"}</Link>
        </Box>
      </Paper>
    </Box>
  );
};

export default withConnect(LoginHub);
