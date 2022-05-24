import React from 'react';
import {Link} from "react-router-dom";
import { Card, CardBody, CardImg, CardTitle } from 'reactstrap';

function StaffList(props) {
    const arraysort = props.staffs.sort(function(staff1, staff2){
        return staff1.id - staff2.id;
    });
    const listRender = arraysort.map((staff) => {
        const url = `/staffs/${staff.id}`
        return (
            <CardBody key={staff.id} className="staff col-lg-2 col-md-4 col-sm-6 p-0">
                <Card className='m-2'>
                    <Link to={url}>
                        <CardImg src={staff.image} alt={staff.name} width="100%"></CardImg>
                        <CardTitle className='name'>{staff.name}</CardTitle>
                    </Link>
                </Card>
            </CardBody>
        )
    })
    return (
    <div className='post'>
        <h3>Nhân Viên</h3><hr></hr>
        <div className='row'>{listRender}</div>
    </div>    
    ) 
}

export default StaffList;