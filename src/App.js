import './App.css';
import Login from './components/Authentication/Login/Login';
import { Routes, Route } from 'react-router-dom';
import Registration from './components/Authentication/Registration/Registration';
function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/registration' element={<Registration />} />
      </Routes>
    </div>
  );
}

export default App;
//nfn = arrow function
//rfac = arrow function compoenent
