import {
    Navbar,
    NavbarBrand,
    Nav,
    NavItem
} from 'reactstrap';
import React from 'react';
import {NavLink} from 'react-router-dom';

function Menu() {
    
    return (
        <div>
        <Navbar expand dark color="primary">
            <div className='row'>
                <NavbarBrand className='logo'>
                    <img src="assets/images/logo.png" alt='Logo' width='45px'></img>
                </NavbarBrand>
                <Nav navbar>
                    <NavItem>
                        <NavLink to='/staffs' className="nav-link">
                            <i className="fa-solid fa-users"></i> Nhân Viên
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink to='/department' className="nav-link ml-3 mr-3">
                            <i className="fa-solid fa-id-card"></i> Phòng Ban
                        </NavLink>    
                    </NavItem>
                    <NavItem>
                        <NavLink to='/salary' className="nav-link">
                            <i className="fa-solid fa-money-check-dollar"></i> Bảng Lương
                        </NavLink>         
                    </NavItem>
                </Nav>
            </div>
        </Navbar>
        </div>
    )
}

export default Menu;