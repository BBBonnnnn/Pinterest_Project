import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { addCommentApi, addSavePictureApi, getCommentsByIdApi, getImageByIdApi } from '../fetchFromApi';
import { useFormik } from 'formik';
const Detail = () => {
    const params:any = useParams();
    console.log('sdsd',params)
    const [image, setImage] = useState<any>({});
    const [comments, setComments] = useState<any>([]);
    const [rerender, setRerender] = useState<any>([]);
    const frm = useFormik({
        initialValues: {
            comment: '',
        },
        onSubmit: (values: any) => {
           
            addCommentApi(values,params.hinh_id).then(res=>{
                rerender.push('thêm thành công!')
                frm.resetForm();
            
            }).catch();
        }
    })
    useEffect(() => {
        getImageByIdApi(params.duong_dan).then(res => {
            setImage(res)
        }
        ).catch(err => {
            console.log(err)
        });
        getCommentsByIdApi(params.hinh_id,params.duong_dan).then(res => {
            setComments(res);
        }).catch(err => {
            console.log(err)
        })

    }, [])
    useEffect(()=>{
        getCommentsByIdApi(params.hinh_id,params.duong_dan).then(res => {
            setComments(res)
        }).catch(err => {
            console.log(err)
        })
    },[rerender.length])
    return (
        <div className='container'>
            <div className='card w-75 mx-auto' style={{ borderRadius: "25px" }} >
                <div className='card-body row'>
                    <div className='col-6'>
                        <img className="w-100" src={`https://drive.google.com/uc?id=${image.duong_dan}`} style={{ width: "100%", height: "100%", borderRadius: "25px" }} />
                    </div>
                    <div className='col-6' style={{ position: "relative" }}>
                        <div>
                            <div className='row align-items-center mt-4'>
                                <div className='col-6'>
                                    <img className=" " src={process.env.PUBLIC_URL + '/assets/images/download.png'} alt='...' style={{ width: "10%" }}></img>
                                    <img className=" mx-4" src={process.env.PUBLIC_URL + '/assets/images/link.png'} alt='...' style={{ width: "10%" }}></img>
                                </div>
                                <div className='col-6 text-end'>
                                    <span className='mx-4'>KHANG</span>
                                    <button className='btn btn-danger' onClick={()=>{
                                        addSavePictureApi(params.hinh_id,params.duong_dan).then(res=>{
                                            alert("Save Success")
                                        })
                                    }}>Save</button>
                                </div>
                            </div>
                            <h1 className='my-5'>{image.tieu_de_hinh}</h1>
                            <p>{image.mo_ta}</p>
                            <h5 className='mt-5'>Comments</h5>
                            <div className='mt-4'>
                                {comments?.map((item: any, index: number) => {
                                    return <div key={index} className='row'>
                                        <p className='col-6'>{item.noi_dung}</p>
                                        <p className='col-6 text-end'>{item.ngay_binh_luan}</p>
                                    </div>
                                })}
                            </div>
                        </div>
                        <div style={{ position: 'absolute', bottom: "20px", right: '5px' }} className='w-100 p-0 m-0'>
                            <hr />
                            <form className='add-comment row mt-5 align-items-center' onSubmit={frm.handleSubmit}>
                                <div className='col-10'>
                                    <input id="comment" type="text" style={{ width: "100%", borderRadius: "30px" }} placeholder='Add a comment' className='p-2' onChange={frm.handleChange} onBlur={frm.handleBlur} />
                                </div>
                                <div className='col-2'>
                                    <button style={{ border: "0", backgroundColor: "red", color: "white", borderRadius: "40px" }} type='submit'>
                                        <i className="fa fa-paper-plane p-3"></i>
                                    </button>
                                </div>

                            </form>
                        </div>



                    </div>
                </div>


            </div>
        </div>
    )
}

export default Detail