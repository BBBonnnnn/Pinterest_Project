import React, { useState } from 'react'
import { useFormik } from 'formik';
import * as yup from 'yup';
import { addPictureApi } from '../fetchFromApi';
import { history } from '../index';
import multer, { diskStorage } from 'multer';
import styles from '../styles/pages/AddPicture.module.scss'
export interface FormValue {
        file:File | null ,
        title:string,
        description:string,
  }

//   const upload = multer({
//     storage: diskStorage({
//         destination: process.cwd() + "/public/images",
//         filename: (req, file, callback) => {
//             callback(null, new Date().getTime() + "_" + file.originalname)
//         }
//     })
// });
const AddPicture = () => {
   
    const frm = useFormik<FormValue>({
        initialValues: {
                file:null,
                title:'',
                description:'',
        },
        validationSchema: yup.object().shape({
        title: yup.string().required('title can not be blank!'),
        description: yup.string().required('description can not be blank!'),
        }),
        onSubmit: async (values: any) => {
            const formData = new FormData();
            formData.append('file', values.file);
            formData.append('title', values.title);
            formData.append('description',values.description);
            console.log(formData.get('file'))
           await addPictureApi(formData).then(res=>{
            alert('tạo ảnh thành công!!!');
            console.log(res);
                history.push("/all-picture")
           }).catch(err=>{
            console.log(err)
           });
        }
      })
    return (
        <div className='container'>
            <div className='card w-75 mx-auto' style={{ borderRadius: "25px" }} >
                <form action="" onSubmit={frm.handleSubmit}>
                    <div className='card-header d-flex justify-content-between'>
                        <h3>Create Pin</h3>
                        <button className='btn btn-danger '>Publish</button>
                    </div>
                    <div className='card-body row' style={{height:'500px'}}>
                        <div className='col-6 text-center my-auto'>
                            <input className={styles.inputfile} type="file" id="uploadfile"  onChange={(event:any)=>{
                              
                               let x=  frm.setFieldValue('file',event.currentTarget.files[0]);
                                x.then(res=>{
                                    console.log('abcd',res)
                                }).catch()
                               
                            }} onBlur={frm.handleBlur} />
                            <label htmlFor="uploadfile" className={styles.uploadtext}><i className="fa fa-upload"></i>Upload file</label>
                        </div>
                        <div className='col-6'>
                        <div className='form-group'>
                            <label htmlFor="title">Title</label><br />
                            <input  type="text" id="title" style={{borderRadius:"10px"}} placeholder='Add a title' className='form-control' onChange={frm.handleChange} onBlur={frm.handleBlur} />
                        </div>
                        <div className='form-group'>
                            <label htmlFor="description">Description</label><br />
                            <textarea   id="description" style={{borderRadius:"10px",height:"80px"}} placeholder='Add a detail description' className='form-control' onChange={frm.handleChange} onBlur={frm.handleBlur} />
                        </div>
                        <div className='form-group'>
                            <label htmlFor="link">Link</label><br />
                            <input  type="text" id="link" style={{borderRadius:"10px"}} placeholder='Add a link' className='form-control'  />
                        </div>
                        </div>
                    </div>
                </form>

            </div>
        </div>
    )
}

export default AddPicture