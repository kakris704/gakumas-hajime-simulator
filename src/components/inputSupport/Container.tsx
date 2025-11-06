import { Paper, Stack, TextField, Typography } from '@mui/material'
import React from 'react'
import InputArea from './InputArea'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { setSupport } from '../../redux/supportSlice'
import Grid from '@mui/material/Grid2'


const Container = () => {
  // styleの用意
  const sizeStyle = {
    xs: 12, sm: 12, md: 6, lg: 6, xl: 4
  }

  return (
    <Paper elevation={3} sx={{  width: "50vw", backgroundColor: "rgba(255,255,255,0.95)" }}>
      <div style={{ padding: 35, paddingTop: 20 }}>
        <Typography variant='h4' sx={{ fontWeight: 600 }}>一般</Typography>
        <Grid container spacing={0} rowSpacing={3} sx={{ mt: 1 }}>
          <Grid size={sizeStyle}><InputArea text="初期ステータス" action="baseParams"></InputArea></Grid>
          <Grid size={sizeStyle}><InputArea text="レッスンボーナス(%)" action="lessonBonus"></InputArea></Grid>
          <Grid size={sizeStyle}><InputArea text="上限増加" action="limitIncrease"></InputArea></Grid>
          <Grid size={sizeStyle}><InputArea text="レッスン終了時" action="lesson"></InputArea></Grid>
          <Grid size={sizeStyle}><InputArea text="SPレッスン終了時" action="spLesson"></InputArea></Grid>
          <Grid size={sizeStyle}><InputArea text="休む選択時" action="selectRest"></InputArea></Grid>
          <Grid size={sizeStyle}><InputArea text="活動支給選択時" action="selectProvide"></InputArea></Grid>
          <Grid size={sizeStyle}><InputArea text="お出かけ終了時" action="selectGoOut"></InputArea></Grid>
          <Grid size={sizeStyle}><InputArea text="相談選択時" action="selectSoudan"></InputArea></Grid>
          <Grid size={sizeStyle}><InputArea text="授業終了時" action="selectClass"></InputArea></Grid>
          <Grid size={sizeStyle}><InputArea text="ドリンク交換時" action="getDrink"></InputArea></Grid>
          <Grid size={sizeStyle}><InputArea text="試験終了時(1回)" action="endTest"></InputArea></Grid>
        </Grid>
        <Typography variant='h4' sx={{ fontWeight: 600, mt: 4 }}>スキルカード系</Typography>
        <Grid container spacing={0} rowSpacing={3} sx={{ mt: 1 }}>
          <Grid size={sizeStyle}><InputArea text="カード獲得時" action="getSkill"></InputArea></Grid>
          <Grid size={sizeStyle}><InputArea text="Mカード獲得時" action="getMSkill"></InputArea></Grid>
          <Grid size={sizeStyle}><InputArea text="Aカード獲得時" action="getASkill"></InputArea></Grid>
          <Grid size={sizeStyle}><InputArea text="カード強化時" action="skillUpgrade"></InputArea></Grid>
          <Grid size={sizeStyle}><InputArea text="Mカード強化時" action="mSkillUpgrade"></InputArea></Grid>
        </Grid>
      </div>
    </Paper>
  )
}

export default Container