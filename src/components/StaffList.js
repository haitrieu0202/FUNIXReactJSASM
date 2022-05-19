
import React from 'react';
import {Link} from "react-router-dom";



function StaffList(props) {
    
    const listRender = props.staffs.map((staff) => {
        const url = `/staffs/${staff.id}`
        return (
            <div key={staff.id}>
                <Link to={url}>
                    <img src={staff.image} alt={staff.name}></img>
                    <p>{staff.name}</p>
                </Link>
            </div>
        )
    })
    return <div>{listRender}</div>
        
    
}

export default StaffList;