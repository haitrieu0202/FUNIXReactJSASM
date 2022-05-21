import {
    Navbar,
    NavbarBrand,
    Nav,
    NavbarToggler,
    NavItem
} from 'reactstrap';
import React from 'react';
import {NavLink} from 'react-router-dom';

function Menu() {
    return (
        <Navbar dark color="primary">
            <NavbarBrand>
                <img src="assets/images/logo.png" alt='Logo' width='45px'></img>
            </NavbarBrand>
            <NavbarBrand>
                <NavLink to='/staffs'>
                    <i className="fa-solid fa-users"></i> Nhân Viên
                </NavLink>
            </NavbarBrand>
            <NavbarBrand>
                <NavLink to='/department'>
                    <i className="fa-solid fa-id-card"></i> Phòng Ban
                </NavLink>    
            </NavbarBrand>
            <NavbarBrand>
                <NavLink to='/salary'>
                    <i className="fa-solid fa-money-check-dollar"></i> Bảng Lương
                </NavLink>         
            </NavbarBrand>
        </Navbar>
    )
}
export default Menu;