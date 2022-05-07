import './App.css';
import StaffList from './components/StaffListComponent'
import { Navbar, NavbarBrand } from 'reactstrap';

function App() {
  return (
    <div className="App">
      <Navbar dark color="primary" className="nav01">
        <div className="container">
          <NavbarBrand><h3>Ứng dụng quản lý nhân sự v1.0</h3></NavbarBrand>
        </div>
      </Navbar>
      <StaffList /> 
    </div>
  );
}

export default App;
