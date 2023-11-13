import { useFormik } from 'formik';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { checkCodeApi, updateNewPasswordApi } from '../fetchFromApi';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/configStore';
const UpdatePassword = () => {
    const {email} = useSelector((state:RootState)=>state.emailForgotPasswordReducer);
    const navigate = useNavigate();
    const frm:any = useFormik({
        initialValues: {
          newpassword: '',
        checkNewPassword:''
        },
        
        onSubmit: (values: any) => {
            let data = {email,values}
          updateNewPasswordApi(data).then(res=>{
            if(res == "Creat New password Success"){
                navigate('/login')
            }
            window.alert(res)
          }).catch(err=>{

          })
        } 
      })
  return (
    <div>
     <div className='card w-25 mx-auto'>
            <div className='card-header d-flex'>
                <div className='col-4'>
                <i className="fa fa-arrow-left" onClick={()=>{
                        navigate('/login')
                }}></i>
                </div>
                <div className='col-8'>
                Your code
                </div>
            </div>
            <div className='card-body'>
                <form action="" onSubmit={frm.handleSubmit}>
                    <div className='form-group'> 
                    <div className='form-group'>
                            <label htmlFor="newpassword">New Password</label><br />
                            <input onChange={frm.handleChange} onBlur={frm.handleBlur} type="text" id="newpassword" style={{borderRadius:"20px"}}  className='form-control' />
                        </div>
                        <div className='form-group mb-3'>
                            <label htmlFor="checknewpassword">Check New Password</label><br />
                            <input onChange={frm.handleChange} onBlur={frm.handleBlur} type="text" id="checknewpassword" style={{borderRadius:"20px"}}  className='form-control' />
                        </div>
                    <button className='form-control btn btn-danger' type='submit'>Continue</button>
                    </div>
                </form>
            </div>

        </div>

    </div>
  )
}

export default UpdatePassword