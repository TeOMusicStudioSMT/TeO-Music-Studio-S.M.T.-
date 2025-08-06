
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { ArrowRightIcon } from '../components/icons';
import toast from 'react-hot-toast';

const SignUpPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password || !confirmPassword) {
        toast.error("Please fill out all fields.");
        return;
    }
    if (password !== confirmPassword) {
        toast.error("Passwords do not match.");
        return;
    }
    if (password.length < 6) {
        toast.error("Password must be at least 6 characters long.");
        return;
    }
    
    const success = signUp(name, email);
    if (success) {
        toast.success(`Welcome, ${name}! Your account has been created.`);
        navigate('/');
    }
  };

  return (
    <div className="bg-brand-dark min-h-screen flex items-center justify-center p-4" style={{
      backgroundImage: `radial-gradient(circle at top right, rgba(138, 66, 219, 0.2) 0%, transparent, 30%), radial-gradient(circle at bottom left, rgba(217, 74, 140, 0.2) 0%, transparent 30%)`
    }}>
      <div className="w-full max-w-md mx-auto bg-brand-bg rounded-2xl shadow-2xl shadow-brand-primary/10 p-8">
        <h2 className="text-3xl font-bold text-center text-white mb-8">Create Account</h2>
        <form onSubmit={handleSignUp} className="space-y-6">
          <div>
            <label className="text-sm font-medium text-brand-text-secondary mb-2 block">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-brand-surface rounded-lg px-4 py-3 text-white border border-transparent focus:outline-none focus:ring-2 focus:ring-brand-primary"
              placeholder="Your Name"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-brand-text-secondary mb-2 block">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-brand-surface rounded-lg px-4 py-3 text-white border border-transparent focus:outline-none focus:ring-2 focus:ring-brand-primary"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-brand-text-secondary mb-2 block">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-brand-surface rounded-lg px-4 py-3 text-white border border-transparent focus:outline-none focus:ring-2 focus:ring-brand-primary"
                placeholder="6+ characters"
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
           <div>
            <label className="text-sm font-medium text-brand-text-secondary mb-2 block">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full bg-brand-surface rounded-lg px-4 py-3 text-white border border-transparent focus:outline-none focus:ring-2 focus:ring-brand-primary"
              placeholder="Retype your password"
            />
          </div>
          <button type="submit" className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-brand-primary to-brand-secondary text-white font-semibold px-6 py-3 rounded-lg text-lg hover:opacity-90 transition-opacity">
            <span>Sign Up</span>
            <ArrowRightIcon className="w-5 h-5"/>
          </button>
        </form>

        <p className="text-center text-sm text-brand-text-secondary mt-8">
          Already have an account? <Link to="/signin" className="font-medium text-brand-primary hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
