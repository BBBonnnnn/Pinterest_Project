import { createSlice,PayloadAction } from '@reduxjs/toolkit'
import { DispatchType } from '../configStore';
import axios from 'axios';
import { history } from '../..';
 export interface userLogin {
    email:string

 }
const initialState: userLogin= {
    email:''
}
const EmailForgotPassword = createSlice({
  name: "emailForgotPasswordReducer",
  initialState,
  reducers: {
    checkEmailAction:(state:userLogin,action:PayloadAction<userLogin>)=>{
        state.email=action.payload.email
    }
  }
});

export const {checkEmailAction} = EmailForgotPassword.actions

export default EmailForgotPassword.reducer


