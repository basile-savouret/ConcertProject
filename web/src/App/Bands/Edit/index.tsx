import React, { useCallback, useEffect, useState } from "react";
import withConnect from "./withConnect";
import { Box, Button, FormControl, InputLabel, List, ListItem, ListItemIcon, ListItemText, makeStyles, MenuItem, Paper, Select, TextField, Typography } from "@material-ui/core";
import { Band, Member } from "../../../models";
import { bandClient } from "../../../api/band";
import { useParams } from "react-router-dom";
import { memberClient } from "../../../api/member";

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

interface BandEditProps {
}

const BandEdit = (props: BandEditProps) => {
  const { } = props;
  const classes = useStyles();
  const [band, setBand] = useState<Band | undefined>(undefined)
  //@ts-ignore
  const { bandId } = useParams()
  const [members, setMembers] = useState<Member[]>([])
  const [selectedMember, setSelectedMember] = useState<Member | undefined>(undefined)
  useEffect(() => {
    bandClient.getBand(bandId).then((response) => {
      if (response) {
        setBand(response)
      }
    })
    memberClient.getAllMembers().then((response) => {
      if (response) {
        setMembers(response)
      }
    })
  }, [])

  const updateBand = useCallback(
    () => {
      band && bandClient.updateBand(band).then((response) => {
        if (response) {
          setBand(band)
        }
      })
    },
    [band],
  )

  const chooseMember = useCallback(
    (memberId: number) => {
      members.forEach((member) => {
        if (member.id === memberId) {
          setSelectedMember(member)
        }
      })
    },
    [members],
  )

  const addMemberToList = useCallback(
    () => {
      if (selectedMember && band && band.members) {
        let isAlreadyIn = false
        band.members.map((member) => {
          if (member.id === selectedMember.id) isAlreadyIn = true
        })
        if (!isAlreadyIn) {
          const membersCopy = band.members
          membersCopy.push(selectedMember)
          setBand({ ...band, members: membersCopy })
          setSelectedMember(undefined)
        }
      }
    },
    [selectedMember, band],
  )
  const removeMemberFromList = useCallback(
    (index: number) => {
      if (band && band.members) {
        const membersCopy = band.members
        membersCopy.splice(index, 1)
        setBand({ ...band, members: membersCopy })
      }
    },
    [band],
  )

  if (!band) return <> </>
  return (
    <Box display="flex" justifyContent="center" alignItems="center" width="100vw" height="100vh">
      <Paper className={classes.container} elevation={5}>
        <Box display="flex" flexDirection="column" alignItems="center">
          <TextField value={band.name} onChange={(event) => setBand({ ...band, name: event.target.value })} label="Nom du groupe" className={classes.flexItems} />
          <TextField value={band.lastAlbumName} onChange={(event) => setBand({ ...band, lastAlbumName: event.target.value })} label="Nom de leur dernier album" className={classes.flexItems} />
          <TextField value={band.style} onChange={(event) => setBand({ ...band, style: event.target.value })} label="Style de musique" className={classes.flexItems} />
          <TextField value={band.yearOfCreation} onChange={(event) => setBand({ ...band, yearOfCreation: Number(event.target.value) })} label="Année de création" className={classes.flexItems} />
          <Typography variant="body1" align="center">Les membres du groupe</Typography>
          <List >
            {band && band.members.map((member, index) => (
              <ListItem key={member.id}>
                <ListItemText
                  primary={`${member.name} ${member.firstName}`}
                />
                <ListItemIcon>
                  <Button variant="outlined" onClick={() => removeMemberFromList(index)}>
                    Enlever
                  </Button>
                </ListItemIcon>
              </ListItem>
            ))}
          </List>
          <FormControl className={classes.flexItems} style={{ width: "calc(100% - 20px)" }}>
            <InputLabel id="select-show-member-label">tout les membres</InputLabel>
            <Select
              labelId="select-show-member-label"
              id="select-show-member"
              value={!!selectedMember ? selectedMember.id : ""}
              onChange={(event) => chooseMember(Number(event.target.value))}
            >
              {members.map((member) => (
                <MenuItem key={member.id} value={member.id}>{`${member.name} ${member.firstName}`}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button variant="outlined" onClick={addMemberToList} className={classes.button}>Ajouter le membre</Button>
          <Button variant="outlined" onClick={updateBand} className={classes.button}>Modifier</Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default withConnect(BandEdit)