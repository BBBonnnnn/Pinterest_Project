import React, { useState, useEffect } from 'react'
import { getCreatedByIdApi } from '../fetchFromApi';
import { useSelector } from 'react-redux';

const Created = () => {
    const [image, setImage] = useState<any>([]);
    const userInfo = useSelector((state:any)=>state.loginReducer)
    useEffect(() => {
        getCreatedByIdApi(userInfo.userId).then(res => {
            setImage(res)
        })
    }, [])
    return (
        <div className='w-100' style={{ display: 'grid', gridTemplateColumns: "repeat(5, 1fr)", gap: '12px' }}>
            {image?.map((item: any, index: number) => {
                return <div key={index} className=''>
                    <img src={`https://drive.google.com/uc?id=${item.duong_dan}`} alt="" style={{ width: '100%', maxHeight: "600px", borderRadius: '20px' }} />
                </div>
            })}
        </div>
    )
}

export default Created