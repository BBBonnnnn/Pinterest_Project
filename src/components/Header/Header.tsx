import React, { useState } from 'react'
import { SearchOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import styles from '../../styles/components/Header.module.scss'
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { DispatchType } from '../../redux/configStore';
import { keywordSearchAction } from '../../redux/reducers/keywordSearchReducer';
import { useSelector } from 'react-redux';
const Header = () => {
    const userInfo = useSelector((state:any)=>state.loginReducer)
    const [searchValue, setSearchValue] = useState('');
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch:DispatchType = useDispatch();
    return (
        <div className=''>
            <div className=' m-3 d-flex align-items-center'>
                <img className="me-2" src={process.env.PUBLIC_URL + '/assets/images/pinterest.png'} alt='...' style={{ width: "3%", cursor: 'pointer' }} onClick={() => {
                    navigate('/all-picture')
                }}></img>
                <NavLink to="/all-picture"  className={location.pathname === '/all-picture' ? styles.homebtn : 'text-dark text-decoration-none fw-medium mx-2'}>
                    Home
                </NavLink>
                <NavLink to="/add-a-picture"  className={location.pathname === '/add-a-picture' ? styles.homebtn : 'text-dark text-decoration-none fw-medium mx-2'}>
                    Create
                </NavLink>
                <form action="" className='d-flex w-75' style={{position:'relative'}} onSubmit={(e)=>{
                    e.preventDefault();
                    const actionAsyns = keywordSearchAction({
                        keyword:searchValue
                    });
                    dispatch(actionAsyns)
                   let inputSearch:any =  document.querySelector('#inputSeacrh');
                   inputSearch.value = '';
                    navigate('/search') 
                }}>
                    <input id='inputSeacrh' placeholder={`Search`} className={`${styles.input} p-2 mx-2 w-100`} style={{border:'0'}} onChange={(e) => {
                        setSearchValue(e.target.value)
                    }}/> 
                    <button style={{border:'none',position:'absolute',right:'17px',top:'8px',backgroundColor:'#e9e9e9'}}><i className="fa fa-search"></i></button>
                </form>
                <img className={`${styles.bell} mx-2 p-2`} src={process.env.PUBLIC_URL + '/assets/images/bell.png'} alt='...' style={{ width: "2.5%" }}></img>
                <img className={`${styles.bell} mx-2 p-2`} src={process.env.PUBLIC_URL + '/assets/images/chat.png'} alt='...' style={{ width: "2.5%" }}></img>

                <img className={`${styles.bell} mx-2 p-2`} src={process.env.PUBLIC_URL + '/assets/images/user.png'} alt='...' style={{ width: "2.5%" }} onClick={() => {
                     navigate(`/manager/created/${userInfo.userId}`)
                }}></img>
                <div className="dropdown mx-2">
                    <a className=" dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false" style={{ textDecoration: "none" }}>
                        Log Out
                    </a>
                    <ul className="dropdown-menu">
                        <NavLink to='/'><a className="dropdown-item text-center" href="#" onClick={()=>{
                            localStorage.removeItem('USER_LOGIN');
                            
                        }}>Log Out</a></NavLink>
                        <NavLink to='/edit-profile'><a className="dropdown-item text-center" href="#">Setting</a></NavLink>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Header