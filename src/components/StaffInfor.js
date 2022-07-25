import React from "react";
import {Link} from "react-router-dom";
import {Breadcrumb, BreadcrumbItem} from "reactstrap";
import { Card, CardBody, CardImg, CardText } from 'reactstrap';
import dateFormat from "dateformat";

function StaffInfor(props) {
    if(props.staff != null) {
        return (
            <div>
                <div>
                    <Breadcrumb>
                        <BreadcrumbItem>
                            <Link to='/staffs'>Nhân Viên</Link>
                        </BreadcrumbItem>
                        <BreadcrumbItem active>{props.staff.name}</BreadcrumbItem>
                    </Breadcrumb>
                </div>
                <div>
                    <RenderStaf sellectedStaff={props.staff} />
                </div>
            </div>
        );
    }
    else {
        return <div></div>
    }
}
function RenderStaf({sellectedStaff}){
    if (sellectedStaff != null) {
        return (
        <div className="container">
            <Card>
                <div className="row">
                    <CardImg width="100%" src={sellectedStaff.image} alt={sellectedStaff.name} className="col-lg-4 col-md-6 col-sm-12" />
                    <CardBody className="col-lg-8 col-md-6">
                        <h4><b>Họ và tên: {sellectedStaff.name}</b></h4>
                        <CardText>Ngày sinh: {dateFormat(sellectedStaff.doB, "dd/mm/yyyy")}</CardText>
                        <CardText>Ngày vào công ty: {dateFormat(sellectedStaff.startDate, "dd/mm/yyyy")}</CardText>
                        <CardText>Phòng ban: {sellectedStaff.department.name}</CardText>
                        <CardText>Chức danh: {sellectedStaff.staffRole}</CardText>
                        <CardText>Số ngày nghỉ còn lại: {sellectedStaff.annualLeave}</CardText>
                        <CardText>Số ngày đã làm thêm: {sellectedStaff.overTime}</CardText>
                    </CardBody>
                </div>    
            </Card>
        </div>
        )
    }
    else {
        return <div></div>
    }
}
export default StaffInfor;