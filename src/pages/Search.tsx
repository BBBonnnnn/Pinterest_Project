import React, { useEffect, useState, useRef } from "react";
import { getImageApi, getImagesbySearchNameApi } from '../fetchFromApi'
import { NavLink, useNavigate } from 'react-router-dom'
import { useSelector } from "react-redux";
import styles from '../styles/pages/AllPicture.module.scss'
const Home = () => {
    const navigate = useNavigate();
    const [image, setImage] = useState([]);
    const keyWordSearch = useSelector((state:any)=> state.keywordSearchReducer);
    useEffect(() => {
        if( localStorage.getItem('USER_LOGIN')){
            getImagesbySearchNameApi(keyWordSearch.keyword).then(res=>{
                console.log('ssss',res)
                setImage(res)
            }).catch(err=>{
                console.log(err)
            })
        }else{
            alert('You need login !!!')
            navigate('/login')
        }
           
    }, [keyWordSearch]);
   

    
    return <div className="container-fluid">
        <div className={`${styles.container}`}>
            {image?.map((item: any, index) => {
                return <NavLink className={`${styles.box}`} key={index} to={`/detail/${item.hinh_id}/${item.duong_dan}`}>
                    <img src={`https://drive.google.com/uc?id=${item.duong_dan}`} alt="" className={`${styles.img}`}  />
                </NavLink>
            })}

        </div>

    </div>
}

export default Home