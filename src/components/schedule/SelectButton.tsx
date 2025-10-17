import { Box, Button, Typography } from '@mui/material'
import React, { MouseEventHandler } from 'react'

const SelectButton = ({index, group, type, schedule, classData, handleClick, style={}}:{index:number,group:number,type:'class'|'soudan'|'provide'|'goOut'|'vocal'|'dance'|'visual'|'rest',schedule:Array<number>,classData:any,handleClick:Function, style?:React.CSSProperties}) => {

    // typeで割り振り
    const types = {
        class: {text:"授業",color:"#aaaaff",variant:"h6",pos:[4, 16]},
        soudan: {text:"相談",color:"#7AE17C",variant:"h6",pos:[4, 16]},
        provide: {text:"活動支給",color:"#fcb531",variant:"h6",pos:[4,6]},
        goOut: {text:"お出かけ",color:"#23cfeb",variant:"h6",pos:[4,6]},
        vocal: {text:"Vo",color:"#f24b9d",variant:"h6",pos:[11,15]},
        dance: {text:"Da",color:"#23cfeb",variant:"h6",pos:[11,15]},
        visual: {text:"Vi",color:"#fcb531",variant:"h6",pos:[14,15]},
        rest: {text:"休",color:"#7AE17C",variant:"h6",pos:[9,12]}
    }
  
    return (
    <>
        <div onClick={(e) => handleClick(e, group, index, type)} className='buttonWrapper'>
            <Box
                sx={{height:style.height??50,width:style.width??50,backgroundColor:types[type].color,borderRadius:1,display:"flex",justifyContent:"center",alignItems:"center",position:'relative',"&:hover":{opacity:1},transition:'ease .1s',opacity:schedule[group] === index ? 1 : 0.5, ...style}}
            >
                {schedule[group] === index && <div style={{height:style.height?style.height as number + 2:52,width:style.width?style.width as number + 2:52,border:"solid black 2px",position:"absolute",borderRadius:5}}></div>}
                {type === 'class' && classData !== '' &&  <div style={{height:25,width:25,borderRadius:"50%",position:"absolute",right:-10,bottom:-10,backgroundColor:types[classData as 'vocal'|'dance'|'visual'].color,border:'solid 1px black',display:'flex',justifyContent:'center'}}>{classData==='vocal'?'Vo':classData==='dance'?'Da':'Vi'}</div>}
                <Typography variant='h6' sx={{userSelect:"none",lineHeight:1,position:'absolute',left:types[type].pos[0],top:types[type].pos[1]}}>
                    {types[type].text}
                </Typography>
            </Box>
        </div>
    </>
  )
}

export default SelectButton