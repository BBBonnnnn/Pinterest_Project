import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik';
import * as yup from 'yup';
import { forgotPasswordApi } from '../fetchFromApi';
import { useDispatch } from 'react-redux';
import { DispatchType } from '../redux/configStore';
import { checkEmailAction } from '../redux/reducers/emailForgotPasswordReducer';
// import { checkEmailAction } from '../redux/reducers/checkEmailPasswordReducer';
const ForgotPassword = () => {
    const navigate = useNavigate();
    const dispatch:DispatchType = useDispatch();
    const frm:any = useFormik({
        initialValues: {
          email: '',
        
        },
        validationSchema: yup.object().shape({
          email: yup.string().required('Email can not be blank!').email('email is not valid!')
        }),
        onSubmit: (values: any) => {
            // navigate('/enter-code')
            console.log('sdsd',values)
            forgotPasswordApi(values).then(res=>{
              const actionAsyns = checkEmailAction({
                email:values.email
            });
            dispatch(actionAsyns)
             alert(res)
             navigate('/enter-code')
            })
        } 
      })
  return (
    <div className='container'>
        <div className='card w-50 mx-auto'>
            <div className='card-header d-flex'>
                <div className='col-4'>
                <i className="fa fa-arrow-left" onClick={()=>{
                        navigate('/login')
                }}></i>
                </div>
                <div className='col-8'>
                Reset Password
                </div>
            </div>
            <div className='card-body'>
                <form action="" onSubmit={frm.handleSubmit}>
                    <div className='form-group'> 
                    <input type="text"  className='form-control my-3' id='email' placeholder='Your Email' onChange={frm.handleChange}/>
                    <p className='text-danger'>{frm.errors.email}</p>
                    <button className='form-control btn btn-danger' type='submit'>Continue</button>
                    </div>
                </form>
            </div>

        </div>
    </div>
  )
}

export default ForgotPassword