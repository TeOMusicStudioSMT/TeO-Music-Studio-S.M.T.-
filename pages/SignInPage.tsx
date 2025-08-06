
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { SubscriptionTier } from '../types';
import { ArrowRightIcon, GoogleIcon, AppleIcon, FacebookIcon } from '../components/icons';
import toast from 'react-hot-toast';

const SignInPage: React.FC = () => {
  const [email, setEmail] = useState('tecadmin');
  const [password, setPassword] = useState('password');
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleDemoLogin = (tier: SubscriptionTier) => {
    login(tier);
    navigate('/');
  };

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === 'tecadmin' && password === 'password') {
        handleDemoLogin(SubscriptionTier.VIP);
    } else {
        alert('Invalid credentials for demo sign in. Please use a demo account button.');
    }
  };
  
  const handleSocialLoginClick = () => {
      toast.success("Social login is for demonstration purposes. Please use a demo account or sign up.", {
          duration: 4000,
      });
  }

  const DemoButton: React.FC<{ tier: SubscriptionTier; label: string; className: string }> = ({ tier, label, className }) => (
    <button
        onClick={() => handleDemoLogin(tier)}
        className={`w-full py-2 rounded-lg font-semibold transition-opacity hover:opacity-90 ${className}`}
    >
        {label}
    </button>
  );
  
  const SocialButton: React.FC<{ icon: React.ReactNode; label: string; onClick: () => void; }> = ({ icon, label, onClick }) => (
    <button
        onClick={onClick}
        className="flex-1 flex items-center justify-center gap-3 bg-brand-surface text-white py-3 rounded-lg hover:bg-brand-primary/50 transition-colors"
    >
        {icon}
        <span className="text-sm font-semibold">{label}</span>
    </button>
  );

  return (
    <div className="bg-brand-dark min-h-screen flex items-center justify-center p-4" style={{
      backgroundImage: `radial-gradient(circle at top left, rgba(138, 66, 219, 0.2) 0%, transparent 30%), radial-gradient(circle at bottom right, rgba(217, 74, 140, 0.2) 0%, transparent 30%)`
    }}>
      <div className="w-full max-w-md mx-auto bg-brand-bg rounded-2xl shadow-2xl shadow-brand-primary/10 p-8">
        <h2 className="text-3xl font-bold text-center text-white mb-8">Sign In</h2>
        <form onSubmit={handleSignIn} className="space-y-6">
          <div>
            <label className="text-sm font-medium text-brand-text-secondary mb-2 block">Email Address</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-brand-surface rounded-lg px-4 py-3 text-white border border-transparent focus:outline-none focus:ring-2 focus:ring-brand-primary"
            />
          </div>
          <div>
             <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium text-brand-text-secondary">Password</label>
                <Link to="#" className="text-sm text-brand-primary hover:underline">Forgot your password?</Link>
             </div>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-brand-surface rounded-lg px-4 py-3 text-white border border-transparent focus:outline-none focus:ring-2 focus:ring-brand-primary"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 px-4 flex items-center text-brand-text-secondary"
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>
          <button type="submit" className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-brand-primary to-brand-secondary text-white font-semibold px-6 py-3 rounded-lg text-lg hover:opacity-90 transition-opacity">
            <span>Sign In</span>
            <ArrowRightIcon className="w-5 h-5"/>
          </button>
        </form>

        <div className="my-6 flex items-center">
            <div className="flex-grow border-t border-brand-surface"></div>
            <span className="flex-shrink mx-4 text-xs text-brand-text-secondary">Or continue with</span>
            <div className="flex-grow border-t border-brand-surface"></div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
             <SocialButton 
                icon={<GoogleIcon className="w-5 h-5" />} 
                label="Google" 
                onClick={handleSocialLoginClick}
            />
            <SocialButton 
                icon={<AppleIcon className="w-5 h-5" />} 
                label="Apple" 
                onClick={handleSocialLoginClick}
            />
            <SocialButton 
                icon={<FacebookIcon className="w-5 h-5" />} 
                label="Facebook" 
                onClick={handleSocialLoginClick}
            />
        </div>

        <div className="mt-8 text-center">
            <p className="text-brand-text-secondary text-sm mb-4">Try Demo Accounts:</p>
            <div className="grid grid-cols-2 gap-4">
                <DemoButton tier={SubscriptionTier.FREE} label="Free Demo" className="bg-gray-600 text-white" />
                <DemoButton tier={SubscriptionTier.BASIC} label="Basic Demo" className="bg-blue-600 text-white" />
                <DemoButton tier={SubscriptionTier.PREMIUM} label="Premium Demo" className="bg-purple-600 text-white" />
                <DemoButton tier={SubscriptionTier.VIP} label="VIP Demo" className="bg-yellow-600 text-black" />
            </div>
        </div>

        <p className="text-center text-sm text-brand-text-secondary mt-8">
          Don't have an account? <Link to="/signup" className="font-medium text-brand-primary hover:underline">Create one now</Link>
        </p>
         <p className="text-center text-xs text-brand-text-secondary mt-6">
          By signing in, you agree to our <Link to="#" className="underline">Terms of Service</Link> and <Link to="#" className="underline">Privacy Policy</Link>
        </p>
      </div>
    </div>
  );
};

export default SignInPage;
