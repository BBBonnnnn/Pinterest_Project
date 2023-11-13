import { configureStore } from '@reduxjs/toolkit';
import registerReducer from './reducers/registerReducer';
import loginReducer from './reducers/loginReducer';
import keywordSearchReducer from './reducers/keywordSearchReducer';
import emailForgotPasswordReducer from './reducers/emailForgotPasswordReducer';



export const store = configureStore({
    reducer:{
        RegisterReducer:registerReducer,
        loginReducer:loginReducer,
        keywordSearchReducer:keywordSearchReducer,
        emailForgotPasswordReducer:emailForgotPasswordReducer
    }
})

export type RootState = ReturnType<typeof store.getState>

export type DispatchType= typeof store.dispatch