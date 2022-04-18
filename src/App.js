import './App.css';
import StaffList from './components/StaffListComponent'


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h4>
          Ứng dụng quản lý nhân sự v1.0
        </h4>
        <StaffList />
      </header>
    </div>
  );
}

export default App;
