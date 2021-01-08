import React, { useCallback, useEffect, useState } from "react";
import withConnect from "./withConnect";
import { Box, Button, makeStyles, Paper, TextField } from "@material-ui/core";
import { Hall } from "../../../models";
import { hallClient } from "../../../api/hall";
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

interface HallEditProps {
}

const HallEdit = (props: HallEditProps) => {
  const { } = props;
  const classes = useStyles();
  const [hall, setHall] = useState<Hall | undefined>(undefined)
  //@ts-ignore
  const { hallId } = useParams()
  useEffect(() => {
    hallClient.getHall(hallId).then((response) => {
      if (response) {
        setHall(response)
      }
    })
  }, [])

  const updateHall = useCallback(
    () => {
      hall && hallClient.updateHall(hall).then((response) => {
        if (response) {
          setHall(hall)
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
          <Button variant="outlined" onClick={updateHall} className={classes.button}>Modifier</Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default withConnect(HallEdit)