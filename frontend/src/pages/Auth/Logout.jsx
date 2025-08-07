// pages/Logout.jsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear auth data (tokens, etc.)
    localStorage.clear(); // or remove specific keys
    navigate('/login'); // redirect to login after logout
  }, []);

  return null;
};

export default Logout;
