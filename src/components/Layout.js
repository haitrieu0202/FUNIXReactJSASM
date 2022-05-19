import React, {useState} from 'react';
import Menu from './Menu';
import StaffInfor from './StaffInfor';
import StaffList from './StaffList';
import {Switch, Route} from 'react-router-dom';
import { STAFFS } from './shared/staffs';


function Layout() {
    const [officeStaff] = useState({
        staffs: STAFFS
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
            </Switch>
        </div>
    )
}
export default Layout;