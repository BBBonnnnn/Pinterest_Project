import React from 'react'
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux'
import { registerActionApi } from '../redux/reducers/registerReducer';
import { DispatchType } from '../redux/configStore';

export interface FormValue {
    email: string | null,
    password: string | null,
    firstname: string | null,
    surname: string | null,
    age: number | null,
    avatar:string | null,
}

const Register = () => {
    const dispatch: DispatchType = useDispatch();
    const frm = useFormik<FormValue>({
        initialValues: {
            email: '',
            password: '',
            firstname:'',
            surname:'',
            age:0,
            avatar:''
        },
        validationSchema: yup.object().shape({
            email: yup.string().required('Email can not be blank!').email('email is not valid!'),
            password: yup.string().required('password can not be blank!'),
        }),
        onSubmit: (values: any) => {
            console.log('2222', values)
            const actionAsync = registerActionApi(values);
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
                            <input onChange={frm.handleChange} onBlur={frm.handleBlur} type="text" id="email" style={{ borderRadius: "20px" }} placeholder='Email' className='form-control' />
                            <p className='text-danger text-center'>{frm.errors.email}</p>
                        </div>
                        <div className='form-group'>
                            <label htmlFor="password">Password</label><br />
                            <input onChange={frm.handleChange} onBlur={frm.handleBlur} type="password" id="password" style={{ borderRadius: "20px" }} placeholder='Create a password' className='form-control' />
                            <p className='text-danger text-center'>{frm.errors.password}</p>
                        </div>
                        <div className='row'>
                            <div className='form-group col-6'>
                                <label htmlFor="firstname">Firstname</label><br />
                                <input onChange={frm.handleChange} onBlur={frm.handleBlur} type="text" id="firstname" style={{ borderRadius: "20px" }} placeholder='firstname' className='form-control' />
                            </div>
                            <div className='form-group col-6'>
                                <label htmlFor="surname">Surname</label><br />
                                <input onChange={frm.handleChange} onBlur={frm.handleBlur} type="text" id="surname" style={{ borderRadius: "20px" }} placeholder='surname' className='form-control' />
                            </div>
                        </div>
                        <div className='row'>
                            <div className='form-group col-6'>
                                <label htmlFor="age">Age</label><br />
                                <input onChange={frm.handleChange} onBlur={frm.handleBlur} type="text" id="age" style={{ borderRadius: "20px" }} placeholder='age' className='form-control' />
                            </div>
                          
                        </div>
                        <button className='btn btn-danger form-control mt-5'>Continue</button>
                        <p className='text-center'>OR</p>
                        <button className='btn btn-primary form-control'>Facebook</button>
                        <div className='text-center my-5' style={{ fontSize: "10px" }}>
                            <p>
                                By continuing, you agree to Pinterest's <b>Terms of Service</b>; Opens a new tab and acknowledge you've read our <b>Privacy Policy</b>; Opens a new tab.<b>Notice at collection</b> ; Opens a new tab.

                            </p>
                            <br />
                            <p>
                                Already a member? <b>Log in</b>
                            </p>
                        </div>
                    </form>

                </div>
                <div className='card-footer'>
                    <h5 className='text-center p-3'>
                        Create a free business account
                    </h5>
                </div>
            </div>


        </div>
    )
}

export default Register