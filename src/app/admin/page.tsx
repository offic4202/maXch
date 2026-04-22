'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { getAllUsers, getAllProfiles, getAllEvents, getAllConnections, verifyProfile, deactivateUser, getUserById, getProfileById, updateUserRole, rejectProfile, getPendingVerifications } from '@/lib/store';
import { User, Profile, Event, Connection, UserRole, ROLE_LABELS, ROLE_PRIVILEGES } from '@/lib/types';

export default function AdminPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [connections, setConnections] = useState<Connection[]>([]);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'members' | 'profiles' | 'events' | 'connections' | 'pending'>('dashboard');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showRoleModal, setShowRoleModal] = useState(false);

  const loadData = useCallback(() => {
    setUsers(getAllUsers());
    setProfiles(getAllProfiles());
    setEvents(getAllEvents());
    setConnections(getAllConnections());
  }, []);

  useEffect(() => {
    if (!user || (user.role !== 'admin' && user.role !== 'super_admin')) {
      router.push('/auth/login');
      return;
    }

    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadData();
  }, [user, router, loadData]);

  const handleVerifyProfile = (profileId: string) => {
    verifyProfile(profileId);
    loadData();
  };

  const handleRejectProfile = (profileId: string) => {
    const reason = prompt('Please provide a reason for rejection:');
    if (reason) {
      rejectProfile(profileId, reason);
      loadData();
    }
  };

  const handleDeactivateUser = (userId: string) => {
    if (confirm('Are you sure you want to deactivate this user?')) {
      deactivateUser(userId);
      loadData();
    }
  };

  const handleUpdateRole = (userId: string, newRole: UserRole) => {
    updateUserRole(userId, newRole);
    loadData();
    setShowRoleModal(false);
    setSelectedUser(null);
  };

  const pendingProfiles = profiles.filter(p => !p.isVerified);
  const verifiedProfiles = profiles.filter(p => p.isVerified);

  if (!user || (user.role !== 'admin' && user.role !== 'super_admin')) {
    return null;
  }

  return (
    <div className="min-h-screen py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Admin Panel</h1>
          <div className="flex items-center gap-4 flex-wrap">
            <span className={`px-3 py-1 rounded-full text-sm ${
              user.role === 'super_admin' ? 'bg-purple-900/30 text-purple-400' : 'bg-red-900/30 text-red-400'
            }`}>
              {ROLE_LABELS[user.role]}
            </span>
            {user.isVerified && (
              <span className="px-3 py-1 rounded-full text-sm bg-green-900/30 text-green-400">Verified</span>
            )}
          </div>
        </div>

        <div className="grid md:grid-cols-5 gap-4 mb-8">
          <div className="bg-[#1F1F1F] rounded-lg p-6 border border-white/5">
            <p className="text-[#A3A3A3] text-sm">Total Users</p>
            <p className="text-3xl font-bold text-white">{users.length}</p>
          </div>
          <div className="bg-[#1F1F1F] rounded-lg p-6 border border-white/5">
            <p className="text-[#A3A3A3] text-sm">Verified</p>
            <p className="text-3xl font-bold text-[#C9A962]">{profiles.filter(p => p.isVerified).length}</p>
          </div>
          <div className="bg-[#1F1F1F] rounded-lg p-6 border border-white/5">
            <p className="text-[#A3A3A3] text-sm">Pending</p>
            <p className="text-3xl font-bold text-yellow-400">{pendingProfiles.length}</p>
          </div>
          <div className="bg-[#1F1F1F] rounded-lg p-6 border border-white/5">
            <p className="text-[#A3A3A3] text-sm">Events</p>
            <p className="text-3xl font-bold text-white">{events.length}</p>
          </div>
          <div className="bg-[#1F1F1F] rounded-lg p-6 border border-white/5">
            <p className="text-[#A3A3A3] text-sm">Connections</p>
            <p className="text-3xl font-bold text-white">{connections.length}</p>
          </div>
        </div>

        <div className="flex gap-4 mb-8 border-b border-white/10 overflow-x-auto">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`pb-4 px-4 whitespace-nowrap transition-colors ${
              activeTab === 'dashboard'
                ? 'text-[#C9A962] border-b-2 border-[#C9A962]'
                : 'text-[#A3A3A3] hover:text-white'
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab('pending')}
            className={`pb-4 px-4 whitespace-nowrap transition-colors ${
              activeTab === 'pending'
                ? 'text-[#C9A962] border-b-2 border-[#C9A962]'
                : 'text-[#A3A3A3] hover:text-white'
            }`}
          >
            Pending {pendingProfiles.length > 0 && `(${pendingProfiles.length})`}
          </button>
          <button
            onClick={() => setActiveTab('members')}
            className={`pb-4 px-4 whitespace-nowrap transition-colors ${
              activeTab === 'members'
                ? 'text-[#C9A962] border-b-2 border-[#C9A962]'
                : 'text-[#A3A3A3] hover:text-white'
            }`}
          >
            Members
          </button>
          <button
            onClick={() => setActiveTab('profiles')}
            className={`pb-4 px-4 whitespace-nowrap transition-colors ${
              activeTab === 'profiles'
                ? 'text-[#C9A962] border-b-2 border-[#C9A962]'
                : 'text-[#A3A3A3] hover:text-white'
            }`}
          >
            Profiles
          </button>
          <button
            onClick={() => setActiveTab('events')}
            className={`pb-4 px-4 whitespace-nowrap transition-colors ${
              activeTab === 'events'
                ? 'text-[#C9A962] border-b-2 border-[#C9A962]'
                : 'text-[#A3A3A3] hover:text-white'
            }`}
          >
            Events
          </button>
          <button
            onClick={() => setActiveTab('connections')}
            className={`pb-4 px-4 whitespace-nowrap transition-colors ${
              activeTab === 'connections'
                ? 'text-[#C9A962] border-b-2 border-[#C9A962]'
                : 'text-[#A3A3A3] hover:text-white'
            }`}
          >
            Connections
          </button>
        </div>

        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            <div className="bg-[#1F1F1F] rounded-lg p-6 border border-white/5">
              <h2 className="text-xl font-semibold text-white mb-4">Your Privileges ({ROLE_LABELS[user.role]})</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {ROLE_PRIVILEGES[user.role].map((priv, i) => (
                  <div key={i} className="flex items-center gap-3 text-[#A3A3A3]">
                    <span className="w-6 h-6 rounded-full bg-[#C9A962]/20 text-[#C9A962] flex items-center justify-center flex-shrink-0 text-sm">✓</span>
                    {priv}
                  </div>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-[#1F1F1F] rounded-lg p-6 border border-white/5">
                <h3 className="text-white font-medium mb-4">Users by Role</h3>
                <div className="space-y-2">
                  {(['member', 'manager', 'studio_owner', 'admin', 'super_admin'] as UserRole[]).map(role => (
                    <div key={role} className="flex justify-between">
                      <span className="text-[#A3A3A3]">{ROLE_LABELS[role]}</span>
                      <span className="text-white font-medium">{users.filter(u => u.role === role).length}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-[#1F1F1F] rounded-lg p-6 border border-white/5">
                <h3 className="text-white font-medium mb-4">Profiles by State</h3>
                <div className="space-y-2">
                  {['Lagos', 'Abuja', 'Rivers'].map(state => (
                    <div key={state} className="flex justify-between">
                      <span className="text-[#A3A3A3]">{state}</span>
                      <span className="text-white font-medium">{profiles.filter(p => p.state === state).length}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-[#1F1F1F] rounded-lg p-6 border border-white/5">
                <h3 className="text-white font-medium mb-4">Events by Type</h3>
                <div className="space-y-2">
                  {['dating', 'charity', 'social'].map(type => (
                    <div key={type} className="flex justify-between">
                      <span className="text-[#A3A3A3] capitalize">{type}</span>
                      <span className="text-white font-medium">{events.filter(e => e.type === type).length}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'pending' && (
          <div className="space-y-4">
            {pendingProfiles.length === 0 ? (
              <div className="bg-[#1F1F1F] rounded-lg p-6 border border-white/5 text-center">
                <p className="text-[#A3A3A3]">No pending verifications</p>
              </div>
            ) : (
              pendingProfiles.map(profile => (
                <div key={profile.id} className="bg-[#1F1F1F] rounded-lg p-6 border border-white/5">
                  <div className="flex gap-4">
                    <img
                      src={profile.photos[0]}
                      alt={profile.name}
                      className="w-24 h-28 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-xl font-semibold text-white">{profile.name}</h3>
                          <p className="text-[#A3A3A3]">
                            {profile.dateOfBirth ? new Date().getFullYear() - new Date(profile.dateOfBirth).getFullYear() : '--'} years • {profile.gender}
                          </p>
                          <p className="text-[#A3A3A3] text-sm">{profile.location}, {profile.state}</p>
                        </div>
                        <span className="px-3 py-1 rounded-full text-sm bg-yellow-900/30 text-yellow-400">Pending</span>
                      </div>
                      <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                        <div><span className="text-[#A3A3A3]">ID:</span> <span className="text-white uppercase">{profile.idType}</span> - {profile.idNumber}</div>
                        <div><span className="text-[#A3A3A3]">Phone:</span> <span className="text-white">{profile.phone}</span></div>
                        <div><span className="text-[#A3A3A3]">LGA:</span> <span className="text-white">{profile.lga}</span></div>
                        <div><span className="text-[#A3A3A3]">Occupation:</span> <span className="text-white">{profile.occupation}</span></div>
                      </div>
                      <div className="mt-4 flex gap-4">
                        <button
                          onClick={() => handleVerifyProfile(profile.id)}
                          className="px-4 py-2 bg-green-900/30 text-green-400 rounded-lg hover:bg-green-900/50 transition-colors"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleRejectProfile(profile.id)}
                          className="px-4 py-2 bg-red-900/30 text-red-400 rounded-lg hover:bg-red-900/50 transition-colors"
                        >
                          Reject
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === 'members' && (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left text-[#A3A3A3] pb-4 px-4">Email</th>
                  <th className="text-left text-[#A3A3A3] pb-4 px-4">Role</th>
                  <th className="text-left text-[#A3A3A3] pb-4 px-4">Has Profile</th>
                  <th className="text-left text-[#A3A3A3] pb-4 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.id} className="border-b border-white/5">
                    <td className="py-4 px-4 text-white">{u.email}</td>
                    <td className="py-4 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        u.role === 'admin' ? 'bg-purple-900/30 text-purple-400' :
                        u.role === 'manager' ? 'bg-blue-900/30 text-blue-400' :
                        'bg-gray-900/30 text-gray-400'
                      }`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-[#A3A3A3]">
                      {u.profileId ? 'Yes' : 'No'}
                    </td>
                    <td className="py-4 px-4">
                      {u.role === 'member' && (
                        <button
                          onClick={() => handleDeactivateUser(u.id)}
                          className="text-red-400 hover:text-red-300 text-sm"
                        >
                          Deactivate
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'profiles' && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {profiles.map((profile) => (
              <div key={profile.id} className="bg-[#1F1F1F] rounded-lg overflow-hidden border border-white/5">
                <div className="flex gap-4 p-4">
                  <img
                    src={profile.photos[0]}
                    alt={profile.name}
                    className="w-20 h-24 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-white font-medium">{profile.name}</h3>
                        <p className="text-[#A3A3A3] text-sm">{profile.dateOfBirth ? new Date().getFullYear() - new Date(profile.dateOfBirth).getFullYear() : '--'} • {profile.gender}</p>
                      </div>
                      {profile.isVerified ? (
                        <span className="text-[#C9A962] text-xs">Verified</span>
                      ) : (
                        <button
                          onClick={() => handleVerifyProfile(profile.id)}
                          className="text-xs text-[#C9A962] hover:underline"
                        >
                          Verify
                        </button>
                      )}
                    </div>
                    <p className="text-[#A3A3A3] text-sm mt-2">{profile.lookingFor}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'events' && (
          <div className="space-y-4">
            {events.map((event) => (
              <div key={event.id} className="bg-[#1F1F1F] rounded-lg p-6 border border-white/5">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        event.type === 'charity' ? 'bg-emerald-900/30 text-emerald-400' :
                        event.type === 'dating' ? 'bg-pink-900/30 text-pink-400' :
                        'bg-blue-900/30 text-blue-400'
                      }`}>
                        {event.type}
                      </span>
                      <h3 className="text-white font-medium">{event.title}</h3>
                    </div>
                    <p className="text-[#A3A3A3] text-sm">{event.location}</p>
                    <p className="text-[#A3A3A3] text-sm">
                      {new Date(event.date).toLocaleDateString()} • {event.attendees.length}/{event.capacity} attendees
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'connections' && (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left text-[#A3A3A3] pb-4 px-4">From</th>
                  <th className="text-left text-[#A3A3A3] pb-4 px-4">To</th>
                  <th className="text-left text-[#A3A3A3] pb-4 px-4">Status</th>
                  <th className="text-left text-[#A3A3A3] pb-4 px-4">Date</th>
                </tr>
              </thead>
              <tbody>
                {connections.map((conn) => {
                  const fromUser = getUserById(conn.fromUserId);
                  const toUser = getUserById(conn.toUserId);
                  const fromProfile = getProfileById(conn.fromUserId);
                  const toProfile = getProfileById(conn.toUserId);
                  
                  return (
                    <tr key={conn.id} className="border-b border-white/5">
                      <td className="py-4 px-4 text-white">
                        {fromProfile?.name || fromUser?.email || 'Unknown'}
                      </td>
                      <td className="py-4 px-4 text-white">
                        {toProfile?.name || toUser?.email || 'Unknown'}
                      </td>
                      <td className="py-4 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          conn.status === 'accepted' ? 'bg-green-900/30 text-green-400' :
                          conn.status === 'pending' ? 'bg-yellow-900/30 text-yellow-400' :
                          'bg-red-900/30 text-red-400'
                        }`}>
                          {conn.status}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-[#A3A3A3]">
                        {new Date(conn.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}