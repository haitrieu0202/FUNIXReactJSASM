import './App.css';
import Layout from './components/Layout';
import {BrowserRouter} from 'react-router-dom';
import { Provider } from 'react-redux'; 
import { ConfigureStore } from './redux/configureStore';

const store = ConfigureStore();

function App() {
  return (
    <Provider store={store}>
    <BrowserRouter>
      <div className="App">
        <Layout />
        
      </div>
    </BrowserRouter>
    </Provider>
  );
}

export default App;
