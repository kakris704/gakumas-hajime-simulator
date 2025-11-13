import { Box, Divider, Menu, MenuItem, Paper, Select, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import SelectButton from './SelectButton'
import { useDispatch, useSelector } from 'react-redux';
import { setSchedule } from '../../redux/scheduleSlice';

const Container = () => {


	const dispatch = useDispatch(); // dispatchの宣言

	const [schedulePerWeek, setSchedulePerWeek] = useState<number[]>([

	]);
	// スケジュール
	const [scheduleData, setScheduleData] = useState([
		{ types: ["class"], week: 'normal', classType: '', cIncrease: 50 },
		{ types: ["class"], week: 'normal', classType: '', cIncrease: 50 },
		{ types: ["provide", "goOut"], week: "normal" },
		{ types: ["soudan", "goOut"], week: "normal" },
		{ types: ["vocal", "dance", "visual"], week: "normal", increase: [60, 90] },
		{ types: ["provide", "goOut", "soudan"], week: "normal" },
		{ types: ["vocal", "dance", "visual"], week: "oikomi", increase: [90, 180] },
		{ week: "test", types: [], increase: 20 },
		{ types: ["provide", "goOut", "soudan"], week: "normal" },
		{ types: ["class", "goOut"], week: 'normal', classType: '', cIncrease: 80 },
		{ types: ["vocal", "dance", "visual"], week: "normal", increase: [110, 170] },
		{ types: ["class", "goOut"], week: 'normal', classType: '', cIncrease: 110 },
		{ types: ["provide", "goOut"], week: "normal" },
		{ types: ["vocal", "dance", "visual"], week: "normal", increase: [120, 200] },
		{ types: ["vocal", "dance", "visual", "class"], week: "normal", increase: [150, 220], cIncrease: 110 },
		{ types: ["provide", "goOut", "soudan"], week: "normal" },
		{ types: ["vocal", "dance", "visual"], week: "oikomi", increase: [145, 310] },
		{ types: [], week: 'test', increase: 30 }
	]);

	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const menuIsOpen = Boolean(anchorEl);
	const handleClose = () => {
		setAnchorEl(null);
		setScheduleData((prev) => {
			const result = JSON.parse(JSON.stringify(prev));
			result[openMenuWeek].classType = 'vocal';
			return result;
		});
		dispatchSelectSchedule(openMenuWeek, 'class', 'vocal');
	}
	const [openMenuWeek, setOpenMenuWeek] = useState<number>(-1);

	// 授業メニュー選択ハンドラ
	const handleOpenMenu = (e: React.MouseEvent<HTMLElement>, skill: string) => {
		setAnchorEl(null);
		setScheduleData((prev) => {
			const result = JSON.parse(JSON.stringify(prev));
			result[openMenuWeek].classType = skill;
			return result;
		});
		dispatchSelectSchedule(openMenuWeek, 'class', skill);
	}

	useEffect(() => {
		// 試験の週だけデータ入れる
		scheduleData.forEach((elm, index) => {
			if (elm.week === 'test') {
				dispatch(setSchedule({ week: index, schedule: elm }));
			}
		});
	});

	const handleSelectButtonClick = (e: React.MouseEvent<HTMLDivElement>, group: number, index: number, type: string) => {
		// 所属グループの選択済みボタンを変更
		setSchedulePerWeek((prev) => {
			const result = [...prev];
			result[group] = index;
			return result;
		});
		// 授業が含まれるスケジュールの場合、classTypeを空白に
		if (scheduleData[group].classType) {
			setScheduleData((prev) => {
				const result = JSON.parse(JSON.stringify(prev));
				result[group].classType = '';
				return result;
			});
		}
		// 授業ボタンだった場合、メニューを表示
		if (type === 'class') {
			setAnchorEl(e.currentTarget);
			setOpenMenuWeek(group);
		}
		dispatchSelectSchedule(group, type);
	}

	// sliceにスケジュールを設定する関数
	const dispatchSelectSchedule = (week: number, type: string, classType: string | null = null) => {
		let dispSchedule = {};
		if (classType) {
			dispSchedule = {
				...scheduleData[week],
				selectType: type,
				classType: classType
			}
		} else {
			dispSchedule = {
				...scheduleData[week],
				selectType: type
			}
		}
		dispatch(setSchedule({ week: week, schedule: dispSchedule }));
	}



	return (
		<div className='schedules-wrapper'>
			<Paper elevation={3} sx={{ height: "100vh", width: "25vw", backgroundColor: "rgba(255,255,255,0.95)" }}>
				<div className='scheduleWrapper' style={{ padding: 25 }}>
					<Stack direction="column" spacing={2} divider={<Divider orientation="horizontal" flexItem></Divider>} sx={{marginBottom:6}}>
						{
							scheduleData.map((data, count) => {
								if (data.week !== 'test') {
									// 試験以外
									return (
										<div className='weekWrapper'>
											<WeekText week={count + 1} weekType={data.week} isFinal={false} />
											<Stack spacing={1} direction="row">
												{data.types.map((type: any, num) => (
													<SelectButton index={num} group={count} type={type} schedule={schedulePerWeek} classData={scheduleData[count].classType ?? ''} handleClick={handleSelectButtonClick} />
												))}
												{scheduleData[count].week !== "oikomi" && 
													<div style={{position:"absolute",right:5,height:'100%',display:"flex",alignItems:'center'}}><SelectButton index={scheduleData[count].types.length} group={count} type={'rest'} schedule={schedulePerWeek} classData={scheduleData[count].classType ?? ''} handleClick={handleSelectButtonClick} style={{position:'relative',width:40,height:40}}/></div>}
											</Stack>
										</div>
									);
								} else {
									// 試験
									return (
										<div className='weekWrapper' style={{ position: "relative", display: "flex", alignItems: "center" }}>
											<div style={{ height: 50, width: 50 }}></div>
											<div style={{ width: "110%", height: "70px", backgroundColor: "rgba(0,0,0,0.05)", position: "absolute", borderRadius: 5 }}></div>
											<Box sx={{ height: 25, width: 195, backgroundColor: "#fcb531", borderRadius: 2, opacity: 0.5, position: "absolute" }} />
											<WeekText week={count + 1} weekType={data.week} isFinal={scheduleData[count] === scheduleData.slice(-1)[0]} />
										</div>
									);
								}
							})
						}
					</Stack>
				</div>
			</Paper>
			<Menu
				id="class-menu"
				anchorEl={anchorEl}
				open={menuIsOpen}
				onClose={handleClose}
				anchorOrigin={{
					vertical: 'top',
					horizontal: 'right'
				}}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'left'
				}}
				sx={{ '.MuiMenu-paper': { boxShadow: "none", backgroundColor: "rgba(0,0,0,0)" } }}
			>
				<MenuItem onClick={(e) => handleOpenMenu(e, 'vocal')} sx={{ height: 22, backgroundColor: "#F79FC9", transition: ".2s ease", '&:hover': { backgroundColor: "#FFCBE4" }, borderTopLeftRadius: 5, borderTopRightRadius: 5 }}>Vo</MenuItem>
				<MenuItem onClick={(e) => handleOpenMenu(e, 'dance')} sx={{ height: 22, backgroundColor: "#79EAFB", transition: ".2s ease", '&:hover': { backgroundColor: "#9BF2FF" } }}>Da</MenuItem>
				<MenuItem onClick={(e) => handleOpenMenu(e, 'visual')} sx={{ height: 22, backgroundColor: "#FFD17B", transition: ".2s ease", '&:hover': { backgroundColor: "#FFDFA4" }, borderBottomLeftRadius: 5, borderBottomRightRadius: 5 }}>Vi</MenuItem>
			</Menu>
		</div>
	)
}

const WeekText = ({ week, weekType, isFinal }: { week: number, weekType: string, isFinal: boolean }) => {
	if (weekType !== 'test') {
		return (
			<>
				<div className='weekTextWrapper' style={{ position: "absolute", left: -20, display: "flex", userSelect: "none" }}>
					<Typography variant="h3">{weekType === 'oikomi' ? '追' : week}</Typography>
					<Typography variant="subtitle1" sx={{ mt: 3 }}>{weekType === 'oikomi' ? 'い込み' : '週目'}</Typography>
				</div>
			</>
		);
	} else {
		return (
			<>
				<div className='weekTextWrapper' style={{ position: "absolute", display: "flex", userSelect: "none", left: -20 }}>
					<Typography variant="h3">{week}</Typography>
					<Typography variant="subtitle1" sx={{ mt: 3 }}>週目</Typography>
				</div>
				<Typography variant="h3" style={{ position: "absolute" }}>{isFinal ? '最終' : '中間'}試験</Typography>
			</>
		);
	}
}

export default Container