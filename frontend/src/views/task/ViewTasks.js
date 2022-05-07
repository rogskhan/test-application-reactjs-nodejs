import React, { useState, useRef } from 'react'
import {
    Grid, Box, Button, Typography, CircularProgress, TextField, Autocomplete, Table, TableBody, TableCell, TableContainer, 
    TableHead, TableRow, TableFooter, Paper, Checkbox, IconButton, Dialog, DialogActions, DialogContent, DialogTitle, Chip
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import CheckIcon from '@mui/icons-material/Check'
import { toast } from 'react-toastify'

import AlertDialog from '../components/AlertDialog'
import useViewTasksViewModel from '../../viewmodels/task/ViewTasksViewModel'

function ViewTasks() {
    //Tasks loading vars
    const [loading, setLoading] = useState(false)
    const [limitReached, setLimitReached] = useState(false)
    const [tasks, setTasks] = useState([])

    //Task delete vars
    const [deleting, setDeleting] = useState({})
    const deletePopup = useRef(null)

    //Task complete vars
    const [completing, setCompleting] = useState({})

    //Task multi action vars
    const [runningMultiAction, setRunningMultiAction] = useState(false)
    const [checked, setChecked] = useState([])
    const deleteMultiPopup = useRef(null)
    const [openMovePopup, setOpenMovePopup] = useState(false)
    const [searching, setSearching] = useState(false)
    const [lists, setLists] = useState([])
    const [selectedList, setSelectedList] = useState("")

    const setDeletingStatus = (id, value) => {
        var tempDeleting = {}
        tempDeleting[id] = value
        setDeleting(deleting => ({
            ...deleting,
            ...tempDeleting
        }))
    }

    const setCompletingStatus = (id, value) => {
        var tempCompleting = {}
        tempCompleting[id] = value
        setCompleting(completing => ({
            ...completing,
            ...tempCompleting
        }))
    }

    const events = {
        //Load tasks
        onLoadWaiting() {
            setLoading(true)
        },
        onLoadSuccess(data) {
            if (data.length === 0) {
                setLimitReached(true)
            } else {
                var newTasks = [...tasks]
                for(var i = 0; i < data.length; i++) {
                    newTasks.push(data[i])
                }
                setTasks(newTasks)
            }
            setLoading(false)
        },
        onLoadError(error){
            toast.error(error)
            setLoading(false)
        },

        //Delete task
        onDeleteWaiting(id) {
            setDeletingStatus(id, true)
        },
        onDeleteSuccess(id) {
            setDeletingStatus(id, false)
            var newTasks = tasks.filter(function( obj ) {
                return obj._id !== id;
            })
            setTasks(newTasks)
        },
        onDeleteError(id, error){
            toast.error(error)
            setDeletingStatus(id, false)
        },

        //Complete task
        onCompleteWaiting(id) {
            setCompletingStatus(id, 1)
        },
        onCompleteSuccess(id) {
            setCompletingStatus(id, 2)
        },
        onCompleteError(id, error) {
            toast.error(error)
            setCompletingStatus(id, 2)
        },

        //Delete tasks
        onMultiDeleteWaiting() {
            setRunningMultiAction(true)
        },
        onMultiDeleteSuccess(ids) {
            setRunningMultiAction(false)
            var newTasks = tasks.filter(function( obj ) {
                return ids.indexOf(obj._id) === -1
            })
            setTasks(newTasks)
        },
        onMultiDeleteError(error){
            toast.error(error)
            setRunningMultiAction(false)
        },

        //Search lists
        onSearchListsWaiting() {
            setSearching(true)
        },
        onSearchListsSuccess(data) {
            setSearching(false)
            var searchList = []
            for (var i = 0; i < data.length; i++) {
                searchList.push({label: data[i].name, id: data[i]._id})
            }
            setLists(searchList)
        },
        onSearchListsError(error){
            toast.error(error)
            setSearching(false)
            setLists([])
        }
    }

    const handleCheckedList = (e, id) => {
        var tempChecked = [...checked]
        if (e.target.checked) {
            tempChecked.push(id)
        } else {
            var index = tempChecked.indexOf(id)
            if (index >= 0) {
                tempChecked.splice(index, 1)
            }
        }
        setChecked(tempChecked)
    }

    const handleCheckAll = (e) => {
        var tempChecked = [...checked]
        if(e.target.checked) {
            for(var i = 0; i < tasks.length; i++) {
                tempChecked.push(tasks[i]._id)
            }
        } else {
            tempChecked = []
        }
        setChecked(tempChecked)
    }

    const { onLoadMore, onTaskDelete, onTasksDelete, onSearchLists, onMoveTasks, onTaskComplete } = useViewTasksViewModel(events)
   
    const handleMoveAction = () => {
        setRunningMultiAction(true)
        setOpenMovePopup(false)
        onMoveTasks(selectedList, checked)
    }

    return (
        <Box marginTop={5} >
            <AlertDialog openHandler={deletePopup} clickYesAction={(id) => onTaskDelete(id)} title="Delete Task" message="Are you sure, you want to delete this task?" noTitle="No" yesTitle="Yes" />
            <AlertDialog openHandler={deleteMultiPopup} clickYesAction={(ids) => onTasksDelete(ids)} title="Delete Tasks" message="Are you sure, you want to delete the selected tasks?" noTitle="No" yesTitle="Yes" />
            <Dialog onClose={() => setOpenMovePopup(false)} open={openMovePopup} fullWidth>
                <DialogTitle>Move to a new List {searching ? <CircularProgress size={10} />:''}</DialogTitle>
                <DialogContent>
                    <Box padding={2} minHeight='25vh'>
                        <Autocomplete
                            disablePortal
                            options={lists}
                            onChange={(e, v) => setSelectedList(v.id)}
                            onKeyUp={(e) => onSearchLists(e.target.value)}
                            renderInput={(params) => <TextField {...params} label="Select the List" />}
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button color='error' onClick={() => setOpenMovePopup(false)}>Cancel</Button>
                    <Button onClick={handleMoveAction} autoFocus>Move</Button>
                </DialogActions>
            </Dialog>
            <Typography marginBottom={2} variant="h5">View Tasks</Typography>
            {
                tasks.length === 0 ? (
                    <Grid marginTop={2} spacing={2} container justifyContent="center">
                        {
                            limitReached ? (
                                <Grid item xs={12} textAlign='center'>
                                    No Tasks
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
                                            <TableCell>
                                                <Checkbox
                                                    onClick={handleCheckAll}
                                                    disabled={tasks.length === 0}
                                                    inputProps={{
                                                    'aria-label': 'all items selected',
                                                    }}
                                                />
                                            </TableCell>
                                            <TableCell>Task</TableCell>
                                            <TableCell>Created At</TableCell>
                                            <TableCell>Updated At</TableCell>
                                            <TableCell>Actions</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                    {
                                        tasks.map((task, index) =>
                                            <TableRow
                                            key={index}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell>
                                                    <Checkbox
                                                        checked={checked.indexOf(task._id) !== -1}
                                                        onClick={(e) => {handleCheckedList(e, task._id)}}
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <p>{task.name}</p>
                                                    <p><small>{task.description}</small></p>
                                                    <p><b>Deadline:</b><small>{task.deadline}</small></p>
                                                    <Chip color={(task.completed || completing[task._id] === 2) ? "primary":"secondary"}  label={(task.completed || completing[task._id] === 2) ? "Completed":"Pending"} />
                                                </TableCell>
                                                <TableCell>{task.createdAt}</TableCell>
                                                <TableCell>{task.updatedAt == null ? 'Not updated':task.updatedAt}</TableCell>
                                                <TableCell>
                                                    {
                                                        !task.completed && completing[task._id] !== 2 ? (
                                                            <IconButton disabled={completing[task._id] === 1} color="primary" component="span" onClick={() => onTaskComplete(task._id)} >
                                                                {
                                                                    completing[task._id] === 1 ? (
                                                                        <CircularProgress size={20} />
                                                                    ):(<CheckIcon />)
                                                                }
                                                            </IconButton>
                                                        ):''
                                                    }
                                                    <IconButton color="warning" component="span" onClick={() => { window.open("/edit/task/" + task._id, '_self') }}>
                                                        <EditIcon />
                                                    </IconButton>
                                                    <IconButton disabled={deleting[task._id]} color="error" component="span" onClick={() => deletePopup.current(task._id)}>
                                                        {
                                                            deleting[task._id] ? (
                                                                <CircularProgress size={20} />
                                                            ):(<DeleteIcon />)
                                                        }
                                                    </IconButton>
                                                </TableCell>
                                            </TableRow>
                                        )
                                    }
                                    </TableBody>
                                    {
                                        checked.length > 0 ? (
                                            <TableFooter>
                                                <TableRow>
                                                    <TableCell colSpan={6}>
                                                    {
                                                            runningMultiAction ? (
                                                                <CircularProgress size={20} />
                                                            ):(
                                                                <>
                                                                    <Button color='error' onClick={() => deleteMultiPopup.current(checked)}>Delete</Button> | 
                                                                    <Button color='primary' onClick={() => setOpenMovePopup(true)}>Move</Button>
                                                                </>
                                                            )
                                                     }
                                                    </TableCell>
                                                </TableRow>
                                            </TableFooter>
                                        ):''
                                    }
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

export default ViewTasks