import React from 'react'
import Params from './Params'
import { Typography } from '@mui/material'

const Result = ({params}:{
  params: Array<any>
}) => {
  return (
    <div style={{display:"flex",flexDirection:"column",justifyContent:"center", width:"100%"}}>
      <Typography variant="h4" sx={{alignItems:"start", fontWeight:600, margin:3}}>プロデュース結果</Typography>
      <div style={{alignItems:"center", width:"100%",display:"flex",justifyContent:"center",marginBottom:"2rem"}}>
        <Params params={params}/>
      </div>
    </div>
  )
}

export default Result