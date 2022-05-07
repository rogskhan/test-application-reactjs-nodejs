import { React } from 'react'
import { Box, Grid } from '@mui/material'
import { blue } from '@mui/material/colors'

const Footer = () => {
  return (
    <Grid bgcolor={blue[300]} container justifyContent="center" position='fixed' left={0} bottom={0} padding={2}>
      <Box textAlign='center' fontWeight='bold' color='#fff' width='100%'>
        © 2022 - [App Name]
      </Box>
    </Grid>
  )
}

export default Footer