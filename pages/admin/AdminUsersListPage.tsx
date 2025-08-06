
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { ArrowRightIcon, StarIcon, CrownIcon } from '../../components/icons';
import { SubscriptionTier } from '../../types';

const AdminUsersListPage: React.FC = () => {
  const { allUsers } = useAuth();

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-8">Manage Users</h1>
      <div className="bg-brand-bg p-6 rounded-lg">
        <div className="space-y-4">
          {allUsers.map(user => (
            <div key={user.email} className="bg-brand-surface p-4 rounded-lg flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-white bg-brand-primary`}>
                    {user.avatarInitial}
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-white">{user.name}</h2>
                  <p className="text-sm text-brand-text-secondary">{user.email}</p>
                </div>
              </div>
              <div className="flex items-center space-x-6">
                <div className="text-right">
                    <div className="flex items-center justify-end space-x-1 font-semibold text-white">
                        <span>{user.tier}</span>
                        {user.tier === SubscriptionTier.PREMIUM && <StarIcon className="w-4 h-4 text-brand-accent" />}
                        {user.tier === SubscriptionTier.VIP && <CrownIcon className="w-4 h-4 text-yellow-400" />}
                    </div>
                    <p className="text-sm text-brand-text-secondary">{user.points.toLocaleString()} Points</p>
                </div>
                <Link
                  to={`/admin/users/${user.email}/edit`}
                  className="flex items-center space-x-2 text-brand-primary hover:text-white transition-colors"
                >
                  <span>Edit</span>
                  <ArrowRightIcon className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminUsersListPage;
