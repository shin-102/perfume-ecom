import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = () => {
      setLoading(true);
      const isAdminLoggedIn = localStorage.getItem('isAdminLoggedIn');

      if (isAdminLoggedIn === 'true') {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        navigate('/admin/login');
      }
      setLoading(false);
    };

    checkAuth();
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#051e34] flex flex-col items-center justify-center space-y-4">
        <div className="w-12 h-12 border-4 border-[#039BE5] border-t-[#FFCA28] rounded-full animate-spin"></div>
        <p className="text-white text-[10px] font-black uppercase tracking-[0.4em]">Verifying Credentials...</p>
      </div>
    );
  }

  return isAuthenticated ? children : null;
};

export default ProtectedRoute;
