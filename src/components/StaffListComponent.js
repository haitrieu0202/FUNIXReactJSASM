import React, { Component } from 'react';
import { Card, CardBody, CardImg, CardText, CardTitle } from 'reactstrap';
import { STAFFS } from './shared/staffs';
import dateFormat from "dateformat";

class StaffList extends Component {
    constructor(props) {
        super(props);
        this.StaffList = STAFFS;
        this.state = {
            selectedStaff : null
        }
    }
    clickStaff(infoStaff) {
        this.setState({
            selectedStaff : infoStaff
        })
    }
    renderInfo(selectedStaff) {
        if (selectedStaff != null) {
            return(
                <div>
                    <Card>
                        <CardImg top width="100%" src={selectedStaff.image} alt={selectedStaff.name} />
                        <CardBody>
                            <CardTitle>Họ và tên: {selectedStaff.name}</CardTitle>
                            <CardText>Ngày sinh: {dateFormat(selectedStaff.doB, "dd/mm/yyyy")}</CardText>
                            <CardText>Ngày vào công ty: {dateFormat(selectedStaff.startDate, "dd/mm/yyyy")}</CardText>
                            <CardText>Phòng ban: {selectedStaff.department.name}</CardText>
                            <CardText>Số ngày nghỉ còn lại: {selectedStaff.annualLeave}</CardText>
                            <CardText>Số ngày đã làm thêm: {selectedStaff.overTime}</CardText>
                        </CardBody>
                    </Card>
                </div>    
            )    
        }
    }
    render() {
        const staffPost = this.StaffList.map((props) => {
            return (
                <CardTitle onClick={() => this.clickStaff(props)} key={props.id}>{props.name}</CardTitle>
            )
        })
        return (
            <div>
                {staffPost}
                <div>{this.renderInfo(this.state.selectedStaff)}</div>
            </div>
        )
    }
}
export default StaffList;