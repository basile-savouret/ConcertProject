import { Box, makeStyles, Paper, Typography } from '@material-ui/core';
import React from 'react'

const useStyles = makeStyles(() => ({
    content: {
        fontWeight: 600,
    }
}));

export interface CellItem {
    label: string
    content: string
}

export const CellItem = (props: CellItem) => {
    const { content, label } = props
    const classes = useStyles()
    return (
        <Box display="flex" flexDirection="column"  margin="10px">
            <Typography variant="body1">{label}</Typography>
            <Typography variant="body1" className={classes.content}>{content}</Typography>
        </Box>
    )
}
