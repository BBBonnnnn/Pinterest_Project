import { createSlice,PayloadAction } from '@reduxjs/toolkit'
import { DispatchType } from '../configStore';
import axios from 'axios';
import { history } from '../..';
 export interface userRegister {
    email:string,
    password:string,

 }

const initialState: userRegister= {
    email:'',
    password:'',
}

const register = createSlice({
  name: "RegisterReducer",
  initialState,
  reducers: {
    registerAction:(state:userRegister,action:PayloadAction<userRegister>)=>{
        state=action.payload
    }
  }
});

export const {registerAction} = register.actions

export default register.reducer



export const registerActionApi = (values:userRegister) => {
  
    console.log('here1',values);
    return async (dispatch: DispatchType) => {
        let res = await axios.post('http://localhost:8080/api/users/register',values);
        if (res) {
            //Sau khi có kq từ api lưu vào localstorage và đưa reducer
            alert(res.data)

            //Tạo action đưa lên reducer
            const action: PayloadAction<userRegister> = registerAction(res.data);
            dispatch(action);
            history.push("/all-picture")
        }else{
            alert('đăng ký thất bại')
        }
    }
}