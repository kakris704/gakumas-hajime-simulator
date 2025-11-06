import { Paper, Typography } from '@mui/material'
import React, { useEffect, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { scheduleSlice, setSchedule } from '../../redux/scheduleSlice'
import calcParams from '../../utils/calcParams'
import Params from './Params'
import Result from './Result'

const Container = () => {

	const selectSchedule = useSelector((state: any) => state.schedule);
	const allSupport = useSelector((state:any) => state.support);

	// 配列が完全に満たされているかを判断する関数
	const isListFull = (array:Array<any>) => {
		if(array.length <= 0) {
			return false;
		} else {
			for(let i=0; i < array.length; i++) {
				if(array[i] === undefined) {
					return false;
				}
			}
			return true;
		}
	}

	// 授業の内容が確定しているかを判定する関数
	const isClassConfirm = (array:Array<any>) => {
		for(let i=0; i < array.length; i++) {
			if(array[i].classType !== undefined && array[i].classType === '' && array[i].selectType === 'class') {
				return false;
			}
		}
		return true;
	}

	const calcResult = useMemo(() => {
		if(isListFull(selectSchedule) && isClassConfirm(selectSchedule)) {
			return calcParams(allSupport, selectSchedule);
		} else {
			return {params:[0,0,0],supports:{}}
		}
	},[allSupport, selectSchedule]);
	
	return (
		<>
			<Paper sx={{ width: "50vw", display:"flex"}}>
				<div style={{margin:5, width:"100%"}}>
				{
					isListFull(selectSchedule) && isClassConfirm(selectSchedule) ?
					<Result params={calcResult.params}/> : <Result params={["-", "-", "-", "-"]}/>
				}
				
				</div>
			</Paper>
		</>
	)
}

export default Container

function dispatch(arg0: any) {
	throw new Error('Function not implemented.')
}
