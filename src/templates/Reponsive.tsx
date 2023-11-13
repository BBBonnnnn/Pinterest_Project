import React, { useEffect, useState } from 'react'

// interface Props {
//     component: React.FC,
//     mobileComponent: React.FC
// }


interface Props {
    component:JSX.Element,
    mobileComponent:JSX.Element,
    values?:number
}

const Reponsive = (props: Props) => {
    

    
    // useEffect(() => {
       
    // },[])
    let component=props.component
    if(props.values == 1){
        component = props.component
    }else if(props.values == 2){
        component = props.mobileComponent
    }
    return (
        <>
        {component}
        </>
    )
}

export default Reponsive