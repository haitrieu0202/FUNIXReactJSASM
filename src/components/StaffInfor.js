import React, { useState } from "react";
import {Link} from "react-router-dom";
import { Breadcrumb, BreadcrumbItem, Card, CardBody, CardImg, CardText, 
        Button, Modal, ModalHeader, 
        ModalBody, ModalFooter, Row, Label } from 'reactstrap';
import { Control, LocalForm, Errors } from "react-redux-form";
import dateFormat from "dateformat";
import { useParams } from "react-router-dom";
import { Loading } from './Loading';
import { editData } from "../redux/ActionCreators";
import { FadeTransform } from "react-animation-components";

function StaffInfor(props) {
    const {staffsId} = useParams();
    const staff = props.staffs.staffs.find((item) => item.id === parseInt(staffsId));
    const phongBan = props.depart.departments.find((item) => item.id === staff?.departmentId);

    //Đóng/mở Modal
    const [show, setShow] = useState(false);
    const toggle = () => setShow(!show);

    // Validate
    const required = (val) => val && val.length;
    const minLength = (len) => (val) => val && val.length >= len;
    const maxLength = (len) => (val) => !val || val.length <= len;
    const isNumber = (val) => !isNaN(Number(val)) && val > 0;

    const depInput = props.depart.departments.map(
        (department) => {
            return (
                <option key={department.id} value={department.id}>
                    {department.name}
                </option>
            )
        }
    )

    const staffEdit = {
        ...staff,
        doB: dateFormat(staff?.doB, "yyyy-mm-dd"),
        startDate: dateFormat(staff?.startDate, "yyyy-mm-dd")
    }
    
    //Edit info
    const editStaff = (val) => {
        const sal = (val.salaryScale*3000000 + val.overTime*200000).toFixed(0);
        const id = staff?.id;  
        
        const updateStaff = {
            id: id,
            name: val.name,
            doB: val.doB + "T08:59:00.000Z",
            salaryScale: Number(val.salaryScale),
            startDate: val.startDate + "T08:59:00.000Z",
            departmentId: val.department,
            annualLeave: Number(val.annualLeave),
            overTime: Number(val.overTime),
            image: staff?.image,
            salary: Number(sal)
        }
        
        //Sửa NV và đóng Modal 
        props.dispatch(editData(updateStaff));
        setShow(!show); 
    }
    
    return (
        <div className="mt-3 mb-4">
            { props.staffs.isLoading ? <Loading /> : 
            <div>
                <div>
                    <Breadcrumb>
                        <BreadcrumbItem>
                            <Link to='/staffs'>Nhân Viên</Link>
                        </BreadcrumbItem>
                        <BreadcrumbItem active>{staff.name}</BreadcrumbItem>
                    </Breadcrumb>
                </div>
                <FadeTransform in fadeProps={{ exitFade: "0", enterFade: "1" }}
                transformProps={{ exitTransform: "scale(.7) translateY(50%)" }}>
                    <div className="container staffInfor">
                        <Card >
                            <div className="row">
                                <div className="col-lg-4 col-md-6 col-sm-12">
                                    <CardImg width="100%" src={staff.image} alt={staff.name} className="" />
                                </div>
                                <div className="col-lg-8 col-md-6">
                                    <CardBody>
                                        <h4><b>Họ và tên: {staff.name}</b></h4>
                                        <CardText>Ngày sinh: {dateFormat(staff.doB, "dd/mm/yyyy")}</CardText>
                                        <CardText>Ngày vào công ty: {dateFormat(staff.startDate, "dd/mm/yyyy")}</CardText>
                                        <CardText>Phòng ban: {phongBan?.name}</CardText>
                                        <CardText>Số ngày nghỉ còn lại: {staff.annualLeave}</CardText>
                                        <CardText>Số ngày đã làm thêm: {staff.overTime}</CardText>
                                        <Button className="btn btn-danger" onClick={toggle}>
                                            <i class="fa fa-pencil-square-o text-white" aria-hidden="true">{" "}Edit</i> 
                                        </Button>
                                    </CardBody>
                                </div> 
                            </div>
                        </Card>
                    </div>
                </FadeTransform>       
            </div>
            }
            <Modal isOpen={show} toggle={toggle}>
                <ModalHeader toggle={toggle}>Chỉnh sửa thông tin</ModalHeader>
                <LocalForm className="form-group" onSubmit={editStaff} initialState={staffEdit}>
                    <ModalBody>
                        <Row className='control-group'>
                            <Label className='col-5 mt-2' htmlFor="name">Tên</Label>
                            <div className='col-7 mt-2'>
                                <Control.text 
                                model=".name"
                                id="name" name="name" 
                                className="form-control"
                                validators={{
                                    minLength: minLength(3),
                                    maxLength: maxLength(20)
                                }}
                                />
                                <Errors
                                model=".name"
                                className="text-danger mt-1"
                                show="touched"
                                messages={{
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
                                defaultValue={staff?.departmentId} 
                                className="form-control"
                                >
                                {depInput}
                                </Control.select>
                            </div>
                            <Label className='col-5 mt-2' htmlFor="salaryScale">Hệ số lương</Label>
                            <div className='col-7 mt-2'>
                                <Control.text 
                                model=".salaryScale"
                                id="salaryScale" name="salaryScale" 
                                className="form-control"
                                validators={{
                                    isNumber
                                }}
                                />
                                <Errors
                                model=".salaryScale"
                                className="text-danger mt-1"
                                show="touched"
                                messages={{
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
                                    isNumber
                                }}
                                />
                                <Errors
                                model=".annualLeave"
                                className="text-danger mt-1"
                                show="touched"
                                messages={{
                                    isNumber: "Nhập giá trị số"
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
                                    isNumber
                                }}
                                />
                                <Errors
                                model=".overTime"
                                className="text-danger mt-1"
                                show="touched"
                                messages={{
                                    isNumber: "Nhập giá trị số"
                                }}
                                />
                            </div>
                        </Row>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" type="submit">Cập nhật</Button>
                    </ModalFooter>
                </LocalForm>
            </Modal>
        </div>
    );
}
export default StaffInfor;