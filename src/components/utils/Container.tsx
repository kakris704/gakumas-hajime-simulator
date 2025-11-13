import { Button, Paper } from '@mui/material'
import React from 'react'
import Random from './Random'

const Container = () => {
  return (
    <Paper elevation={3} sx={{ height: "auto", width: "50vw", backgroundColor: "rgba(255,255,255,0.95)" }}>
      <div className='utilities-wrapper' style={{margin:20}}>
        <Random />
      </div>
    </Paper>
  )
}

export default Container