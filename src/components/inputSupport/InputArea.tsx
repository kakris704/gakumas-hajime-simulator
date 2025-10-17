import { Stack, Typography } from '@mui/material'
import React from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { setSupport } from '../../redux/supportSlice'

const InputArea = ({ text, action }: { text: string, action: string }) => {

  const dispatch = useDispatch(); // dispatchの宣言

  // styleの用意
  const inputStyle = {
    width: 50,
    height: 25,
    fontSize: 22,
    border: "none",
    borderRadius: 0,
    color: "black"
  }

  const support = useSelector((state: any) => state.support); // storeからサポカ情報を代入

  // input更新時
  const onChange = (status: number, value: number, action: string) => {
    // storeからコピー read onlyをはずす
    let result = {
      ...support,
      [action]: [...support[action]]
    };
    result[action][status] = value; // オブジェクトのactionプロパティ、配列status番に代入
    dispatch(setSupport(result));
  }

  // limitIncreaseの場合のみ
  const onChangel = (value: number) => {
    let result = {
      ...support,
      limitIncrease: value
    }
    dispatch(setSupport(result));
  }

  if(action!=='limitIncrease') {
  return (
    <>
      <Stack direction="column" sx={{ width: 260 }}>
        <Typography variant="h5">〇{text}</Typography>
        <div className='inputWrapper' style={{ borderRadius: 5, overflow: "hidden", width: 162, border: "solid 1px black", margin: "auto" }}>
          <input type="number" className='supportInput'
            style={{
              ...inputStyle,
              backgroundColor: "#F79FC9",
              textAlign: "center",
            }}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(0, Number(e.target.value), action)}
            max={999}
            placeholder='0'
          ></input>
          <input type="number" className='supportInput'
            style={{
              ...inputStyle,
              backgroundColor: "#79EAFB",
              textAlign: "center"
            }}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(1, Number(e.target.value), action)}
            max={999}
            placeholder='0'
          ></input>
          <input type="number" className='supportInput'
            style={{
              ...inputStyle,
              backgroundColor: "#FFD17B",
              textAlign: "center"
            }}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(2, Number(e.target.value), action)}
            max={999}
            placeholder='0'
          ></input>
        </div>
      </Stack>
    </>
    
  )   
  } else {
    return (
      <>
      <Stack direction="column" sx={{ width: 260 }}>
        <Typography variant="h5">〇{text}</Typography>
        <div className='inputWrapper' style={{ borderRadius: 5, overflow: "hidden", width: 162, border: "solid 1px black", margin: "auto", textAlign:"center" }}>
          <input type="number" className='supportInput'
            style={{
              ...inputStyle,
              backgroundColor: "white",
              textAlign: "center",
              width:"100%"
            }}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChangel(Number(e.target.value))}
            max={999}
            placeholder='0'
          ></input>
        </div>
      </Stack>
      </>
    )
  }
}

export default InputArea