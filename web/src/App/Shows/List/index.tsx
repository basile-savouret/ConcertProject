import React, { useEffect, useState } from "react";
import withConnect from "./withConnect";
import { Box, Button, CircularProgress, makeStyles, Typography } from "@material-ui/core";
import { Show, User } from "../../../models";
import { showClient } from "../../../api/show";
import { Cell } from "../../Components/Cell";
import { CellItem } from "../../Components/CellItem";
import { Pagination } from "@material-ui/lab";

const useStyles = makeStyles(() => ({
  item: {
    margin: "10px"
  }
}));

interface ShowsListProps {
  gotoShowView: (showId: number) => void
  gotoShowEdit: (showId: number) => void
  user?: User
}

const ShowsList = (props: ShowsListProps) => {
  const { gotoShowView, gotoShowEdit, user } = props;
  const classes = useStyles();
  const [shows, setShows] = useState<Show[]>([])
  const [total, settotal] = useState(0)
  const [page, setpage] = useState(0)
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    setLoading(true)
    showClient.getAllShows(page, 5).then((response) => {
      if (response) {
        setShows(response.list)
        settotal(response.total)
        setLoading(false)
      }
    })
  }, [page])
  return (
    <>
      <Typography variant="h6" align="center">Les prochains concert</Typography>
      {loading && <Box display="flex" justifyContent="center"><CircularProgress /></Box>}
      {!loading && <Box display="flex" flexDirection="column" margin="30px">
        {shows.map((show) => {
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
            <>
              <Cell
                key={show.id}
                items={items}
                className={classes.item}
                onClick={() => gotoShowView(show.id)}
                customCells={user?.roles.includes("ROLE_ADMIN_SHOW") && <Button variant="outlined" style={{maxHeight: "40px"}} onClick={(event) => {event.stopPropagation(); gotoShowEdit(show.id)}}>Modifier</Button>}
              />
            </>
          )
        })}
      </Box>}
      <Box display="flex" justifyContent="center" margin="30px">
        <Pagination disabled={loading} page={page + 1} onChange={(event, page) => setpage(page - 1)} count={Math.ceil(total / 5)} color="primary" />
      </Box>
    </>
  );
};

export default withConnect(ShowsList)