import React from 'react';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <main className='flex flex-col min-h-screen bg-gray-100'>{children}</main>
      <Footer/>
    </>
  );
};

export default Layout;