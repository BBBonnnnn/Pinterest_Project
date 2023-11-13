import React, { useEffect, useState } from 'react'
import { getCreatedByIdApi } from '../fetchFromApi'
import { Outlet, useNavigate,useLocation,NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';


const Manager = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const userInfo = useSelector((state:any)=>state.loginReducer)
    console.log('sdsd',userInfo)
    return (
        <div className='container'>
            <div className='text-center'>
                <img className="me-2 my-3" src={process.env.PUBLIC_URL + '/assets/images/pinterest.png'} alt='...' style={{ width: "15%" }}></img>
                <p>TruongHoangKhang</p>
                <p>@truonghoangkhang</p>
                <p>1 following</p>
                <button className='btn btn-danger mx-2'>Share</button>
                <button className='btn btn-primary' onClick={()=>{
                     navigate('/edit-profile')
                }}>Edit profile</button>
            </div>
            <div className='my-5 text-center'>
                <button  className={location.pathname === `/manager/created/${userInfo.userId}` ? ' btn btn-danger mx-2': 'btn border mx-2'} onClick={()=>{
                    
                    navigate(`/manager/created/${userInfo.userId}`)
                }}>Created</button>
                <button className={location.pathname === `/manager/saved/${userInfo.userId}` ? ' btn btn-danger mx-2': 'btn border mx-2'} onClick={()=>{
                    
                    navigate(`/manager/saved/${userInfo.userId}`)
                }}>Saved</button>
            </div>
            <div className='content' >
               <Outlet></Outlet>
            </div>
        </div>
    )
}

export default Manager