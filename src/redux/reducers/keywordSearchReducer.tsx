import { createSlice,PayloadAction } from '@reduxjs/toolkit'
 export interface keywordSearch {
    keyword:string 
 }
const initialState: keywordSearch= {
    keyword:''
}

const register = createSlice({
  name: "keywordSearchReducer",
  initialState,
  reducers: {
    keywordSearchAction:(state:keywordSearch,action:PayloadAction<keywordSearch>)=>{
        state.keyword=action.payload.keyword
    }
  }
});

export const {keywordSearchAction} = register.actions

export default register.reducer



