import React, { useState } from 'react'
import { TextField, Grid, Box, Button, Typography, CircularProgress, Link } from '@mui/material'
import { toast } from 'react-toastify'

import useCreateListViewModel from '../../viewmodels/list/CreateListViewModel'

function CreateList() {

    const [loading, setLoading] = useState(false)
    const [id, setId] = useState(null)

    const events = {
        onWaiting() {
            setLoading(true)
        },
        onSuccess(id) {
            toast.success("List is successfully added!")
            setId(id)
            setLoading(false)
        },
        onError(error){
            toast.error(error)
            setId(null)
            setLoading(false)
        }
    }

    const { onSetName, onClickSave } = useCreateListViewModel(events)

    return (
        <Box marginTop={5} >
            <Typography variant="h5">Create a List</Typography>
            <Grid marginTop={2} spacing={2} container justifyContent="center">
                <Grid item xs={12} textAlign='center'>
                    <TextField
                        required
                        label="Name for your list"
                        fullWidth
                        onChange={(e) => onSetName(e.target.value)}
                        disabled={loading}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Grid spacing={2} container justifyContent="right">
                        <Grid item>
                            {
                                id != null ? (
                                    <Link href={"/list/" + id}>
                                    View recently added list
                                    </Link>
                                ):''
                            }
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

export default CreateList