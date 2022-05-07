import React, { useState } from 'react';
import useEditTaskViewModel from '../../viewmodels/task/EditTaskViewModel';
import { TextField, Grid, Box, Button, Typography, CircularProgress } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { toast } from 'react-toastify';

function EditTask() {
    const [updating, setUpdating] = useState(false)
    const [datetime, setDatetime] = useState(new Date())
    const [task, setTask] = useState(null)

    const events = {
        //Task item load
        onLoadWaiting() { },
        onLoadSuccess(data) {
            setTask(data)
            setDatetime(new Date(data.deadline))
        },
        onLoadError(error){
            toast.error(error)
        },

        //Task update
        onWaiting() {
            setUpdating(true)
        },
        onSuccess(id) {
            toast.success("Task is successfully updated!")
            setUpdating(false)
        },
        onError(error){
            toast.error(error)
            setUpdating(false)
        }
    }

    const { onSetName, onSetDescription, onSetDeadline, onClickSave } = useEditTaskViewModel(events)

    const setDeadline = (value) => {
        setDatetime(value)
        onSetDeadline(value)
    }

    return (
        <Box marginTop={5} >
            <Typography variant="h5">Create a Task</Typography>
            {
                task == null ? (
                    <Grid marginTop={2} spacing={2} container justifyContent="center">
                        <Grid item xs={12} textAlign='center'>
                            <CircularProgress size={30} />
                        </Grid>
                        <Grid item xs={12} textAlign='center'>
                            <Typography marginBottom={2} variant="p" component='small'>Loading task...</Typography>
                        </Grid>
                    </Grid>
                ):(
                    <Grid marginTop={2} spacing={2} container justifyContent="center">
                        <Grid item xs={12} textAlign='center'>
                            <Box marginTop={2}>
                                <TextField
                                    id='task-name'
                                    required
                                    label="Name"
                                    fullWidth
                                    onChange={(e) => onSetName(e.target.value)}
                                    defaultValue={task.name}
                                    disabled={updating}
                                />
                            </Box>
                            <Box marginTop={2}>
                                <TextField
                                    id='task-description'
                                    required
                                    label="Description"
                                    fullWidth
                                    multiline
                                    minRows={3}
                                    maxRows={6}
                                    onChange={(e) => onSetDescription(e.target.value)}
                                    defaultValue={task.description}
                                    disabled={updating}
                                />
                            </Box>
                            <Box marginTop={2}>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DateTimePicker
                                    label="Deadline"
                                    value={datetime}
                                    onChange={setDeadline}
                                    renderInput={(params) => <TextField required fullWidth disabled={updating} {...params} />}
                                    />
                                </LocalizationProvider>
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid spacing={2} container justifyContent="right">
                                <Grid item>
                                    <Button variant="contained" color='secondary' onClick={() => { window.open("/tasks/" + task.listId, '_self') }}>
                                        View All Tasks
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Button disabled={updating} variant="contained" onClick={onClickSave}>
                                        {
                                            updating ? (
                                                <CircularProgress size={20} />
                                            ):'Save'
                                        }
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                )
            }
        </Box>
    )
}

export default EditTask