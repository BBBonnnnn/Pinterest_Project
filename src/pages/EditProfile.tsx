import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik';
import { getProfileByIdApi, updateAvatarByIdApi, updateProfileByIdApi } from '../fetchFromApi';
const EditProfile = () => {
    const [userProfile, setUserProfile] = useState<any>({})
    const [reload, setReload] = useState<any>('')
    const frm = useFormik({
        initialValues: {
            firstname: '',
            surname: '',
            age: 0,
            country: ''
        },
        onSubmit: (values: any) => {
            let firstNameInput: any = document.querySelector('#firstname');
            values.firstname = firstNameInput.value;
            let surNameInput: any = document.querySelector('#surname');
            values.surname = surNameInput.value;
            let ageInput: any = document.querySelector('#age');
            values.age = +ageInput.value;

            updateProfileByIdApi(values).then(res => {
                window.alert(res)
            }).catch(err => {
                console.log(err)
            })
        }
    });
    const frm2 = useFormik({
        initialValues: {
            file: null,
            title: '',
        },
        onSubmit: async (values: any) => {
            const formData2 = new FormData();
            formData2.append('file', values.file);
            console.log('sdsd', formData2.get('file'))
            if (formData2.get('file') == 'null') {
                window.alert('Chọn hình avatar upload!!!')
                return
            }
            await updateAvatarByIdApi(formData2).then(res => {
                window.alert(res)
            }).catch(err => {
                console.log(err)
            })
            window.location.reload()
        }
    })
    useEffect(() => {
        getProfileByIdApi().then(res => {
            let firstNameInput: any = document.querySelector('#firstname');
            firstNameInput.value = res.ten;
            let surNameInput: any = document.querySelector('#surname');
            surNameInput.value = res.ho;
            let ageInput: any = document.querySelector('#age');
            ageInput.value = +res.tuoi;
            setUserProfile(res)
        }).catch(err => {
            console.log(err)
        })
    }, [])
    return (
        <div className='container  text-start'>
            <div className='w-50'>
                <h1>Edit profile</h1>
                <p>Keep your personal details private. Information you add here is visible to anyone who can view your profile.</p>
                <div>
                    <h3>Photo</h3>
                    <div className='d-flex'>
                        <form onSubmit={frm2.handleSubmit} className='row'>
                            <div className='col-6 text-center'>
                                <img className="me-2 my-3 " src={userProfile.anh_dai_dien} alt='...' style={{ width: "130px",height:'130px',borderRadius:'100px' }}></img>
                                <input className='d-block mx-auto' type="file" id="file" onChange={(event: any) => {
                                    frm2.setFieldValue('file', event.currentTarget.files[0]);
                                }} onBlur={frm2.handleBlur} />
                            </div>
                            <div className='col-6 my-auto'>
                                <button className='btn fw-medium' style={{backgroundColor:'#efefef',color:'#111111',borderRadius:'20px'}} type='submit' onClick={() => {

                                }}>Change</button>
                            </div>
                        </form>
                    </div>
                    <form action="" onSubmit={frm.handleSubmit}>
                        <div className='row'>
                            <div className='form-group col-6'>
                                <label htmlFor="firstname">First name</label><br />
                                <input type="text" id="firstname" style={{ borderRadius: "20px" }} placeholder='first name' className='form-control' onChange={frm.handleChange} onBlur={frm.handleBlur} />
                            </div>
                            <div className='form-group col-6'>
                                <label htmlFor="surname">Surname</label><br />
                                <input type="text" id="surname" style={{ borderRadius: "20px" }} placeholder='surname' className='form-control' onChange={frm.handleChange} onBlur={frm.handleBlur} />
                            </div>
                        </div>

                        <div className='form-group'>
                            <label htmlFor="about">About</label>
                            <textarea id="about" style={{ borderRadius: "20px", minHeight: "100px" }} placeholder='Tell your story' className='form-control' />
                        </div>
                        <div className='row'>
                            <div className='form-group col-6'>
                                <label htmlFor="age">Age</label><br />
                                <input type="text" id="age" style={{ borderRadius: "20px" }} placeholder='Age' className='form-control' onChange={frm.handleChange} onBlur={frm.handleBlur} />
                            </div>
                            <div className='form-group col-6'>
                                <label htmlFor="country">Country</label><br />
                                <input type="text" id="country" style={{ borderRadius: "20px" }} placeholder='Your country' className='form-control' onChange={frm.handleChange} onBlur={frm.handleBlur} />
                            </div>
                        </div>
                        <div className='form-group'>
                            <label htmlFor="surname">Username</label><br />
                            <input type="text" id="" style={{ borderRadius: "20px" }} placeholder='Add your a link to drive traffic to your site' className='form-control' />
                            <p>www.pinterest.com/truonghoangkhang</p>
                        </div>
                        <hr />
                        <div className='text-center'>
                            <button className='btn btn-primary mx-2' onClick={() => {
                                let firstNameInput: any = document.querySelector('#firstname');
                                firstNameInput.value = '';
                                let surNameInput: any = document.querySelector('#surname');
                                surNameInput.value = '';
                                let ageInput: any = document.querySelector('#age');
                                ageInput.value = 0;
                            }}>Reset</button>
                            <button className='btn btn-primary ' type='submit'>Save</button>
                        </div>

                    </form>
                </div>

            </div>

        </div>
    )
}

export default EditProfile