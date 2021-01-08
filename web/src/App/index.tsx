import { AppBar, Box, Button, Toolbar, Typography } from "@material-ui/core";
import { ConnectedRouter } from "connected-react-router";
import React, { useCallback } from "react";
import { Route, Switch } from "react-router-dom";
import { User } from "../models";
import { history } from "../store";
import LoginHub from "./LoginHub";
import withConnect from "./withConnect";
import ShowsList from "./Shows/List"
import ShowView from "./Shows/View"
import EditProfile from "./EditProfile/index"
import EditShow from "./Shows/Edit"
import AddShow from "./Shows/Add"
import AdminActions from "./AdminActions"
import EditMember from "./Members/Edit"
import AddMember from "./Members/Add"
import EditHall from "./Halls/Edit"
import AddHall from "./Halls/Add"
import EditBand from "./Bands/Edit"
import AddBand from "./Bands/Add"
import OldShowsList from "./Shows/OldList"
import { Location } from "history";
 

const NoMatchPage = () => {
  return <h3>Cette page n'existe pas</h3>;
};

interface AppProps {
  user?: User
  addUser: (user?: User, token?: string) => void
  gotoLogin: () => void
  gotoProfileUpdate: () => void
  gotoHome:() => void
  gotoAdminActions: () => void
  gotoOldShows: () => void
  location: Location<unknown>
}

export const App = withConnect((props: AppProps) => {
  const { user, addUser, gotoLogin, gotoProfileUpdate, gotoHome, gotoAdminActions, gotoOldShows, location } = props
  const logout = useCallback(
    () => {
      addUser()
    },
    [addUser],
  )
    console.log(location)
  return (
    <>
      <AppBar position="static">
        <Toolbar>
        <Button color="inherit" onClick={gotoHome}>Home</Button>
        {isUserAdmin(user) && <Button color="inherit" onClick={gotoAdminActions}>Admin actions</Button>}
          <Typography variant="h5" style={{flexGrow: 1, textAlign: "center"}}>
            {user ? `Bonjour ${user.name}` : "Concert Project"}
          </Typography>
          {user && <Button color="inherit" onClick={gotoProfileUpdate}>Modifier mon profil</Button>}
          
          {user && <Button color="inherit" onClick={logout}>Se déconnecter</Button>}
          {!user && <Button color="inherit" onClick={gotoLogin}>Se connecter</Button>}
        </Toolbar>
      </AppBar>
      <ConnectedRouter history={history}>
        <Switch>
          <Route exact path="/" component={ShowsList} />
          <Route exact path="/shows" component={ShowsList} />
          <Route exact path="/oldShows" component={OldShowsList} />
          <Route exact path="/shows/:showId/view" component={ShowView} />
          {user?.roles.includes("ROLE_ADMIN_SHOW") && <Route exact path="/shows/add" component={AddShow} />}
          {user?.roles.includes("ROLE_ADMIN_SHOW") && <Route exact path="/shows/:showId/edit" component={EditShow} />}
          {user?.roles.includes("ROLE_ADMIN_MEMBER") && <Route exact path="/members/add" component={AddMember} />}
          {user?.roles.includes("ROLE_ADMIN_MEMBER") && <Route exact path="/members/:memberId/edit" component={EditMember} />}
          {user?.roles.includes("ROLE_ADMIN_SHOW") && <Route exact path="/halls/add" component={AddHall} />}
          {user?.roles.includes("ROLE_ADMIN_SHOW") && <Route exact path="/halls/:hallId/edit" component={EditHall} />}
          {user?.roles.includes("ROLE_ADMIN_BAND") && <Route exact path="/bands/add" component={AddBand} />}
          {user?.roles.includes("ROLE_ADMIN_BAND") && <Route exact path="/bands/:bandId/edit" component={EditBand} />}
          {isUserAdmin(user) && <Route exact path="/admin/actions" component={AdminActions} />}
          <Route exact path="/login" component={LoginHub} />
          <Route exact path="/profile/update" component={EditProfile} />
          <Route path="*">
            <NoMatchPage />
          </Route>
        </Switch>
      </ConnectedRouter>
      {location.pathname !== "/oldShows" &&
      <Box display="flex" justifyContent="center" >
        <Button variant="outlined" onClick={gotoOldShows}>Accèder aux concerts passés</Button>
      </Box>}
    </>
  );
});

const isUserAdmin = (user?: User): boolean => {
  return user ? (user.roles.includes("ROLE_ADMIN_SHOW") || user.roles.includes("ROLE_ADMIN_BAND") || user.roles.includes("ROLE_ADMIN_MEMBER")) : false
}