import React from 'react';
import { useParams } from "react-router-dom";
import { deleteData } from "../redux/ActionCreators";
import { Link } from "react-router-dom";
import { Breadcrumb, BreadcrumbItem, Card, CardBody, CardImg, CardTitle, Button } from 'reactstrap';
import { Loading } from "./Loading";

function StaffDepartment(props) {
    const { departId } = useParams();
    const departName = props.depart.departments.find((item) => item.id === departId);
    
    const staffDepart = props.staffs.staffs
        .filter((nv) => nv.departmentId === departId)
        .map((staff) => {
                const url = `/staffs/${staff.id}`
                return (
                    <div className="staff col-lg-2 col-md-4 col-sm-6 p-0">
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
                    </div>
                )
            }
        )
    return (
        <div className="mt-3">
            { props.staffs.isLoading || props.depart.isLoading ? <Loading /> : 
                <div>
                    <div>
                        <Breadcrumb>
                            <BreadcrumbItem>
                                <Link to='/department'>Phòng Ban</Link>
                            </BreadcrumbItem>
                            <BreadcrumbItem active>{departName?.name}</BreadcrumbItem>
                        </Breadcrumb>
                    </div>    
                    <div className='row' id="list">
                        {staffDepart}
                    </div>
                </div>
            }    
        </div>
    )
}

export default StaffDepartment;