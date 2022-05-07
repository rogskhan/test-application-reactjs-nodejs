import React, { useState } from 'react'
import { TextField, Grid, Box, Button, Typography, CircularProgress } from '@mui/material'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers'
import { toast } from 'react-toastify'

import Helper from '../../utils/Helper'
import useCreateTaskViewModel from '../../viewmodels/task/CreateTaskViewModel'

function CreateTask() {
    const [datetime, setDatetime] = useState(Helper.addMinutes(new Date(), 60))
    const [loading, setLoading] = useState(false)

    const clean = () => {
        document.getElementById('task-name').value = ""
        document.getElementById('task-description').value = ""
    }

    const events = {
        onWaiting() {
            setLoading(true)
        },
        onSuccess() {
            toast.success("Task is successfully added!")
            setLoading(false)
            clean()
        },
        onError(error){
            toast.error(error)
            setLoading(false)
        }
    }

    const { getListId, onSetName, onSetDescription, onSetDeadline, onClickSave } = useCreateTaskViewModel(events)

    const setDeadline = (value) => {
        setDatetime(value)
        onSetDeadline(value)
    }

    return (
        <Box marginTop={5} >
            <Typography variant="h5">Create a Task</Typography>
            <Grid marginTop={2} spacing={2} container justifyContent="center">
                <Grid item xs={12} textAlign='center'>
                    <Box marginTop={2}>
                        <TextField
                            id='task-name'
                            required
                            label="Name"
                            fullWidth
                            onChange={(e) => onSetName(e.target.value)}
                            disabled={loading}
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
                            disabled={loading}
                        />
                    </Box>
                    <Box marginTop={2}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DateTimePicker
                            value={datetime}
                            label="Deadline"
                            onChange={setDeadline}
                            renderInput={(params) => <TextField required fullWidth disabled={loading} {...params} />}
                            />
                        </LocalizationProvider>
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <Grid spacing={2} container justifyContent="right">
                        <Grid item>
                            <Button variant="contained" color='secondary' onClick={() => { window.open("/tasks/" + getListId(), '_self') }}>
                                View All Tasks
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button disabled={loading} variant="contained" onClick={onClickSave}>
                                {
                                    loading ? (
                                        <CircularProgress size={20} />
                                    ):'Save'
                                }
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    )
}

export default CreateTask