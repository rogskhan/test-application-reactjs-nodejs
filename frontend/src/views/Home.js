import React from 'react'
import { Grid, Box, Button } from '@mui/material'

function Home() {
    return (
        <Box marginTop={10}>
            <Grid spacing={2} container justifyContent="center">
                <Grid item xs={12} textAlign='center'>
                    <Button onClick={() => {window.open('/create/list', '_self')}} variant="contained">Create List</Button>
                </Grid>
                <Grid item xs={12} textAlign='center'>
                    <Button onClick={() => {window.open('/lists', '_self')}} variant="contained">View Lists</Button>
                </Grid>
            </Grid>
        </Box>
    )
}

export default Home