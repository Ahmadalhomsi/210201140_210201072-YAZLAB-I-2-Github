import React from 'react';

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className="h-screen flex items-center justify-center"
      style={{
        backgroundImage: 'url(https://www.macfit.com/wp-content/uploads/2022/07/macfit_genel_19.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: '#fff'
      }}
    >
      {children}
    </div>
  );
}

export default AuthLayout;