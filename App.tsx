
import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ContentProvider } from './context/ContentContext';
import { Toaster } from 'react-hot-toast';

import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import ArtistsPage from './pages/ArtistsPage';
import ArtistProfilePage from './pages/ArtistProfilePage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import VIPLoungePage from './pages/VIPLoungePage';
import StudioPage from './pages/StudioPage';
import ChatPage from './pages/ChatPage';
import NotFoundPage from './pages/NotFoundPage';
import ArchivesPage from './pages/ArchivesPage';
import ConstellationPage from './pages/ConstellationPage';
import StaticPage from './pages/StaticPage';
import TottCatalogPage from './pages/TottCatalogPage';
import PlaylistsPage from './pages/PlaylistsPage';
import NewsArchivePage from './pages/NewsArchivePage';
import NewsArticlePage from './pages/NewsArticlePage';
import SubscriptionsPage from './pages/SubscriptionsPage';
import CheckoutPage from './pages/CheckoutPage';
import TeoAppPage from './pages/TeoAppPage';
import StorePage from './pages/StorePage';
import MyProjectsPage from './pages/MyProjectsPage';
import VideosPage from './pages/VideosPage';
import MyAccountPage from './pages/MyAccountPage';

// Admin Imports
import AdminLoginPage from './pages/admin/AdminLoginPage';
import ProtectedRoute from './pages/admin/ProtectedRoute';
import AdminLayout from './components/admin/AdminLayout';
import AdminArtistsListPage from './pages/admin/AdminArtistsListPage';
import AdminArtistEditPage from './pages/admin/AdminArtistEditPage';
import AdminNewsListPage from './pages/admin/AdminNewsListPage';
import AdminNewsEditPage from './pages/admin/AdminNewsEditPage';
import AdminSettingsPage from './pages/admin/AdminSettingsPage';
import AdminArchivesListPage from './pages/admin/AdminArchivesListPage';
import AdminArchiveEditPage from './pages/admin/AdminArchiveEditPage';
import AdminPagesListPage from './pages/admin/AdminPagesListPage';
import AdminPageEditPage from './pages/admin/AdminPageEditPage';
import AdminUsersListPage from './pages/admin/AdminUsersListPage';
import AdminUserEditPage from './pages/admin/AdminUserEditPage';
import AdminUserCreatePage from './pages/admin/AdminUserCreatePage';
import AdminCurationPage from './pages/admin/AdminCurationPage';
import AdminConstellationListPage from './pages/admin/AdminConstellationListPage';
import AdminConstellationEditPage from './pages/admin/AdminConstellationEditPage';
import AdminSpotlightPage from './pages/admin/AdminSpotlightPage';
import AdminPlaylistsListPage from './pages/admin/AdminPlaylistsListPage';
import AdminPlaylistEditPage from './pages/admin/AdminPlaylistEditPage';
import AdminAssetVaultPage from './pages/admin/AdminAssetVaultPage';
import AdminTrendingPage from './pages/admin/AdminTrendingPage';
import AdminAppsListPage from './pages/admin/AdminAppsListPage';
import AdminAppEditPage from './pages/admin/AdminAppEditPage';
import AdminFriendArtistsListPage from './pages/admin/AdminFriendArtistsListPage';
import AdminFriendArtistEditPage from './pages/admin/AdminFriendArtistEditPage';
import JasonDashboardPage from './pages/admin/JasonDashboardPage';
import AdminVideosListPage from './pages/admin/AdminVideosListPage';
import AdminVideoEditPage from './pages/admin/AdminVideoEditPage';
import AdminAccountingPage from './pages/admin/AdminAccountingPage';
import AdminPermissionsPage from './pages/admin/AdminPermissionsPage';
import AdminApiGatewayPage from './pages/admin/AdminApiGatewayPage';
import AdminFooterEditPage from './pages/admin/AdminFooterEditPage';


