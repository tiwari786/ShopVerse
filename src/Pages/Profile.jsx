import React, { useState } from 'react';
import { useAuth } from '../Context/AuthContext';
import toast from 'react-hot-toast';

const Profile = () => {
  const { user, login } = useAuth();
  const [editing, setEditing] = useState(false);
  const [changingPass, setChangingPass] = useState(false);
  const [formData, setFormData] = useState({
    username: user?.username || '',
    email: user?.email || '',
    contact: user?.contact || '',
  });
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleEditSave = () => {
    const updatedUser = { ...user, ...formData };
    login(updatedUser);
    localStorage.setItem('shopverse_user', JSON.stringify(updatedUser));
    toast.success("Profile updated!");
    setEditing(false);
  };

  const handlePasswordChange = () => {
    if (password !== user.password) {
      toast.error("Old password is incorrect ❌");
      return;
    }
    if (newPassword.length < 5) {
      toast.error("New password too short ❌");
      return;
    }

    const updatedUser = { ...user, password: newPassword };
    login(updatedUser);
    localStorage.setItem('shopverse_user', JSON.stringify(updatedUser));
    toast.success("Password changed!");
    setPassword('');
    setNewPassword('');
    setChangingPass(false);
  };

  return (
    <div className="p-6 max-w-xl mx-auto bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-blue-600">👤 My Profile</h2>
      {user ? (
        <>
          {!editing ? (
            <div className="space-y-3 text-gray-700">
              <p><strong>Name:</strong> {user.username}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Phone:</strong> {user.contact}</p>
              <div className="mt-4 flex gap-3">
                <button onClick={() => setEditing(true)} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer">Edit Profile</button>
                <button onClick={() => setChangingPass(true)} className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 cursor-pointer">Change Password</button>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <input type="text" name="username" value={formData.username} onChange={e => setFormData({ ...formData, username: e.target.value })} className="w-full border px-4 py-2 rounded" placeholder="Name" />
              <input type="email" name="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} className="w-full border px-4 py-2 rounded" placeholder="Email" />
              <input type="text" name="contact" value={formData.contact} onChange={e => setFormData({ ...formData, contact: e.target.value })} className="w-full border px-4 py-2 rounded" placeholder="Phone" />
              <div className="flex gap-3">
                <button onClick={handleEditSave} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 cursor-pointer">Save</button>
                <button onClick={() => setEditing(false)} className="bg-gray-300 text-black px-4 py-2 rounded cursor-pointer">Cancel</button>
              </div>
            </div>
          )}

          {changingPass && (
            <div className="mt-6 space-y-3">
              <h3 className="font-semibold text-lg">Change Password</h3>
              <input type="password" placeholder="Old Password" value={password} onChange={e => setPassword(e.target.value)} className="w-full border px-4 py-2 rounded" />
              <input type="password" placeholder="New Password" value={newPassword} onChange={e => setNewPassword(e.target.value)} className="w-full border px-4 py-2 rounded" />
              <div className="flex gap-3">
                <button onClick={handlePasswordChange} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 cursor-pointer">Update</button>
                <button onClick={() => setChangingPass(false)} className="bg-gray-300 px-4 py-2 rounded cursor-pointer">Cancel</button>
              </div>
            </div>
          )}
        </>
      ) : (
        <p className="text-gray-600">Please login to view your profile.</p>
      )}
    </div>
  );
};

export default Profile;
