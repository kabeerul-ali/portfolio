// example logout function (e.g. inside Navbar or Home)
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const navigate = useNavigate();

const handleLogout = async () => {
  try {
    await axios.post('/api/auth/logout'); // axios defaults have withCredentials:true
    localStorage.removeItem('user'); // optional if you stored user
    navigate('/admin/login', { replace: true });
  } catch (err) {
    console.error('Logout failed', err);
  }
};
