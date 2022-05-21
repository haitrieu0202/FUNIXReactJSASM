
import { Card, CardBody, CardImg, CardText, CardTitle } from 'reactstrap';
import React from 'react';



function Department(props) {
    
    const department = props.depart.map((dept) => {
        return (
            <div className="col-lg-4 col-md-6 col-sm-12">
                <Card key={dept.id} className="marginbot">
                    <b>{dept.name}</b>
                    <CardTitle>Số lượng nhân viên: {dept.numberOfStaff}</CardTitle>
                </Card>
            </div>
        )
    })
    return (
        <div>
            <div className='post row'>{department}</div>
        </div>
    )    
    
}

export default Department;