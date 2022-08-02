import React, {useState} from 'react';
import Menu from './Menu';
import Footer from './Footer';
import StaffInfor from './StaffInfor';
import StaffList from './StaffList';
import Department from './Department';
import Salary from './Salary';
import SalarySort from './SalarySort';
import {Switch, Route, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

const mapStateToProps = state => {
    return {
        staffs: state.staffs,
        departments: state.departments
    }
}

function Layout(props) {
      
    const [staffs, setStaffs] = useState(props.staffs);
    
    const IdSellected = ({match}) => {
        return (
            <StaffInfor staff = {staffs.filter(
                (item) => item.id === parseInt(match.params.staffsId,10))[0]
            } />
        )
    };

    //Add NV
    const addStaff = (staff) => {
        const id = Math.floor(Math.random() * 10000 + 1);
        const newStaff = { id, ...staff };
        setStaffs([...staffs, newStaff])
    }
    
    return (
        <div>
            <Menu />
            <Switch>
                <Route exact path='/' component={()=><StaffList onAdd={addStaff} staffs={staffs}/>} />
                <Route exact path='/staffs' component={()=><StaffList onAdd={addStaff} staffs={staffs}/>} />
                <Route path='/staffs/:staffsId' component={IdSellected} />
                <Route path='/department' component={()=><Department depart={props.departments}/>} />
                <Route exact path='/salary' component={()=><Salary salary={staffs}/>} />
                <Route path='/salary/sort' component={()=><SalarySort salaryscale={staffs}/>} />
            </Switch>
            <Footer />
        </div>
    )
}

export default withRouter(connect(mapStateToProps)(Layout));