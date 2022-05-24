import React from 'react';
import {Link} from "react-router-dom";
import {Breadcrumb, BreadcrumbItem} from "reactstrap";
import { Card, CardTitle } from 'reactstrap';

function Salary(props) {
    const arraysort = props.salary.sort(function(staff1, staff2){
        return staff1.id - staff2.id;
    });
    const money = arraysort.map((staff) => {
        return (
            <div className="col-lg-4 col-md-6 col-sm-12">
                <Card key={staff.id} className="marginbot">
                    <CardTitle><b>{staff.name}</b></CardTitle>
                    <CardTitle>Mã nhân viên: {staff.id}</CardTitle>
                    <CardTitle>Hệ số lương: {staff.salaryScale}</CardTitle>
                    <CardTitle>Số ngày làm thêm: {staff.overTime}</CardTitle>
                    <CardTitle className='salary'>Lương: {(staff.salaryScale*3000000 + staff.overTime*200000).toFixed(0)}</CardTitle>
                </Card>
            </div>
        )
    })
    return (
        <div>
            <div>
                <Breadcrumb>
                    <BreadcrumbItem>
                        <Link to='/staffs'>Nhân Viên</Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem active>Bảng Lương</BreadcrumbItem>
                </Breadcrumb>
            </div>
            <Link to='/salary/sort'>
                <button type="button" class="btn btn-info">Sắp xếp theo mức lương</button>    
            </Link>                
            <div className='post row'>{money}</div>
        </div>
    )    
}

export default Salary;