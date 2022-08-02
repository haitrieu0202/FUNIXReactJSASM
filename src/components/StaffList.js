import React, { useState } from 'react';
import {Link} from "react-router-dom";
import { Card, CardBody, CardImg, CardTitle,
        Button, Modal, ModalHeader, 
        ModalBody, ModalFooter, Row, Label } from 'reactstrap';
import { Control, LocalForm, Errors } from "react-redux-form";

function StaffList(props) {
    
    const [state, setState] = useState({
        nameF: ""
    })

    //Validate
    const required = (val) => val && val.length;
    const minLength = (len) => (val) => val && val.length >= len;
    const maxLength = (len) => (val) => !val || val.length <= len;
    const isNumber = (val) => !isNaN(Number(val));

    //Đóng/mở Modal
    const [show, setShow] = useState(false);
    const toggle = () => setShow(!show) 
    
    // Hàm submit thêm NV
    const addStaff = (val) => {        
        const newStaff = {
            name: val.name,
            doB: val.doB,
            salaryScale: val.salaryScale,
            startDate: val.startDate,
            department: {name: val.department},
            staffRole: val.staffRole,
            annualLeave: val.annualLeave,
            overTime: val.overTime,
            image: "/assets/images/alberto.png"
        }

        //Đóng Modal và thêm NV 
        setShow(!show);  
        props.onAdd(newStaff);         
    }
    
    const nhanVien = (event) => {
        event.preventDefault();
        const nameS = event.target.nameS.value;
        setState({...state, nameF:nameS})
    }

    //Lọc list NV
    const arraysort = props.staffs.sort(function(staff1, staff2){
        return staff1.id - staff2.id;
    });
        const listRender = arraysort
        .filter((val) => {
            if (state.nameF === "")
                return val;
            else if (val.name.toLowerCase().includes(state.nameF.toLowerCase()))
                return val;
            return 0;
        })
        .map((staff) => {
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
                <div className="row ml-2">
                    <form onSubmit={nhanVien} className="form-group row">
                        <div>
                            <input type="text" name="nameS" 
                            className="form-control" 
                            id="search" placeholder="Tên nhân viên"
                            />
                        </div>
                        <div>
                            <button className="btn btn-info ml-3" 
                            type="submit">Tìm nhân viên</button>
                        </div>
                        <button className="btn btn-info ml-3" 
                            type="button" onClick={toggle}>+</button>
                    </form>
                </div>
            <div className='row' id="list">{listRender}</div>
            
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
                                defaultValue="Sale" 
                                className="form-control"
                                >
                                <option>Sale</option>
                                <option>HR</option>
                                <option>Marketing</option>
                                <option>IT</option>
                                <option>Finance</option>
                                </Control.select>
                            </div>
                            <Label className='col-5 mt-2' htmlFor="staffRole">Chức danh</Label>
                            <div className='col-7 mt-2'>
                                <Control.select 
                                model=".staffRole"
                                id="staffRole" name="staffRole" 
                                className="form-control"
                                defaultValue="Nhân viên"
                                >
                                    <option>Nhân viên</option>
                                    <option>Quản lý</option>   
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
