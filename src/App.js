import {useState} from 'react';
import {Route, Routes} from 'react-router-dom';
import './App.css';

import Navbar from './Component/Navbar/Navbar';
import LandingPage from './Pages/LandingPage/LandingPage';
import PreCheckoutPage from './Pages/PreCheckoutPage/PreCheckoutPage';

function App() {
  const [item, setItem] = useState([]);
  return (
    <div className='App'>
      <Navbar prop={{item, setItem}} />
      <Routes>
        <Route
          path='/'
          element={<LandingPage prop={{item, setItem}} />}
        ></Route>
        <Route
          path='/precheckout'
          element={<PreCheckoutPage prop={{item, setItem}} />}
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
