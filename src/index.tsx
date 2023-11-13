import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux'
import { store } from './redux/configStore';
import { Routes, Route, unstable_HistoryRouter as HistoryRouter, BrowserRouter } from 'react-router-dom';
import Search from './pages/Search';
import { createBrowserHistory, BrowserHistory } from 'history';
import HeaderAndFooter from './templates/HeaderAndFooter';
import Detail from './pages/Detail';
import Register from './pages/Register';
import Login from './pages/Login';
import Manager from './pages/Manager';
import EditProfile from './pages/EditProfile';
import AddPicture from './pages/AddPicture';
import Home from './pages/Home';
import Created from './pages/Created';
import Saved from './pages/Saved';
import AllPicture from './pages/AllPicture';
import ForgotPassword from './pages/ForgotPassword';
import EnterCode from './pages/EnterCode';
import UpdatePassword from './pages/UpdatePassword';
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
export const history: BrowserHistory | any = createBrowserHistory();
root.render(
  <Provider store={store}>
    <HistoryRouter history={history}>
      <Routes>
        <Route index element={<Home />}></Route>
        <Route element={<HeaderAndFooter />}>
          <Route path='/all-picture' element={<AllPicture />}></Route>
          <Route path='/detail/:hinh_id/:duong_dan' element={<Detail />}></Route>
          <Route path='/search' element={<Search />}></Route>
          <Route path='/register' element={<Register />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/manager' element={<Manager />}>
          <Route path='/manager/created/:id' element={<Created />}></Route>
          <Route path='/manager/saved/:id' element={<Saved />}></Route>
          </Route>
          <Route path='/edit-profile' element={<EditProfile />}></Route>
          <Route path='/add-a-picture' element={<AddPicture />}></Route>
          <Route path='/forgot-password' element={<ForgotPassword />}></Route>
          <Route path='/enter-code' element={<EnterCode />}></Route>
          <Route path='/update-password' element={<UpdatePassword />}></Route>
        </Route>
      </Routes>
    </HistoryRouter>
  </Provider>

);

