
import React, { createContext, useState, ReactNode, useEffect, useRef } from 'react';
import { User, SubscriptionTier, UserProject } from '../types';
import { DEMO_ACCOUNTS, DAILY_POINT_ALLOWANCE } from '../constants';
import toast from 'react-hot-toast';

interface AuthContextType {
  user: User | null;
  allUsers: User[];
  login: (tier: SubscriptionTier) => void;
  logout: () => void;
  signUp: (name: string, email: string) => boolean;
  createUser: (newUser: Omit<User, 'projects' | 'memberSince' | 'avatarInitial'>) => boolean;
  updateUser: (updatedUser: User) => void;
  deleteUser: (email: string) => void;
  addUserProject: (project: UserProject) => void;
  isAdmin: boolean;
  adminLogin: (password: string) => boolean;
  adminLogout: () => void;
  changeAdminPassword: (current: string, newPass: string) => boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

const ADMIN_PASSWORD_KEY = "smt-admin-password";
const ADMIN_SESSION_KEY = "smt-admin-session";
const ALL_USERS_STORAGE_KEY = "smt-all-users-data";
const ALL_PROJECTS_STORAGE_KEY = "smt-all-projects-data";
const CURRENT_USER_EMAIL_KEY = "smt-current-user-email";

const getInitialUsers = (): User[] => {
    try {
        const storedUsersData = localStorage.getItem(ALL_USERS_STORAGE_KEY);
        const storedProjectsData = localStorage.getItem(ALL_PROJECTS_STORAGE_KEY);
        const allProjects: Record<string, UserProject[]> = storedProjectsData ? JSON.parse(storedProjectsData) : {};

        if (storedUsersData) {
            const users: Omit<User, 'projects'>[] = JSON.parse(storedUsersData);
            return users.map(u => ({
                ...u,
                projects: allProjects[u.email] || [],
            }));
        }
    } catch (error) {
        console.error("Failed to parse data from localStorage", error);
    }
    return Object.values(DEMO_ACCOUNTS);
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [allUsers, setAllUsers] = useState<User[]>(getInitialUsers);
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [adminPassword, setAdminPassword] = useState<string>('password');
  const demoTimerRef = useRef<number | null>(null);

  const updateUser = (updatedUser: User) => {
    const newAllUsers = allUsers.map(u => u.email === updatedUser.email ? updatedUser : u);
    setAllUsers(newAllUsers);
    if (user && user.email === updatedUser.email) {
        setUser(updatedUser);
    }
  };
  
  const processDailyPoints = (targetUser: User) => {
      const today = new Date().toISOString().split('T')[0];
      if (targetUser.lastLogin !== today) {
          const pointsToAdd = DAILY_POINT_ALLOWANCE[targetUser.tier] || 0;
          const updatedUser = { 
              ...targetUser, 
              points: targetUser.points + pointsToAdd,
              lastLogin: today 
          };
          updateUser(updatedUser);
          if (pointsToAdd > 0) {
              toast.success(`+${pointsToAdd} daily SMT Points!`);
          }
          return updatedUser;
      }
      return targetUser;
  };

  useEffect(() => {
    const currentUserEmail = sessionStorage.getItem(CURRENT_USER_EMAIL_KEY);
    if(currentUserEmail) {
        const rehydratedUser = allUsers.find(u => u.email === currentUserEmail);
        if (rehydratedUser) {
           const finalUser = processDailyPoints(rehydratedUser);
           setUser(finalUser);
        }
    }
  }, []);

  useEffect(() => {
    try {
        const usersToPersist = allUsers.map(({ projects, ...rest }) => rest);
        localStorage.setItem(ALL_USERS_STORAGE_KEY, JSON.stringify(usersToPersist));

        const projectsToPersist = allUsers.reduce((acc, currentUser) => {
            if (currentUser.projects && currentUser.projects.length > 0) {
                acc[currentUser.email] = currentUser.projects;
            }
            return acc;
        }, {} as Record<string, UserProject[]>);
        localStorage.setItem(ALL_PROJECTS_STORAGE_KEY, JSON.stringify(projectsToPersist));

    } catch (error) {
        console.error("Failed to save data to localStorage", error);
        if (error instanceof DOMException && (error.name === 'QuotaExceededError' || error.code === 22)) {
             toast.error("Local storage is full. Unable to save new project data.", { duration: 5000 });
        }
    }
  }, [allUsers]);

  useEffect(() => {
    const activeSession = sessionStorage.getItem(ADMIN_SESSION_KEY);
    if (activeSession === 'true') {
      setIsAdmin(true);
    }
    const storedPassword = sessionStorage.getItem(ADMIN_PASSWORD_KEY);
    if (storedPassword) {
        setAdminPassword(storedPassword);
    }
  }, []);

  const login = (tier: SubscriptionTier) => {
    let targetUser = allUsers.find(u => u.tier === tier && u.email.endsWith('@demo.com'));
    if (!targetUser) return;
    
    const finalUser = processDailyPoints(targetUser);
    setUser(finalUser);
    sessionStorage.setItem(CURRENT_USER_EMAIL_KEY, finalUser.email);
    
    if (finalUser.email.endsWith('@demo.com')) {
        if(demoTimerRef.current) clearTimeout(demoTimerRef.current);
        demoTimerRef.current = window.setTimeout(() => {
            logout();
            toast.success("Your 5-minute demo session has ended. Please sign up for a full experience!");
        }, 5 * 60 * 1000); // 5 minutes
    }
  };

  const logout = () => {
    if (demoTimerRef.current) {
        clearTimeout(demoTimerRef.current);
        demoTimerRef.current = null;
    }
    setUser(null);
    sessionStorage.removeItem(CURRENT_USER_EMAIL_KEY);
  };
  
  const signUp = (name: string, email: string): boolean => {
      if (allUsers.some(u => u.email.toLowerCase() === email.toLowerCase())) {
          toast.error("An account with this email already exists.");
          return false;
      }
      
      const newUser: User = {
          name,
          email,
          avatarInitial: name.charAt(0).toUpperCase(),
          tier: SubscriptionTier.FREE,
          points: 100,
          memberSince: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
          lastLogin: '',
          projects: []
      };
      
      setAllUsers(prev => [...prev, newUser]);
      const finalUser = processDailyPoints(newUser);
      setUser(finalUser);
      sessionStorage.setItem(CURRENT_USER_EMAIL_KEY, finalUser.email);
      return true;
  };
  
  const createUser = (newUser: Omit<User, 'projects' | 'memberSince' | 'avatarInitial'>): boolean => {
      if (allUsers.some(u => u.email.toLowerCase() === newUser.email.toLowerCase())) {
          toast.error("An account with this email already exists.");
          return false;
      }
      
      const userToAdd: User = {
          ...newUser,
          avatarInitial: newUser.name.charAt(0).toUpperCase(),
          memberSince: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
          projects: [],
      };
      setAllUsers(prev => [...prev, userToAdd]);
      return true;
  }

  const deleteUser = (email: string) => {
      if (user?.email === email) {
          logout();
      }
      setAllUsers(prev => prev.filter(u => u.email !== email));
  };


  const addUserProject = (project: UserProject) => {
    if (!user) {
        toast.error("You must be logged in to save projects.");
        return;
    }
    const updatedUser = {
        ...user,
        projects: [project, ...(user.projects || [])]
    };
    updateUser(updatedUser);
    toast.success(`'${project.title}' saved to My Projects!`);
  };
  
  const adminLogin = (password: string): boolean => {
    if (password === adminPassword) {
      sessionStorage.setItem(ADMIN_SESSION_KEY, 'true');
      setIsAdmin(true);
      return true;
    }
    return false;
  };

  const adminLogout = () => {
    sessionStorage.removeItem(ADMIN_SESSION_KEY);
    setIsAdmin(false);
  };
  
  const changeAdminPassword = (current: string, newPass: string): boolean => {
      if (current === adminPassword) {
          setAdminPassword(newPass);
          sessionStorage.setItem(ADMIN_PASSWORD_KEY, newPass);
          return true;
      }
      return false;
  }

  return (
    <AuthContext.Provider value={{ user, allUsers, login, logout, signUp, createUser, updateUser, deleteUser, addUserProject, isAdmin, adminLogin, adminLogout, changeAdminPassword }}>
      {children}
    </AuthContext.Provider>
  );
};
