import React, { useCallback, useState } from "react";
import withConnect from "./withConnect";
import { Box, Button, makeStyles, Paper, TextField } from "@material-ui/core";
import { hallClient } from "../../../api/hall";
import { Hall } from "../../../models";

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

interface AddHallProps {
  gotoAdminActions: () => void
}

const AddHall = (props: AddHallProps) => {
  const {gotoAdminActions } = props;
  const classes = useStyles();
  const [hall, setHall] = useState<Partial<Hall>>({
    name: undefined,
    id: undefined,
    city: undefined,
    address: undefined,
    capacity: undefined
  })

  const updateHall = useCallback(
    () => {
      hall && hallClient.addHall(hall as Hall).then((response) => {
        if (response) {
          setHall(hall)
          gotoAdminActions()
        }
      })
    },
    [hall],
  )

  if (!hall) return <> </>
  return (
    <Box display="flex" justifyContent="center" alignItems="center" width="100vw" height="100vh">
      <Paper className={classes.container} elevation={5}>
        <Box display="flex" flexDirection="column" alignItems="center">
          <TextField value={hall.name} onChange={(event) => setHall({ ...hall, name: event.target.value })} label="Nom de la salle" className={classes.flexItems} />
          <TextField value={hall.city} onChange={(event) => setHall({ ...hall, city: event.target.value })} label="Ville de la salle" className={classes.flexItems} />
          <TextField value={hall.address} onChange={(event) => setHall({ ...hall, address: event.target.value })} label="Adresse de la salle" className={classes.flexItems} />
          <TextField value={hall.capacity} onChange={(event) => setHall({ ...hall, capacity: Number(event.target.value) })} label="Capacité de la salle" type="number" className={classes.flexItems} />
          <Button variant="outlined" onClick={updateHall} className={classes.button}>Ajouter</Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default withConnect(AddHall)