const App: React.FC = () => {
  return (
    <AuthProvider>
      <ContentProvider>
        <HashRouter>
          <Toaster toastOptions={{
            style: {
              background: '#242038',
              color: '#F0F0F0',
            }
          }}/>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="artists" element={<ArtistsPage />} />
              <Route path="artists/:artistId" element={<ArtistProfilePage />} />
              <Route path="image-generator" element={<ArchivesPage />} />
              <Route path="constellation" element={<ConstellationPage />} />
              <Route path="tott-catalog" element={<TottCatalogPage />} />
              <Route path="playlists" element={<PlaylistsPage />} />
              <Route path="videos" element={<VideosPage />} />
              <Route path="news" element={<NewsArchivePage />} />
              <Route path="news/:newsIndex" element={<NewsArticlePage />} />
              <Route path="signin" element={<SignInPage />} />
              <Route path="signup" element={<SignUpPage />} />
              <Route path="vip-lounge" element={<VIPLoungePage />} />
              <Route path="studio" element={<StudioPage />} />
              <Route path="apps" element={<TeoAppPage />} />
              <Route path="chat" element={<ChatPage />} />
              <Route path="store" element={<StorePage />} />
              <Route path="my-projects" element={<MyProjectsPage />} />
              <Route path="my-account" element={<MyAccountPage />} />
              <Route path="subscriptions" element={<SubscriptionsPage />} />
              <Route path="checkout" element={<CheckoutPage />} />
              <Route path="about" element={<StaticPage pageId="about" />} />
              <Route path="support" element={<StaticPage pageId="support" />} />
              <Route path="press" element={<StaticPage pageId="press" />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>

            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLoginPage />} />
            <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
               <Route index element={<Navigate to="jason-dashboard" replace />} />
               <Route path="jason-dashboard" element={<JasonDashboardPage />} />
               <Route path="artists" element={<AdminArtistsListPage />} />
               <Route path="artists/:artistId/edit" element={<AdminArtistEditPage />} />
               <Route path="friends" element={<AdminFriendArtistsListPage />} />
               <Route path="friends/new" element={<AdminFriendArtistEditPage />} />
               <Route path="friends/:friendId/edit" element={<AdminFriendArtistEditPage />} />
               <Route path="news" element={<AdminNewsListPage />} />
               <Route path="news/new" element={<AdminNewsEditPage />} />
               <Route path="news/:newsIndex/edit" element={<AdminNewsEditPage />} />
               <Route path="gallery" element={<AdminArchivesListPage />} />
               <Route path="gallery/new" element={<AdminArchiveEditPage />} />
               <Route path="gallery/:archiveIndex/edit" element={<AdminArchiveEditPage />} />
               <Route path="constellation" element={<AdminConstellationListPage />} />
               <Route path="constellation/new" element={<AdminConstellationEditPage />} />
               <Route path="constellation/:itemId/edit" element={<AdminConstellationEditPage />} />
               <Route path="spotlight" element={<AdminSpotlightPage />} />
               <Route path="videos" element={<AdminVideosListPage />} />
               <Route path="videos/new" element={<AdminVideoEditPage />} />
               <Route path="videos/:videoId/edit" element={<AdminVideoEditPage />} />
               <Route path="trending" element={<AdminTrendingPage />} />
               <Route path="playlists" element={<AdminPlaylistsListPage />} />
               <Route path="playlists/new" element={<AdminPlaylistEditPage />} />
               <Route path="playlists/:playlistId/edit" element={<AdminPlaylistEditPage />} />
               <Route path="asset-vault" element={<AdminAssetVaultPage />} />
               <Route path="apps" element={<AdminAppsListPage />} />
               <Route path="apps/new" element={<AdminAppEditPage />} />
               <Route path="apps/:appId/edit" element={<AdminAppEditPage />} />
               <Route path="pages" element={<AdminPagesListPage />} />
               <Route path="pages/:pageId/edit" element={<AdminPageEditPage />} />
               <Route path="footer/edit" element={<AdminFooterEditPage />} />
               <Route path="users" element={<AdminUsersListPage />} />
               <Route path="users/new" element={<AdminUserCreatePage />} />
               <Route path="users/:userEmail/edit" element={<AdminUserEditPage />} />
               <Route path="curation" element={<AdminCurationPage />} />
               <Route path="accounting" element={<AdminAccountingPage />} />
               <Route path="settings" element={<AdminSettingsPage />} />
               <Route path="permissions" element={<AdminPermissionsPage />} />
               <Route path="api-gateway" element={<AdminApiGatewayPage />} />
            </Route>
          </Routes>
        </HashRouter>
      </ContentProvider>
    </AuthProvider>
  );
};

export default App;
