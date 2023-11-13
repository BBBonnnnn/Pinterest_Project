import React from 'react'
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux'
import { loginActionApi } from '../redux/reducers/loginReducer';
import { DispatchType } from '../redux/configStore';
import { NavLink } from 'react-router-dom';
export interface FormValue {
    email: string | null,
    password: string | null
  }
const Login = () => {
const dispatch:DispatchType =useDispatch();
    const frm = useFormik<FormValue>({
        initialValues: {
          email: '',
          password: ''
        },
        validationSchema: yup.object().shape({
          email: yup.string().required('Email can not be blank!').email('email is not valid!'),
          password: yup.string().required('password can not be blank!'),
        }),
        onSubmit: (values: any) => {
          const actionAsync = loginActionApi(values);
          dispatch(actionAsync);
        } 
      })

    return (
        <div className='container'>
            <div className='card w-50 mx-auto'>
                <div className='card-body'>
                    <div className='text-center '>
                        <img className="me-2 my-3" src={process.env.PUBLIC_URL + '/assets/images/pinterest.png'} alt='...' style={{ width: "5%" }}></img>
                        <h2>Welcome to Pinterest</h2>
                        <p className='mb-4'>Find new ideas to try</p>
                    </div>
                    <form action="" className='w-50 mx-auto' onSubmit={frm.handleSubmit}>
                        <div className='form-group'>
                            <label htmlFor="email">Email</label><br />
                            <input onChange={frm.handleChange} onBlur={frm.handleBlur} type="text" id="email" style={{borderRadius:"20px"}} placeholder='Email' className='form-control' />
                        </div>
                        <div className='form-group mb-1'>
                            <label htmlFor="password">Password</label><br />
                            <input onChange={frm.handleChange} onBlur={frm.handleBlur} type="password" id="password" style={{borderRadius:"20px"}} placeholder='Password' className='form-control' />
                        </div>
                        <NavLink className='mb-5' to={'/forgot-password'} >Forgot your password?</NavLink>
                        <button className='btn btn-danger form-control'>Login</button>
                        <p className='text-center'>OR</p>
                        <button className='btn btn-primary form-control'>Facebook</button>
                        <div className='text-center my-5' style={{ fontSize: "10px" }}>
                            <p className='m-0'>By continuing, you agree to Pinterest's</p>
                            <p className='m-0'><b>Terms of Service</b>and acknowledge you've read our</p>
                            <p className='m-0'><b>Privacy Policy.</b><b>Notice at collection</b></p>
                            <hr />
                            <p>Not on Pinterest yet? Sign up</p>
                            <p>Are you a business?Get started here!</p>
                        </div>
                    </form>

                </div>
            </div>


        </div>
    )
}

export default Login