import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Link} from "react-router-dom";
import {Breadcrumb, BreadcrumbItem} from "reactstrap";
import { Card, CardTitle } from 'reactstrap';
import { fetchSalarys } from '../redux/ActionCreators';
import { Loading } from './Loading';

function SalarySort() {
    const salarys = useSelector(state => state.salarys);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchSalarys())
    }, [dispatch]);
    const arraysort = salarys.salarys.sort(function(staff1, staff2){
        return staff1.salaryScale - staff2.salaryScale;
    });
    const money = arraysort.map((staff) => {
        return (
            <div className="col-lg-4 col-md-6 col-sm-12">
                <Card key={staff.id} className="marginbot">
                    <CardTitle><b>{staff.name}</b></CardTitle>
                    <CardTitle>Hệ số lương: {staff.salaryScale}</CardTitle>
                    <CardTitle>Mã nhân viên: {staff.id}</CardTitle>
                    <CardTitle>Số ngày làm thêm: {staff.overTime}</CardTitle>
                    <CardTitle className='salary'>Lương: {(staff.salaryScale*3000000 + staff.overTime*200000).toFixed(0)}</CardTitle>
                </Card>
            </div>
        )
    })
    return (
        <div className='mt-3'>
            <div>
                <Breadcrumb>
                    <BreadcrumbItem>
                        <Link to='/staffs'>Nhân Viên</Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem active>Bảng Lương</BreadcrumbItem>
                </Breadcrumb>
            </div>
            <Link to='/salary'>
                <button type="button" className="btn btn-primary">Sắp xếp theo mã nhân viên</button>    
            </Link>                
            <div className='mt-2'>
                { salarys.isLoading ? <Loading /> : <div className='post row'>{money}</div>}
            </div>
        </div>
    )    
}

export default SalarySort;