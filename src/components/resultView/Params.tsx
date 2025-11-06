import { Typography } from '@mui/material'
import React from 'react'

const Params = ({params}:{
  params: Array<any>
}) => {
  return (
    <div style={{display:"flex", borderRadius:10, overflow:"hidden"}}>
    <div style={{width:"600px",height:"4rem", display:'flex'}}>
        <div style={{flex:1,height:"100%",borderBottom:"2px solid #f24b9d",display:"flex",alignItems:"end",justifyContent:"center",backgroundColor:"#FFE1F0", position:"relative"}}>
            <Typography variant="h6" sx={{fontWeight:"bold",position:"absolute", left:5, bottom:4,color:"#F79FC9"}}>Vo.</Typography>
            <Typography variant="h3" sx={{color:"#f24b9d"}}>{params[0]}</Typography>
        </div>
        <div style={{flex:1,height:"100%",borderBottom:"2px solid #23cfeb",display:"flex",alignItems:"end",justifyContent:"center",backgroundColor:"#E0FBFF", position:"relative"}}>
            <Typography variant="h6" sx={{fontWeight:"bold",position:"absolute", left:5, bottom:4,color:"#79EAFB"}}>Da.</Typography>
            <Typography variant="h3" sx={{color:"#23cfeb"}}>{params[1]}</Typography>
        </div>
        <div style={{flex:1,height:"100%",borderBottom:"2px solid #fcb531",display:"flex",alignItems:"end",justifyContent:"center",backgroundColor:"#FFF6E4", position:"relative"}}>
            <Typography variant="h6" sx={{fontWeight:"bold",position:"absolute", left:5, bottom:4,color:"#FFD17B"}}>Vi.</Typography>
            <Typography variant="h3" sx={{color:"#fcb531"}}>{params[2]}</Typography>
        </div>
        
    </div>
      <div style={{height:"4rem",borderBottom:"2px solid rgba(0,0,0,0.4)",display:"flex",alignItems:"end",justifyContent:"center",backgroundColor:"rgba(0,0,0,0.02)", position:"relative",width:"14rem"}}>
            <Typography variant="h6" sx={{fontWeight:"bold", left:5, bottom:4,color:"rgba(0,0,0,0.4)",position:"absolute"}}>Total</Typography>
            <Typography variant="h3" sx={{color:"rgba(0,0,0,0.6)",position:"absolute",right:"2.2rem"}}>{typeof params[0] === 'number' ? (params as number[]).reduce((a:number, c:number) => a + c, 0) : '-'}</Typography>
        </div>
    </div>
  )
}

export default Params