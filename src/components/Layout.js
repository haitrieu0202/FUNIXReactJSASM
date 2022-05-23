import React, {useState} from 'react';
import Menu from './Menu';
import StaffInfor from './StaffInfor';
import StaffList from './StaffList';
import Department from './Department';
import Salary from './Salary';
import SalarySort from './SalarySort';
import {Switch, Route} from 'react-router-dom';
import { STAFFS } from './shared/staffs';
import { DEPARTMENTS } from './shared/staffs';


function Layout() {
    const [officeStaff] = useState({
        staffs: STAFFS,
        departments: DEPARTMENTS
    })
    const IdSellected = ({match}) => {
        return (
            <StaffInfor staff = {officeStaff.staffs.filter(
                (item) => item.id === parseInt(match.params.staffsId,10))[0]
            } />
        )
    };
    
    return (
        <div>
            <Menu />
            <Switch>
                <Route exact path='/staffs' component={()=><StaffList staffs={officeStaff.staffs}/>} />
                <Route path='/staffs/:staffsId' component={IdSellected} />
                <Route path='/department' component={()=><Department depart={officeStaff.departments}/>} />
                <Route exact path='/salary' component={()=><Salary salary={officeStaff.staffs}/>} />
                <Route path='/salary/sort' component={()=><SalarySort salaryscale={officeStaff.staffs}/>} />
            </Switch>
        </div>
    )
}
export default Layout;