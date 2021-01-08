import React, { useCallback, useEffect, useState } from "react";
import withConnect from "./withConnect";
import { Box, Button, FormControl, InputLabel, makeStyles, MenuItem, Paper, Select, TextField } from "@material-ui/core";
import { Band, Hall, Show } from "../../../models";
import { showClient } from "../../../api/show";
import { bandClient } from "../../../api/band";
import { hallClient } from "../../../api/hall";
import { useParams } from "react-router-dom";
import { format } from "date-fns"

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

interface AddShowProps {
  gotoShowView: (showId: number) => void
}

const AddShow = (props: AddShowProps) => {
  const { gotoShowView } = props;
  const classes = useStyles();
  const [show, setShow] = useState<Partial<Show>>({
    id: undefined,
    tourName: undefined,
    date: undefined,
    hall: undefined,
    band: undefined
  })
  const [bands, setBands] = useState<Band[]>([])
  const [halls, setHalls] = useState<Hall[]>([])
  useEffect(() => {
    bandClient.getAllBands().then((response) => {
      if (response) {
        setBands(response)
      }
    })
    hallClient.getAllHalls().then((response) => {
      if (response) {
        setHalls(response)
      }
    })
  }, [])

  const updateBand = useCallback(
    (bandId: number) => {
      bands.forEach((band) => {
        if (band.id === bandId) {
          setShow(oldShow => {
            return { ...oldShow, band: band }
          })
        }
      })
    },
    [bands],
  )

  const updateHall = useCallback(
    (hallId: number) => {
      halls.forEach((hall) => {
        if (hall.id === hallId) {
          setShow(oldShow => {
            return { ...oldShow, hall: hall }
          })
        }
      })
    },
    [halls],
  )

  const addShow = useCallback(
    () => {
      showClient.addShow(show as Show).then((result) => {
        if (result) {
          gotoShowView(result.id)
        }
      })
    },
    [show],
  )

  if (!show) return <> </>
  return (
    <Box display="flex" justifyContent="center" alignItems="center" width="100vw" height="100vh">
      <Paper className={classes.container} elevation={5}>
        <Box display="flex" flexDirection="column" alignItems="center">
          <TextField value={show.tourName} onChange={(event) => setShow({ ...show, tourName: event.target.value })} label="Nom du concert" className={classes.flexItems} />
          <FormControl className={classes.flexItems} style={{ width: "calc(100% - 20px)" }}>
            <InputLabel id="select-show-band-label">Groupe</InputLabel>
            <Select
              labelId="select-show-band-label"
              id="select-show-band"
              value={show.band?.id}
              onChange={(event) => updateBand(Number(event.target.value))}
            >
              {bands.map((band) => (
                <MenuItem key={band.id} value={band.id}>{band.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl className={classes.flexItems} style={{ width: "calc(100% - 20px)" }}>
            <InputLabel id="select-show-hall-label">Salle</InputLabel>
            <Select
              labelId="select-show-hall-label"
              id="select-show-hall"
              value={show.hall?.id}
              onChange={(event) => updateHall(Number(event.target.value))}
            >
              {halls.map((hall) => (
                <MenuItem key={hall.id} value={hall.id}>{`${hall.name} à ${hall.city}`}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <InputLabel htmlFor="show-date">Date du concert</InputLabel>
          <input id="show-date" value={show.date ? format(new Date(show.date), "yyyy-MM-dd") : undefined} onChange={(event) => setShow({ ...show, date: new Date(event.target.value).getTime() })} type="date" className={classes.flexItems} />
          <Button variant="outlined" onClick={addShow} className={classes.button}>Ajouter</Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default withConnect(AddShow)