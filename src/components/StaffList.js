import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { Card, CardBody, CardImg, CardTitle,
        Button, Modal, ModalHeader, 
        ModalBody, ModalFooter, Row, Label, Input, Form } from 'reactstrap';
import { Control, LocalForm, Errors } from "react-redux-form";
import { deleteData } from '../redux/ActionCreators';
import { Loading } from './Loading';
import { pushStaff } from '../redux/ActionCreators';
import { FadeTransform } from "react-animation-components";

function StaffList(props) {
    //Search NV
    const [keyword, setKeyword] = useState("")
    const nhanVien = (event) => {
        event.preventDefault();
        const nameS = event.target.nameS.value;
        setKeyword(nameS)
    }

    // Validate
    const required = (val) => val && val.length;
    const minLength = (len) => (val) => val && val.length >= len;
    const maxLength = (len) => (val) => !val || val.length <= len;
    const isNumber = (val) => !isNaN(Number(val));

    //Đóng/mở Modal
    const [show, setShow] = useState(false);
    const toggle = () => setShow(!show); 
    
    //Lọc list NV
    const listRender = props.staffs.staffs
    .filter((val) => {
        if (keyword === "")
            return val;
        else if (val.name.toLowerCase().includes(keyword.toLowerCase()))
            return val;
        return 0;
    })
    .map((staff) => {
        const url = `/staffs/${staff.id}`
        return (
            <div className="staff col-lg-2 col-md-4 col-sm-6 p-0">
                <FadeTransform in fadeProps={{ exitFade: "0", enterFade: "1" }}
                transformProps={{ exitTransform: "scale(.7) translateY(50%)" }}>
                    <CardBody key={staff.id}>
                        <Card className='m-2'>
                            <Link to={url}>
                                <CardImg src={staff.image} alt={staff.name} width="100%"></CardImg>
                                <CardTitle className='name mt-1'>
                                    {staff.name}
                                </CardTitle>
                            </Link>
                            <CardTitle className='name'>
                                <Button className='btn btn-warning' onClick=
                                {() => {
                                    if(window.confirm("Do you want to delete this staff?")) {
                                        props.dispatch(deleteData(staff.id));
                                    }
                                }}
                                >Delete</Button>
                            </CardTitle>
                        </Card>
                    </CardBody>
                </FadeTransform>
            </div>
        )
    });

    //Map department
    const phongBan = props.depart.departments.map(
        (department) => {
            return (
                <option key={department.id} value={department.id}>
                    {department.name}
                </option>
            )
        }
    )
    
    // Hàm submit thêm NV
    const addStaff = (val) => {    
        const sal = (val.salaryScale*3000000 + val.overTime*200000).toFixed(0);
        const newStaff = {
            name: val.name,
            doB: val.doB + "T08:59:00.000Z",
            salaryScale: Number(val.salaryScale),
            startDate: val.startDate + "T08:59:00.000Z",
            departmentId: val.department,
            annualLeave: Number(val.annualLeave),
            overTime: Number(val.overTime),
            image: "/assets/images/alberto.png",
            salary: Number(sal)
        }
        //Thêm NV và đóng Modal 
        props.dispatch(pushStaff(newStaff));
        setShow(!show);     
    }
    
    return (
        <div className='post'>
            <h3>Nhân Viên</h3><hr></hr>
                <div className="form">
                    <Form onSubmit={nhanVien} className="form-group row mb-1">
                        <div className='col-lg-2 col-md-4 col-sm-6 col-5'>
                            <Input type="text" name="nameS" 
                            className="form-control" 
                            id="search" placeholder="Tên nhân viên"
                            />
                        </div>
                        <div className='col-lg-4 col-md-6 col-sm-6 col-7'>
                            <Button className="btn btn-success but" 
                            type="submit">Tìm nhân viên</Button>
                            <Button className="btn btn-success" 
                            type="button" onClick={toggle}>+</Button>
                        </div>
                    </Form>
                </div>
            <div>
                {props.staffs.isLoading ? <Loading /> : 
                    <div className='row' id="list">
                        {listRender}
                    </div>
                }
            </div>
            
            <Modal isOpen={show} toggle={toggle}>
                <ModalHeader toggle={toggle}>Thêm Nhân Viên</ModalHeader>
                <LocalForm className="form-group" onSubmit={addStaff}>
                    <ModalBody>
                        <Row className='control-group'>
                            <Label className='col-5 mt-2' htmlFor="name">Tên</Label>
                            <div className='col-7 mt-2'>
                                <Control.text 
                                model=".name"
                                id="name" name="name" 
                                className="form-control"
                                validators={{
                                    required,
                                    minLength: minLength(3),
                                    maxLength: maxLength(20)
                                }}
                                />
                                <Errors
                                model=".name"
                                className="text-danger mt-1"
                                show="touched"
                                messages={{
                                    required: "Bắt buộc! ",
                                    minLength: "Nhập từ 3 ký tự trở lên",
                                    maxLength: "Nhập ít hơn 20 ký tự"
                                    }}
                                />
                            </div>
                            <Label className='col-5 mt-2' htmlFor="doB">Ngày sinh</Label>
                            <div className='col-7 mt-2'>
                                <Control.text 
                                model=".doB"
                                type="date"
                                id="doB" name="doB" 
                                className="form-control"
                                validators={{
                                    required
                                }}
                                />
                                <Errors
                                model=".doB"
                                className="text-danger mt-1"
                                show="touched"
                                messages={{
                                    required: "Bắt buộc! "
                                    }}
                                />
                            </div>
                            <Label className='col-5 mt-2' htmlFor="startDate">Ngày vào công ty</Label>
                            <div className='col-7 mt-2'>
                                <Control.text 
                                model=".startDate"
                                type="date"
                                id="startDate" name="startDate" 
                                className="form-control"
                                validators={{
                                    required
                                }}
                                />
                                <Errors
                                model=".startDate"
                                className="text-danger mt-1"
                                show="touched"
                                messages={{
                                    required: "Bắt buộc! "
                                    }}
                                />
                            </div>
                            <Label className='col-5 mt-2' htmlFor="department">Phòng ban</Label>
                            <div className='col-7 mt-2'>
                                <Control.select 
                                model=".department"
                                id="department" name="department"
                                defaultValue="Dept01" 
                                className="form-control"
                                >
                                {phongBan}
                                </Control.select>
                            </div>
                            <Label className='col-5 mt-2' htmlFor="salaryScale">Hệ số lương</Label>
                            <div className='col-7 mt-2'>
                                <Control.text 
                                model=".salaryScale"
                                id="salaryScale" name="salaryScale" 
                                className="form-control"
                                validators={{
                                    required,
                                    isNumber
                                }}
                                />
                                <Errors
                                model=".salaryScale"
                                className="text-danger mt-1"
                                show="touched"
                                messages={{
                                    required: "Bắt buộc! ",
                                    isNumber: "Nhập giá trị số"
                                    }}
                                />
                            </div>
                            <Label className='col-5 mt-2' htmlFor="annualLeave">Số ngày nghỉ còn lại</Label>
                            <div className='col-7 mt-2'>
                                <Control.text 
                                model=".annualLeave"
                                id="annualLeave" name="annualLeave" 
                                className="form-control"
                                validators={{
                                    required
                                }}
                                />
                                <Errors
                                model=".annualLeave"
                                className="text-danger mt-1"
                                show="touched"
                                messages={{
                                    required: "Bắt buộc! "
                                    }}
                                />
                            </div>
                            <Label className='col-5 mt-2' htmlFor="overTime">Số ngày làm thêm</Label>
                            <div className='col-7 mt-2'>
                                <Control.text 
                                model=".overTime"
                                id="overTime" name="overTime" 
                                className="form-control"
                                validators={{
                                    required
                                }}
                                />
                                <Errors
                                model=".overTime"
                                className="text-danger mt-1"
                                show="touched"
                                messages={{
                                    required: "Bắt buộc! "
                                    }}
                                />
                            </div>
                        </Row>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" type="submit">Thêm</Button>
                    </ModalFooter>
                </LocalForm>
            </Modal>    
        </div>    
    ) 
}

export default StaffList;
