// pages/Profile.jsx
import React from 'react';
import { useAuth } from '../Context/AuthContext';

const Profile = () => {
  const { user } = useAuth();

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">My Profile</h2>
      {user ? (
        <div className="space-y-3 text-gray-700">
          <p><strong>Name:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Phone:</strong> {user.contact}</p>
        </div>
      ) : (
        <p>Please login to view your profile.</p>
      )}
    </div>
  );
};

export default Profile;
