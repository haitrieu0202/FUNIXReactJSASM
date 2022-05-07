import './App.css';
import Page from './components/Page';
import {BrowserRouter} from 'react-router-dom'
function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Page />
      
    </div>
    </BrowserRouter>
  );
}

export default App;
