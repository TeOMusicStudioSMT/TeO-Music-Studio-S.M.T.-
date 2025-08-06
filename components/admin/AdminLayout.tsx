
import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { UsersIcon, MusicNoteIcon, InfoIcon, LogInIcon, ImageIcon, SettingsIcon, FileTextIcon, AwardIcon, GridIcon, VideoIcon, PlaylistIcon, PackageIcon, TrendingUpIcon, AppWindowIcon, StarIcon, WalletIcon, LockIcon, KeyIcon } from '../icons';

const AdminSidebar: React.FC = () => {
  const { adminLogout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    adminLogout();
    navigate('/admin/login');
  };

  const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
      isActive
        ? 'bg-brand-primary text-white font-semibold'
        : 'text-brand-text-secondary hover:bg-brand-surface hover:text-white'
    }`;

  return (
    <div className="bg-brand-bg w-64 min-h-screen flex flex-col p-4">
      <div className="flex items-center space-x-3 p-4 mb-8">
        <MusicNoteIcon className="w-8 h-8 text-brand-primary" />
        <div>
          <span className="text-xl font-bold text-white">S.M.T.</span>
          <p className="text-sm text-brand-primary">Control Room</p>
        </div>
      </div>

      <nav className="flex-grow space-y-2">
        <NavLink to="/admin/jason-dashboard" className={navLinkClasses}>
          <StarIcon className="w-5 h-5 text-yellow-400" />
          <span>Jason's Dashboard</span>
        </NavLink>
        <div className="pt-2 mt-2 border-t border-brand-surface"></div>

        <NavLink to="/admin/artists" className={navLinkClasses}>
          <UsersIcon className="w-5 h-5" />
          <span>Manage Artists</span>
        </NavLink>
        <NavLink to="/admin/friends" className={navLinkClasses}>
          <UsersIcon className="w-5 h-5" />
          <span>Manage Friends</span>
        </NavLink>
        <NavLink to="/admin/news" className={navLinkClasses}>
          <InfoIcon className="w-5 h-5" />
          <span>Manage News</span>
        </NavLink>
         <NavLink to="/admin/trending" className={navLinkClasses}>
          <TrendingUpIcon className="w-5 h-5" />
          <span>Manage Trending</span>
        </NavLink>
        <NavLink to="/admin/gallery" className={navLinkClasses}>
          <ImageIcon className="w-5 h-5" />
          <span>Manage Gallery</span>
        </NavLink>
        <NavLink to="/admin/spotlight" className={navLinkClasses}>
          <VideoIcon className="w-5 h-5" />
          <span>Manage Spotlight</span>
        </NavLink>
        <NavLink to="/admin/videos" className={navLinkClasses}>
          <VideoIcon className="w-5 h-5" />
          <span>Manage Videos</span>
        </NavLink>
         <NavLink to="/admin/playlists" className={navLinkClasses}>
          <PlaylistIcon className="w-5 h-5" />
          <span>Manage Playlists</span>
        </NavLink>
         <NavLink to="/admin/asset-vault" className={navLinkClasses}>
          <PackageIcon className="w-5 h-5" />
          <span>Asset Vault</span>
        </NavLink>
        <NavLink to="/admin/apps" className={navLinkClasses}>
          <AppWindowIcon className="w-5 h-5" />
          <span>Manage Apps</span>
        </NavLink>
        <NavLink to="/admin/settings" className={navLinkClasses}>
          <SettingsIcon className="w-5 h-5" />
          <span>Settings</span>
        </NavLink>
        
        <div className="pt-4 mt-4 border-t border-brand-surface"></div>
        
        <NavLink to="/admin/pages" className={navLinkClasses}>
          <FileTextIcon className="w-5 h-5" />
          <span>Manage Pages</span>
        </NavLink>
         <NavLink to="/admin/users" className={navLinkClasses}>
          <UsersIcon className="w-5 h-5" />
          <span>Manage Users</span>
        </NavLink>
        <NavLink to="/admin/curation" className={navLinkClasses}>
          <AwardIcon className="w-5 h-5" />
          <span>Studio Curation</span>
        </NavLink>
        <NavLink to="/admin/constellation" className={navLinkClasses}>
          <GridIcon className="w-5 h-5" />
          <span>Manage Constellation</span>
        </NavLink>
        <NavLink to="/admin/accounting" className={navLinkClasses}>
          <WalletIcon className="w-5 h-5" />
          <span>Points Accounting</span>
        </NavLink>
        <NavLink to="/admin/permissions" className={navLinkClasses}>
          <LockIcon className="w-5 h-5" />
          <span>Permissions</span>
        </NavLink>
        <NavLink to="/admin/api-gateway" className={navLinkClasses}>
          <KeyIcon className="w-5 h-5" />
          <span>API Gateway</span>
        </NavLink>
      </nav>

      <div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-brand-text-secondary hover:bg-red-500/20 hover:text-red-400 transition-colors"
        >
          <LogInIcon className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

const AdminLayout: React.FC = () => {
  return (
    <div className="flex bg-brand-dark text-brand-text">
      <AdminSidebar />
      <main className="flex-grow p-8 overflow-y-auto h-screen">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
