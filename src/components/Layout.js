import React, { useEffect } from 'react';
import Menu from './Menu';
import Footer from './Footer';
import StaffInfor from './StaffInfor';
import StaffList from './StaffList';
import Department from './Department';
import Salary from './Salary';
import SalarySort from './SalarySort';
import { Routes, Route } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import StaffDepartment from './StaffDepartment';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDepart, fetchStaffs } from '../redux/ActionCreators';

function Layout() {

    const staffs = useSelector(state => state.staffs);
    const depart = useSelector(state => state.departments);
    const dispatch = useDispatch();
    useEffect(() =>{
        dispatch(fetchStaffs());
        dispatch(fetchDepart())
    }, [dispatch]);

    return (
        <div>
            <Menu />
            <Routes>
                <Route exact path='/' element={<StaffList staffs={staffs} depart={depart} dispatch={dispatch} />} />
                <Route exact path='/staffs' element={<StaffList staffs={staffs} depart={depart} dispatch={dispatch} />} />
                <Route exact path='/staffs/:staffsId' element={<StaffInfor staffs={staffs} depart={depart} dispatch={dispatch} />} />
                <Route exact path='/department' element={<Department />} />
                <Route path='/department/:departId' element={<StaffDepartment staffs={staffs} depart={depart} dispatch={dispatch} />} />
                <Route exact path='/salary' element={<Salary />} />
                <Route path='/salary/sort' element={<SalarySort />} />
            </Routes>       
            <Footer />
        </div>
    )
}

export default Layout;