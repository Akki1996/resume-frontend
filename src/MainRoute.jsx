import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Resume from './pages/Resume';
import Layout from './components/Layout';
import ProtectedRoute from './ProtectedRoute';

function MainRoute() {

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />


        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path="/resume" element={<Dashboard />} />
            <Route path="/" element={<Resume />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default MainRoute;