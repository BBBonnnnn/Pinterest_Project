import React, { useEffect, useState, useRef } from "react";
import { getImageApi, getImagesbySearchNameApi } from '../fetchFromApi'
import { NavLink, useNavigate } from 'react-router-dom'
import styles from '../styles/pages/AllPicture.module.scss'
const AllPicture = () => {
    const navigate =useNavigate();
    const [image, setImage] = useState([]);
    const [loading, setLoading] = useState("block");
    useEffect(() => {
        if( localStorage.getItem('USER_LOGIN')){
            getImageApi().then(res => {
                setLoading("block");
                setImage(res)
            }).catch(err => {
                console.log(err)
            }).finally(()=>{
                setLoading("none");
            }     
            )
        }else{
         alert('bạn cần đăng nhập!!')
        navigate('/login')
        }
    }, []);
    return <div  className="container-fluid">
        <div className={`${styles.container} `}>
            {image.map((item: any, index) => {
                return <NavLink className={`${styles.box}`} key={index} to={`/detail/${item.hinh_id}/${item.duong_dan}`}>
                    <img src={`https://drive.google.com/uc?id=${item.duong_dan}`} alt=""  className={`${styles.img}`} />
                </NavLink>
            })}
        <p style={{fontSize:'50px',display:`${loading}`}}>Loading...</p>;
        </div>

    </div>
}
export default AllPicture