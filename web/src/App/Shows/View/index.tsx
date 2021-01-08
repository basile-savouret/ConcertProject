import React, { useEffect, useState } from "react";
import { Box, makeStyles, Paper, Typography } from "@material-ui/core";
import { CellItem } from "../../Components/CellItem";
import { useParams } from "react-router-dom";
import { showClient } from "../../../api/show";
import { Show } from "../../../models";
import withConnect from "./withConnect";
import { Cell } from "../../Components/Cell";

const useStyles = makeStyles(() => ({
  container: {
    padding: "10px",
    borderRadius: "6px",
    margin: "30px"
  },
  item: {
    margin: "10px"
  }
}));

interface ShowViewProps {
  gotoShowView: (showId: number) => void
}

const ShowView = (props: ShowViewProps) => {
  const { gotoShowView } = props;
  const classes = useStyles();
  const [show, setShow] = useState<Show | undefined>(undefined)
  const [groupShows, setGroupShows] = useState<Show[]>([])
  //@ts-ignore
  const { showId } = useParams()
  useEffect(() => {
    showClient.getShow(showId).then((response) => {
      if (response) {
        setShow(response)
      }
    })
  }, [])

  useEffect(() => {
    show && showClient.getAllShows(0, 10, show.band.id).then((response) => {
      if (response) {
        setGroupShows(response.list)
      }
    })
  }, [show])

  const ShowItems: CellItem[] = show ? [{
    label: "Nom:",
    content: show.tourName
  }, {
    label: "Date:",
    content: new Date(show.date).toLocaleDateString()
  }] : []

  const hallItems: CellItem[] = show ? [{
    label: "Nom:",
    content: show.hall.name
  }, {
    label: "Ville:",
    content: show.hall.city
  }, {
    label: "Adresse:",
    content: show.hall.address
  }, {
    label: "Capacité:",
    content: `${show.hall.capacity.toLocaleString()} personnes`
  }] : []

  const groupItems: CellItem[] = show ? [{
    label: "Nom:",
    content: show.band.name
  }, {
    label: "Style:",
    content: show.band.style
  }, {
    label: "année de création:",
    content: show.band.yearOfCreation.toLocaleString()
  }] : []



  return (
    <>
      <Box display="flex" flexWrap="wrap" justifyContent="space-around">
        <Paper elevation={2} className={classes.container} >
          <Box display="flex" flexWrap="wrap" width="600px" justifyContent="space-around">
            <Typography variant="h6" align="center" style={{ width: "100%" }}>Concert</Typography>
            {ShowItems.map((item, index) => (
              <CellItem key={index} content={item.content} label={item.label} />
            ))}
          </Box>
        </Paper>
        <Paper elevation={2} className={classes.container} >
          <Box display="flex" flexWrap="wrap" width="600px" justifyContent="space-around">
            <Typography variant="h6" align="center" style={{ width: "100%" }}>Salle</Typography>
            {hallItems.map((item, index) => (
              <CellItem key={index} content={item.content} label={item.label} />
            ))}
          </Box>
        </Paper>
      </Box>
      <Paper elevation={2} className={classes.container} >
        <Box display="flex" flexWrap="wrap" justifyContent="space-around">
          <Typography variant="h6" align="center" style={{ width: "100%" }}>Groupe</Typography>
          {groupItems.map((item, index) => (
            <CellItem key={index} content={item.content} label={item.label} />
          ))}
          <Typography variant="h6" align="center" style={{ width: "100%" }}>Membres</Typography>
          {show?.band.members.map((member, index) => (
            <Box display="flex" flexDirection="column">
              <CellItem key={index} content={`${member.name} ${member.firstName}`} label="Nom:" />
              <CellItem key={index} content={member.job} label="Role:" />
            </Box>
          ))}
        </Box>
        <Typography variant="h6" align="center">Leurs prochains concert</Typography>
        <Box display="flex" flexDirection="column" margin="30px">
          {groupShows.map((show) => {
            const items: CellItem[] = [{
              label: "Nom:",
              content: show.tourName
            }, {
              label: "Date:",
              content: new Date(show.date).toLocaleDateString()
            }, {
              label: "Groupe:",
              content: show.band.name
            }, {
              label: "Ville:",
              content: show.hall.city
            }, {
              label: "Salle:",
              content: show.hall.name
            }]
            return (
              <Cell
                key={show.id}
                items={items}
                className={classes.item}
                onClick={() => gotoShowView(show.id)}
              />
            )
          })}
        </Box>
      </Paper>
    </>
  );
};

export default withConnect(ShowView);
