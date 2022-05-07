import React, { useState, useRef } from 'react'
import { 
    Grid, Box, Button, Typography, CircularProgress,  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton
} from '@mui/material'
import BallotIcon from '@mui/icons-material/Ballot'
import DeleteIcon from '@mui/icons-material/Delete'
import AddBoxIcon from '@mui/icons-material/AddBox'
import { toast } from 'react-toastify'

import AlertDialog from '../components/AlertDialog'
import useViewListsViewModel from '../../viewmodels/list/ViewListsViewModel'

function ViewLists() {

    //Lists loading vars
    const [loading, setLoading] = useState(false)
    const [limitReached, setLimitReached] = useState(false)
    const [lists, setLists] = useState([])

    //List delete vars
    const [deleting, setDeleting] = useState({})
    const deletePopup = useRef(null)

    const setDeletingStatus = (id, value) => {
        var tempDeleting = {}
        tempDeleting[id] = value
        setDeleting(deleting => ({
            ...deleting,
            ...tempDeleting
        }))
    }

    const events = {
        //Load lists
        onLoadWaiting() {
            setLoading(true)
        },
        onLoadSuccess(data) {
            if (data.length === 0) {
                setLimitReached(true)
            } else {
                var newLists = [...lists]
                for(var i = 0; i < data.length; i++) {
                    newLists.push(data[i])
                }
                setLists(newLists)
            }
            setLoading(false)
        },
        onLoadError(error){
            toast.error(error)
            setLoading(false)
        },

        //Delete list
        onDeleteWaiting(id) {
            setDeletingStatus(id, true)
        },
        onDeleteSuccess(id) {
            setDeletingStatus(id, false)
            var newLists = lists.filter(function( obj ) {
                return obj._id !== id;
            })
            setLists(newLists)
        },
        onDeleteError(id, error){
            toast.error(error)
            setDeletingStatus(id, false)
        }
    }

    const { onLoadMore, onListDelete } = useViewListsViewModel(events)
    
    return (
        <Box marginTop={5} >
            <AlertDialog openHandler={deletePopup} clickYesAction={(id) => onListDelete(id)} title="Delete List" message="Are you sure, you want to delete this list?" noTitle="No" yesTitle="Yes" />
            <Typography marginBottom={2} variant="h5">View Lists</Typography>
            {
                lists.length === 0 ? (
                    <Grid marginTop={2} spacing={2} container justifyContent="center">
                    {
                        limitReached ? (
                            <Grid item xs={12} textAlign='center'>
                                No Lists.
                            </Grid>
                        ):(
                            <>  
                                <Grid item xs={12} textAlign='center'>
                                    <CircularProgress size={30} />
                                </Grid>
                                <Grid item xs={12} textAlign='center'>
                                    <Typography marginBottom={2} variant="p" component='small'>Loading lists...</Typography>
                                </Grid>
                            </>
                        )
                    }
                    </Grid>
                ):(
                    <Grid marginTop={2} marginBottom={10} spacing={2} container justifyContent="center">
                        <Grid item xs={12} textAlign='center'>
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Name</TableCell>
                                            <TableCell>Created At</TableCell>
                                            <TableCell>Updated At</TableCell>
                                            <TableCell>Actions</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                    {
                                        lists.map((list, index) =>
                                            <TableRow
                                            key={index}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell>{list.name}</TableCell>
                                                <TableCell>{list.createdAt}</TableCell>
                                                <TableCell>{list.updatedAt == null ? 'Not updated':list.updatedAt}</TableCell>
                                                <TableCell>
                                                    <IconButton color="primary" component="span" onClick={() => { window.open("/create/task/" + list._id, '_self') }}>
                                                        <AddBoxIcon />
                                                    </IconButton>
                                                    <IconButton color="primary" component="span" onClick={() => { window.open("/tasks/" + list._id, '_self') }}>
                                                        <BallotIcon />
                                                    </IconButton>
                                                    <IconButton disabled={deleting[list._id]} color="error" component="span" onClick={() => deletePopup.current(list._id)}>
                                                        {
                                                            deleting[list._id] ? (
                                                                <CircularProgress size={20} />
                                                            ):(<DeleteIcon />)
                                                        }
                                                    </IconButton>
                                                </TableCell>
                                            </TableRow>
                                        )
                                    }
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>
                        {
                            !limitReached ? (
                                <Grid item xs={12}>
                                    <Grid spacing={2} container justifyContent="center">
                                        <Grid item>
                                            <Button disabled={loading} variant="contained" onClick={onLoadMore}>
                                                {
                                                    loading ? (
                                                        <CircularProgress size={20} />
                                                    ):'Load More'
                                                }
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            ):''
                        }
                    </Grid>
                )
            }
        </Box>
    )
}

export default ViewLists