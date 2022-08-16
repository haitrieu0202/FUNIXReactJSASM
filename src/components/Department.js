import { Card, CardTitle } from 'reactstrap';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDepart } from '../redux/ActionCreators';
import { Loading } from './Loading';
import { Link } from 'react-router-dom';

function Department() {
    const depart = useSelector(state => state.departments);
    const dispatch = useDispatch();
    useEffect( () => {
        dispatch(fetchDepart())
    }, [dispatch]
    );
    
    const department = depart.departments.map((dept) => {
        return (
            <div className="col-lg-4 col-md-6 col-sm-12 mt-4">
                <Link to={`/department/${dept.id}`}>
                    <Card key={dept.id} className="marginbot">
                        <b>{dept.name}</b>
                        <CardTitle>Số lượng nhân viên: {dept.numberOfStaff}</CardTitle>
                    </Card>
                </Link>
            </div>
        )
    })
    return (
        <div className='mt-3'>
            {depart.isLoading ? <Loading /> : <div className='row'>{department}</div>}
        </div>
    )    
}

export default Department;