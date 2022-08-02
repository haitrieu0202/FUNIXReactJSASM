import React, {useState} from 'react';
import Menu from './Menu';
import Footer from './Footer';
import StaffInfor from './StaffInfor';
import StaffList from './StaffList';
import Department from './Department';
import Salary from './Salary';
import SalarySort from './SalarySort';
import {Switch, Route} from 'react-router-dom';
import { STAFFS } from './shared/staffs';
import { DEPARTMENTS } from './shared/staffs';

function Layout() {
    const [state, setState] = useState({
        staffs: STAFFS,
    })
    const [depart] = useState({
        departments: DEPARTMENTS,
    })
    const IdSellected = ({match}) => {
        return (
            <StaffInfor staff = {state.staffs.filter(
                (item) => item.id === parseInt(match.params.staffsId,10))[0]
            } />
        )
    };
    const addStaff = (staff) => {
        const id = Math.floor(Math.random() * 10000 + 1);
        const newStaff = { id,...staff };
          setState({staffs:[...state.staffs, newStaff]})
    }
    
    return (
        <div>
            <Menu />
            <Switch>
                <Route exact path='/' component={()=><StaffList onAdd={addStaff} staffs={state.staffs}/>} />
                <Route exact path='/staffs' component={()=><StaffList onAdd={addStaff} staffs={state.staffs}/>} />
                <Route path='/staffs/:staffsId' component={IdSellected} />
                <Route path='/department' component={()=><Department depart={depart.departments}/>} />
                <Route exact path='/salary' component={()=><Salary salary={state.staffs}/>} />
                <Route path='/salary/sort' component={()=><SalarySort salaryscale={state.staffs}/>} />
            </Switch>
            <Footer />
        </div>
    )
}

export default Layout;