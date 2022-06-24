import React from 'react';
import {Link} from "react-router-dom";
import { Card, CardBody, CardImg, CardTitle } from 'reactstrap';
import { STAFFS } from './shared/staffs';
import dateFormat from "dateformat";


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
        <input type="text" placeholder=" Mã nhân viên" className='inp' id="search"></input>{" "}
        <button className="btn btn-info" onClick={Nvien}>Tìm nhân viên</button>
        <div className='row' id="list">{listRender}</div>
    </div>    
    ) 
}   

function Nvien() {
    const tk = document.getElementById("search").value;
    
    if(isNaN(tk) === true || parseInt(tk) > 15 || parseInt(tk) < 0 || tk == '') {
        alert("Mã nhân viên không đúng")
    }
    else{
        var a = STAFFS[tk];
        var post = '<div class="container">'
                +   '<div>'
                +       '<div class="row mt-3">'
                +           '<img width="100%" src=' + a.image + ' alt=' + a.name + ' class="col-lg-4 col-md-6 col-sm-12" />'
                +           '<div class="col-lg-8 col-md-6">'
                +               '<h4><b>Họ và tên: ' + a.name + '</b></h4>'
                +               '<p>Ngày sinh: '+ dateFormat(a.doB, "dd/mm/yyyy") + '</p>'
                +               '<p>Ngày vào công ty: ' + dateFormat(a.startDate, "dd/mm/yyyy") + '</p>'
                +               '<p>Phòng ban: ' + a.department.name + '</p>'
                +               '<p>Chức danh: ' + a.staffRole + '</p>'
                +               '<p>Số ngày nghỉ còn lại: ' + a.annualLeave + '</p>'
                +               '<p>Số ngày đã làm thêm: ' + a.overTime + '</p>'
                +            '</div>'
                +        '</div>'    
                +     '</div>'
                + '</div>'                                            
        document.getElementById("list").innerHTML = post
    }
}

export default StaffList;