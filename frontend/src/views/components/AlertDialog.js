import React, { useState, useEffect } from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'

function AlertDialog({ title, message, noTitle, yesTitle, openHandler, clickNoAction = null, clickYesAction = null}) {

  const [open, setOpen] = useState(false)
  const [ref, setRef] = useState(null)

  useEffect(() => {
    openHandler.current = handleOpen
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleOpen = (data) => {
    setRef(data)
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleNoAction = () => {
    handleClose()
    if (clickNoAction != null) {
      clickNoAction(ref)
    }
  }

  const handleYesAction = () => {
    handleClose()
    if (clickYesAction != null) {
      clickYesAction(ref)
    }
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
      { title }
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
        { message }
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color='error' onClick={handleNoAction}>{ noTitle }</Button>
        <Button onClick={handleYesAction} autoFocus>{ yesTitle }</Button>
      </DialogActions>
    </Dialog>
  )
}

export default AlertDialog