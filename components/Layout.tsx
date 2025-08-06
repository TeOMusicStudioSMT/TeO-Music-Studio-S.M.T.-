
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import AudioPlayer from './AudioPlayer';

const Layout: React.FC = () => {
  return (
    <div className="bg-brand-dark min-h-screen flex flex-col text-brand-text">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
      <AudioPlayer />
    </div>
  );
};

export default Layout;
