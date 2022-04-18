import React, { Component } from 'react';
import { Card, CardBody, CardImg, CardText, CardTitle } from 'reactstrap';
import { STAFFS } from './shared/staffs';
import dateFormat from "dateformat";

class StaffList extends Component {
    constructor(props) {
        super(props);
        this.StaffList = STAFFS;
        this.state = {
            selectedStaff : null,
            columDefault: "divfull col-lg-4 col-md-6"
        }
    }
    clickStaff(infoStaff) {
        this.setState({
            selectedStaff : infoStaff
        })
    }
    selectedCol2() {
        this.setState({
        columDefault: "divfull col-6"
        })
    }
    selectedCol3() {
        this.setState({
        columDefault: "divfull col-4"
        })
    }
    selectedCol6() {
        this.setState({
        columDefault: "divfull col-2"
        })
    }
    renderInfo(selectedStaff) {
        if (selectedStaff != null) {
            return(
                <div className='staffCard col-lg-7 col-md-8'>
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
                <div className={this.state.columDefault}>
                    <Card className="oneStaff">
                        <CardTitle onClick={() => this.clickStaff(props)} key={props.id}>{props.name}</CardTitle>
                    </Card>
                </div>
            )
        })
        return (
            <div>
                <div className='colSelected'>
                    <button className='btn btn-warning' onClick={() => this.selectedCol2()}>2 cột</button>
                    <button className='col3 btn btn-warning'onClick={() => this.selectedCol3()}>3 cột</button>
                    <button className='btn btn-warning'onClick={() => this.selectedCol6()}>6 cột</button>
                </div>
                <div>{staffPost}</div><br></br>
                <div>{this.renderInfo(this.state.selectedStaff)}</div>
            </div>
        )
    }
}
export default StaffList;