import React, { useState } from 'react';
import {Link} from "react-router-dom";
import { Card, CardBody, CardImg, CardTitle,
        Button, Modal, Form, Input, ModalHeader, 
        ModalBody, ModalFooter, Row, Label, FormFeedback  } from 'reactstrap';

function StaffList(props) {

    const [state, setState] = useState({
        nameF: "",
        name: "",
        doB: "",
        salaryScale: "",
        startDate: "",
        department: "Sale",
        staffRole: "Nhân viên",
        annualLeave: "",
        overTime: "",
        image: "/assets/images/alberto.png",
        touched: {
            name: false,
            doB: false,
            startDate: false,
            salaryScale: false,
            annualLeave: false,
            overTime: false
        }
    })

    //Đóng/mở Modal
    const [show, setShow] = useState(false);
    const toggle = () => setShow(!show) 

    //Blur khỏi input
    const handleBlur = (field) => {
        setState({...state, touched: {...state.touched, [field]: true}});
    }

    //Validate
    const validate = (
        name,
        doB,
        startDate,
        salaryScale,
        annualLeave,
        overTime
      ) => {
            const errors = {
                    name: "",
                    doB: "",
                    startDate: "",
                    salaryScale: "",
                    annualLeave: "",
                    overTime: "",
                };

            if (state.touched.name && name.length < 2)
                errors.name = "Yêu cầu nhập nhiều hơn 2 ký tự !";
            else if (state.touched.name && name.length > 20)
                errors.name = "Yêu cầu nhập ít hơn 20 ký tự !";
            if (state.touched.doB && doB.length < 1) 
                errors.doB = "Yêu cầu nhập !";
            if (state.touched.startDate && startDate.length < 1)
                errors.startDate = "Yêu cầu nhập !";
            if (state.touched.salaryScale && salaryScale.length < 1)
                errors.salaryScale = "Yêu cầu nhập !";
            if (state.touched.annualLeave && annualLeave.length < 1)
                errors.annualLeave = "Yêu cầu nhập !";
            if (state.touched.overTime && overTime.length < 1)
                errors.overTime = "Yêu cầu nhập !";

            return errors;
            
      };

      const errors = validate(
        state.name,
        state.doB,
        state.startDate,
        state.salaryScale,        
        state.annualLeave,
        state.overTime
      );
    
    //Hàm submit thêm NV  
    const addStaff = (event) => {
        event.preventDefault();

        const newStaff = {
            name: state.name,
            doB: state.doB,
            salaryScale: state.salaryScale,
            startDate: state.startDate,
            department: {name: state.department},
            staffRole: state.staffRole,
            annualLeave: state.annualLeave,
            overTime: state.overTime,
            image: state.image
          }
        //Đóng Modal và thêm NV  
        setShow(!show);  
        props.onAdd(newStaff);
                
    }
    
    //Hàm thay đổi dữ liệu input
    const handleInputChange = (event) => {
        event.preventDefault();
        setState({...state, [event.target.name] : event.target.value})
    }

    const nhanVien = (event) => {
        event.preventDefault();
        const nameS = event.target.nameS.value;
        setState({...state, nameF:nameS})
    }

    //Lọc NV
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
                <Form className="form-group" onSubmit={addStaff}>
                    <ModalBody>
                        <Row className='control-group'>
                            <Label className='col-5' htmlFor="name">Tên</Label>
                            <div className='col-7'><Input 
                                id="name" name="name" className="form-control"
                                onChange={handleInputChange} 
                                value={state.name}
                                valid={errors.name === ""}
                                invalid={errors.name !== ""}
                                onBlur={() => handleBlur("name")} required/>
                                <FormFeedback>{errors.name}</FormFeedback>
                            </div>
                            <Label className='col-5 mt-2' htmlFor="doB">Ngày sinh</Label>
                            <div className='col-7 mt-2'><Input type="date" 
                                id="doB" name="doB" 
                                onChange={handleInputChange} 
                                value={state.doB}
                                valid={errors.doB === ""}
                                invalid={errors.doB !== ""}
                                onBlur={() => handleBlur("doB")} required/>
                                <FormFeedback>{errors.doB}</FormFeedback>
                            </div>
                            <Label className='col-5 mt-2' htmlFor="startDate">Ngày vào công ty</Label>
                            <div className='col-7 mt-2'><Input type="date" 
                                id="startDate" name="startDate" 
                                onChange={handleInputChange} 
                                value={state.startDate}
                                valid={errors.startDate === ""}
                                invalid={errors.startDate !== ""}
                                onBlur={() => handleBlur("startDate")} required/>
                                <FormFeedback>{errors.startDate}</FormFeedback>
                            </div>  
                            <Label className='col-5 mt-2' htmlFor="department">Phòng ban</Label>
                            <div className='col-7 mt-2'>
                                <Input type='select' className='col-12 pb-2 pt-1'
                                id="department" name="department" 
                                onChange={handleInputChange} 
                                value={state.department.name}>
                                    <option value="Sale">Sale</option>
                                    <option value="HR">HR</option>
                                    <option value="Marketing">Marketing</option>
                                    <option value="IT">IT</option>
                                    <option value="Finance">Finance</option>
                                </Input>
                            </div>
                            <Label className='col-5 mt-2' htmlFor="staffRole">Chức danh</Label>
                            <div className='col-7 mt-2'>
                                <Input type='select' className='col-12 pb-2 pt-1'
                                id="staffRole" name="staffRole" 
                                onChange={handleInputChange} 
                                value={state.staffRole}>
                                    <option value="Nhân viên">Nhân viên</option>
                                    <option value="Quản lý">Quản lý</option>
                                </Input>
                            </div>
                            <Label className='col-5 mt-2' htmlFor="salaryScale">Hệ số lương</Label>
                            <div className='col-7 mt-2'><Input placeholder='1.0' 
                                id="salaryScale" name="salaryScale" 
                                onChange={handleInputChange} 
                                value={state.salaryScale}
                                valid={errors.salaryScale === ""}
                                invalid={errors.salaryScale !== ""}
                                onBlur={() => handleBlur("salaryScale")} required/>
                                <FormFeedback>{errors.salaryScale}</FormFeedback> 
                            </div>    
                            <Label className='col-5 mt-2' htmlFor="annualLeave">Số ngày nghỉ còn lại</Label>
                            <div className='col-7 mt-2'><Input placeholder='0'  
                                id="annualLeave" name="annualLeave" 
                                onChange={handleInputChange} 
                                value={state.annualLeave}
                                valid={errors.annualLeave === ""}
                                invalid={errors.annualLeave !== ""}
                                onBlur={() => handleBlur("annualLeave")} required/>
                                <FormFeedback>{errors.annualLeave}</FormFeedback> 
                            </div>   
                            <Label className='col-5 mt-2' htmlFor="overTime">Số ngày làm thêm</Label>
                            <div className='col-7 mt-2'><Input placeholder='0'  
                                id="overTime" name="overTime" 
                                onChange={handleInputChange} 
                                value={state.overTime}
                                valid={errors.overTime === ""}
                                invalid={errors.overTime !== ""}
                                onBlur={() => handleBlur("overTime")} required/>
                                <FormFeedback>{errors.overTime}</FormFeedback> 
                            </div>      
                        </Row>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" type="submit">Thêm</Button>
                    </ModalFooter>
                </Form>
            </Modal>    
        </div>    
        ) 
}

export default StaffList;
