import { Box, makeStyles, Paper, Typography } from '@material-ui/core';
import React from 'react'
import { CellItem } from './CellItem';

const useStyles = makeStyles(() => ({
    container: {
        padding: "10px",
        borderRadius: "6px",
        cursor: "pointer"
    }
}));

interface CellProps {
    items: CellItem[]
    className: string
    onClick: () => void
    customCells?: React.ReactNode
}

export const Cell = (props: CellProps) => {
    const { items, className, onClick, customCells } = props
    const classes = useStyles()
    return (
        <Paper elevation={2} className={`${classes.container} ${className}`} onClick={onClick}>
            <Box display="flex" justifyContent="space-between" alignItems="center">
                {items.map((item, index) => (
                    <CellItem key={index} content={item.content} label={item.label}/>
                ))}
                {customCells}
            </Box>
        </Paper>
    )
}
