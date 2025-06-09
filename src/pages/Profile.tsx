
import React from 'react';
import UserProfile from '@/components/profile/UserProfile';

export default function ProfilePage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Mi Perfil</h1>
      <UserProfile />
    </div>
  );
}
