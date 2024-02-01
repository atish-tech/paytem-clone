import { BrowserRouter , Route , Routes} from 'react-router-dom';
import './App.css';
import { Login } from './Pages/Login';
import { Register } from './Pages/Register';
import { Dashboard } from './Pages/Dashboard';
import { SendMoney } from './Pages/SendMoney';
import { useEffect } from 'react';

function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path='/send' element={<SendMoney />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
