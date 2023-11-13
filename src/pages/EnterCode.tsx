import { useFormik } from 'formik';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { checkCodeApi } from '../fetchFromApi';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/configStore';
const EnterCode = () => {
    const {email} = useSelector((state:RootState)=>state.emailForgotPasswordReducer);
    const navigate = useNavigate();
    const frm:any = useFormik({
        initialValues: {
          code: '',
        
        },
       
        onSubmit: (values: any) => {
            let data = {
                values,
                email
            }
            checkCodeApi(data).then(res=>{
                console.log(res);
                if(res == "Success"){
                navigate('/update-password')
                }else if (res == "Fail"){
                    window.alert("Code không đúng !!!")
                }
            }).catch(err=>{
                console.log(err)
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
                    <input type="text"  className='form-control my-3' id='code' placeholder='Your Code' onChange={frm.handleChange}/>
                    <button className='form-control btn btn-danger' type='submit'>Continue</button>
                    </div>
                </form>
            </div>

        </div>

    </div>
  )
}

export default EnterCode