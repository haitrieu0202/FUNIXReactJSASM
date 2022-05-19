import React from "react";
import {Link} from "react-router-dom";
import {Breadcrumb, BreadcrumbItem} from "reactstrap";
import { Card, CardBody, CardImg, CardText, CardTitle } from 'reactstrap';
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
                    <div>
                        <h3>{props.staff.name}</h3>
                    </div>
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
        <Card>
                        <CardImg top width="100%" src={sellectedStaff.image} alt={sellectedStaff.name} />
                        <CardBody>
                            <CardTitle><b>Họ và tên: {sellectedStaff.name}</b></CardTitle>
                            <CardText>Ngày sinh: {dateFormat(sellectedStaff.doB, "dd/mm/yyyy")}</CardText>
                            <CardText>Ngày vào công ty: {dateFormat(sellectedStaff.startDate, "dd/mm/yyyy")}</CardText>
                            <CardText>Phòng ban: {sellectedStaff.department.name}</CardText>
                            <CardText>Chức danh: {sellectedStaff.staffRole}</CardText>
                            <CardText>Số ngày nghỉ còn lại: {sellectedStaff.annualLeave}</CardText>
                            <CardText>Số ngày đã làm thêm: {sellectedStaff.overTime}</CardText>
                        </CardBody>
                    </Card>
        )
    }
    else {
        return <div></div>
    }
}
export default StaffInfor;