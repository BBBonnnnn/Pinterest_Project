import React, { useEffect, useState, useRef } from "react";
import { getImageApi } from '../fetchFromApi'
import { NavLink, useNavigate } from 'react-router-dom'
import styles from '../styles/pages/Home.module.scss'
const Home = () => {
    const [image, setImage] = useState([]);
    const navigate =useNavigate()
    const myElementRef = useRef(null)
    useEffect(() => {
        getImageApi().then(res => {
            setImage(res)
        }).catch(err => {
            console.log(err)
        })
    }, []);

    return <div className='container-fluid '>
        <div className={`${styles.header} d-flex p-3 justify-content-between`}>
            <div className={`${styles.logo} logo d-flex align-items-center`}>
                <img className="me-2" src={process.env.PUBLIC_URL + '/assets/images/pinterest.png'} alt='...' style={{ width: "6%" }}></img>
                <h5 className='m-0'>Pinterest</h5>
            </div>
            <div className={`${styles.menu} d-flex align-items-center`} >
                <p className="my-0 mx-2 p-2 fw-medium">About</p>
                <p className="my-0 mx-2 p-2 fw-medium">Business</p>
                <p className="my-0 mx-2 p-2 fw-medium">Blog</p>
                <p className={`${styles.login} login my-0 mx-2 p-2 fw-medium`} onClick={()=>{
                    navigate('/login')
                }}>Login</p>
                <p className={`${styles.signup} my-0 mx-2 p-2 fw-medium`} onClick={()=>{
                    navigate('/register')
                }}>Sign up</p>
            </div>
        </div>
        <div className="carousel">

        </div>
        <div className={`${styles.dinner} dinner row `}>
            <div className={`${styles.left} col-6  flex-column`}>
                <img className={`${styles.image1}  me-2`} src={process.env.PUBLIC_URL + '/assets/images/chickendinner.png'} alt='...' style={{ width: "45%" }}></img>
                <img className={`${styles.image2}  me-2`} src={process.env.PUBLIC_URL + '/assets/images/chickendinner2.png'} alt='...' style={{ width: "30%" }}></img>
                <img className={`${styles.image3}  me-2`} src={process.env.PUBLIC_URL + '/assets/images/chickendinner3.png'} alt='...' style={{ width: "30%" }}></img>
                <img className={`${styles.image4}  me-2`} src={process.env.PUBLIC_URL + '/assets/images/chickendinner4.png'} alt='...' style={{ width: "30%" }}></img>
            </div>
            <div className={`${styles.right} col-6 flex-column`}>
                <h1>Search for an idea</h1>
                <p className="">What do you want to try next? Think of something you’re into—like “easy chicken dinner”—and see what you find.</p>
                <button>Explore</button>
            </div>
        </div>
        <div className={`${styles.saveideas} row`}>
            <div className={`${styles.left} col-6  flex-column`}>
                <h1>Save ideas you like</h1>
                <p>Collect your favorites so you can get back to them later.</p>
                <button>Explore</button>
            </div>
            <div className={`${styles.right} col-6  flex-column`}>
                <img className={`${styles.image1}  me-2`} src={process.env.PUBLIC_URL + '/assets/images/saveideas1.png'} alt='...' style={{ width: "30%" }}></img>
                <img className={`${styles.image2}  me-2`} src={process.env.PUBLIC_URL + '/assets/images/saveideas2.png'} alt='...' style={{ width: "50%" }}></img>
                <img className={`${styles.image3}  me-2`} src={process.env.PUBLIC_URL + '/assets/images/saveideas3.png'} alt='...' style={{ width: "40%" }}></img>
            </div>
        </div>
        <div className={`${styles.seeit} row`}>
            <div className={`${styles.left} col-6  flex-column`}>
                <img className={`${styles.image1}`} src={process.env.PUBLIC_URL + '/assets/images/saveit1.png'} alt='...' style={{ width: "100%" }}></img>
                <img className={`${styles.image2}`} src={process.env.PUBLIC_URL + '/assets/images/saveit2.png'} alt='...' style={{ width: "25%" }}></img>
                <img className={`${styles.image3}`} src={process.env.PUBLIC_URL + '/assets/images/saveit3.png'} alt='...' style={{ width: "12%" }}></img>

            </div>
            <div className={`${styles.right} col-6  flex-column`}>
                <h1>See it, make it, try it, do it</h1>
                <p >The best part of Pinterest is discovering new things and ideas from people around the world.</p>
                <button>Explore</button>
            </div>
        </div>
        <div className={styles.foods}>
            <h1>Sign up to get your ideas</h1>

        </div>
        <footer>
            <div className={styles.footer}>
                <p>Terms of Service</p>
                <p>Privacy Policy</p>
                <p>Help</p>
                <p>Iphone App</p>
                <p>Android App</p>
                <p>Users</p>
                <p>Collections</p>
                <p>Shopping</p>
                <p>Today</p>
                <p>Explore</p>
                <p>Watch</p>
                <p>Shop</p>
            </div>
        </footer>
    </div>
}

export default Home