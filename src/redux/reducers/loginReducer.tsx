import { createSlice,PayloadAction } from '@reduxjs/toolkit'
import { DispatchType } from '../configStore';
import axios from 'axios';
import { history } from '../..';
 export interface userLogin {
    userId:number

 }
const initialState: userLogin= {
    userId:0
}
const register = createSlice({
  name: "loginReducer",
  initialState,
  reducers: {
    loginAction:(state:userLogin,action:PayloadAction<userLogin>)=>{
        state.userId=action.payload.userId
    }
  }
});

export const {loginAction} = register.actions

export default register.reducer

export const loginActionApi = (values:any) => {
    return async (dispatch: DispatchType) => {
        let res:any = await axios.post('http://localhost:8080/api/users/login',values);
        if (res) {
           if(res.data == "password incorrect!!!" ||res.data == "email incorrect!!!" ){
                alert(res.data)
                return
           }
            localStorage.setItem("USER_LOGIN",res.data.token)
            //Tạo action đưa lên reducer
            console.log('222222',res.data)
            const action: PayloadAction<userLogin> = loginAction(res.data);
            dispatch(action);
            history.push("/all-picture")
        }
    }
}