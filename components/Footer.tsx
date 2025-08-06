
import React from 'react';
import { Link } from 'react-router-dom';
import { MusicNoteIcon, GlobeIcon, YoutubeIcon, HeartIcon } from './icons';

const FooterLink: React.FC<{ to: string; label: string }> = ({ to, label }) => (
    <li>
        <Link to={to} className="text-brand-text-secondary hover:text-white transition-colors duration-200">{label}</Link>
    </li>
);

const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-bg border-t border-brand-surface/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-3">
                <MusicNoteIcon className="w-8 h-8 text-brand-primary" />
                <div>
                  <span className="text-xl font-bold text-white">TeO Music Studio</span>
                  <p className="text-xs text-brand-text-secondary">S.M.T.</p>
                </div>
            </Link>
            <p className="text-brand-text-secondary text-sm">
                TeO-CONGLOMERATE of all Life in creation. Pioneering the future of music through AI artistry and human creativity.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-brand-text-secondary hover:text-white"><YoutubeIcon className="w-6 h-6" /></a>
              <a href="#" className="text-brand-text-secondary hover:text-white"><GlobeIcon className="w-6 h-6" /></a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <FooterLink to="/artists" label="Artists" />
              <FooterLink to="/store" label="Music Store" />
              <FooterLink to="/subscriptions" label="Subscriptions" />
              <FooterLink to="/chat" label="Chat with AI" />
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <FooterLink to="#" label="Privacy Policy" />
              <FooterLink to="#" label="Terms of Service" />
              <FooterLink to="#" label="Cookie Policy" />
              <FooterLink to="#" label="DMCA" />
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm text-brand-text-secondary">
                <li className="flex items-center space-x-2"><span>Email:</span> <a href="mailto:contact@teo.center" className="hover:text-white">contact@teo.center</a></li>
                <li className="flex items-center space-x-2"><span>Website:</span> <a href="#" className="hover:text-white">teo.center</a></li>
                <li className="flex items-center space-x-2"><span>Community:</span> <a href="#" className="hover:text-white">Digital Realm</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="bg-brand-dark py-4 border-t border-brand-surface/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center text-sm text-brand-text-secondary">
          <p>&copy; {new Date().getFullYear()} TeO Music Studio (S.M.T.). All rights reserved.</p>
          <p className="flex items-center space-x-1.5">
            <span>Powered by AI</span>
            <HeartIcon className="w-4 h-4 text-brand-secondary" />
            <span>Made with for music lovers</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;