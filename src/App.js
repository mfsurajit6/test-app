import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Nav from './components/Nav';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Home from './components/Home';
import Profile from './components/Profile';
import ProtectedRoute from './components/auth/ProtectedRoute';
// import { isAuthenticated } from './components/auth/AuthHelper';


function App() {
  return (
    <>
      <Router>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />

          <Route path='/' element={<ProtectedRoute />} >
            <Route path='/profile' element={<Profile/>} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
