import React from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="glass-card p-8">
        <h2 className="text-2xl mb-4">Register</h2>
        <button onClick={() => navigate('/login')} className="button-outline">Back to Login</button>
      </div>
    </div>
  );
};

export default Register;
