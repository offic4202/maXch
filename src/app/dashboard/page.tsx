'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import { getConnectionsForUser, getPendingRequests, respondToConnection, getAllEvents, getProfileById } from '@/lib/store';
import { Connection, Event, ROLE_LABELS } from '@/lib/types';

export default function DashboardPage() {
  const router = useRouter();
  const { user, profile, refreshProfile } = useAuth();
  const [connections, setConnections] = useState<Connection[]>([]);
  const [requests, setRequests] = useState<Connection[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [activeTab, setActiveTab] = useState<'overview' | 'connections' | 'events'>('overview');

  useEffect(() => {
    if (!user) {
      router.push('/auth/login');
      return;
    }

    if (profile && user.profileId !== profile.id && !profile) {
      router.push('/auth/register');
    }
  }, [user, profile, router]);

  useEffect(() => {
    if (user) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setConnections(getConnectionsForUser(user.id));
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setRequests(getPendingRequests(user.id));
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setEvents(getAllEvents().filter(e => e.attendees.includes(user.id)));
    }
  }, [user]);

  const handleRespond = (connectionId: string, status: 'accepted' | 'rejected') => {
    respondToConnection(connectionId, status);
    setConnections(getConnectionsForUser(user?.id || ''));
    setRequests(getPendingRequests(user?.id || ''));
  };

  if (!user) {
    return null;
  }

  const hasProfile = !!profile;
  const canCreateProfile = !profile && user.isVerified;

  return (
    <div className="min-h-screen py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Welcome, {profile?.name || 'Member'}
          </h1>
          <div className="flex items-center gap-4 flex-wrap">
            <span className={`px-3 py-1 rounded-full text-sm ${
              user.role === 'super_admin' ? 'bg-purple-900/30 text-purple-400' :
              user.role === 'admin' ? 'bg-red-900/30 text-red-400' :
              user.role === 'manager' ? 'bg-blue-900/30 text-blue-400' :
              user.role === 'studio_owner' ? 'bg-green-900/30 text-green-400' :
              'bg-[#C9A962]/20 text-[#C9A962]'
            }`}>
              {ROLE_LABELS[user.role]}
            </span>
            {!profile?.isVerified && (
              <span className="px-3 py-1 rounded-full text-sm bg-yellow-900/30 text-yellow-400">
                Pending Verification
              </span>
            )}
            {profile?.isVerified && (
              <span className="px-3 py-1 rounded-full text-sm bg-green-900/30 text-green-400">
                Verified
              </span>
            )}
          </div>
        </div>

        {!hasProfile && (
          <div className="bg-[#C9A962]/10 border border-[#C9A962] rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-white mb-2">Complete Your Profile</h2>
            {canCreateProfile ? (
              <>
                <p className="text-[#A3A3A3] mb-4">Create your profile to start connecting with others.</p>
                <Link href="/auth/register" className="btn-primary inline-block">
                  Create Profile
                </Link>
              </>
            ) : (
              <p className="text-[#C9A962]">Your account is pending verification. You&apos;ll be able to create your profile once approved.</p>
            )}
          </div>
        )}

        <div className="flex gap-4 mb-8 border-b border-white/10">
          <button
            onClick={() => setActiveTab('overview')}
            className={`pb-4 px-2 transition-colors ${
              activeTab === 'overview'
                ? 'text-[#C9A962] border-b-2 border-[#C9A962]'
                : 'text-[#A3A3A3] hover:text-white'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('connections')}
            className={`pb-4 px-2 transition-colors ${
              activeTab === 'connections'
                ? 'text-[#C9A962] border-b-2 border-[#C9A962]'
                : 'text-[#A3A3A3] hover:text-white'
            }`}
          >
            Connections {connections.length > 0 && `(${connections.length})`}
          </button>
          <button
            onClick={() => setActiveTab('events')}
            className={`pb-4 px-2 transition-colors ${
              activeTab === 'events'
                ? 'text-[#C9A962] border-b-2 border-[#C9A962]'
                : 'text-[#A3A3A3] hover:text-white'
            }`}
          >
            My Events {events.length > 0 && `(${events.length})`}
          </button>
        </div>

        {activeTab === 'overview' && (
          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              {hasProfile ? (
                <div className="bg-[#1F1F1F] rounded-lg overflow-hidden border border-white/5">
                  <div className="flex gap-6 p-6">
                    <img
                      src={profile?.photos[0]}
                      alt={profile?.name}
                      className="w-40 h-48 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-2xl font-semibold text-white">{profile?.name}</h3>
                          <p className="text-[#A3A3A3]">{profile?.dateOfBirth ? new Date().getFullYear() - new Date(profile.dateOfBirth).getFullYear() : '--'} • {profile?.location}</p>
                        </div>
                        {profile?.isVerified && (
                          <span className="flex items-center gap-1 text-[#C9A962] text-sm">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            Verified
                          </span>
                        )}
                      </div>
                      <p className="text-[#A3A3A3] mb-4 line-clamp-3">{profile?.bio}</p>
                      <div className="flex flex-wrap gap-2">
                        {profile?.interests.slice(0, 5).map((interest) => (
                          <span key={interest} className="text-xs px-2 py-1 bg-white/5 rounded-full text-[#A3A3A3]">
                            {interest}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-[#1F1F1F] rounded-lg p-6 border border-white/5 text-center">
                  <p className="text-[#A3A3A3]">No profile yet.</p>
                </div>
              )}
            </div>

            <div className="space-y-6">
              <div className="bg-[#1F1F1F] rounded-lg p-6 border border-white/5">
                <h3 className="text-lg font-semibold text-white mb-4">Quick Stats</h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-[#A3A3A3]">Connections</span>
                    <span className="text-white font-medium">{connections.filter(c => c.status === 'accepted').length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#A3A3A3]">Pending Requests</span>
                    <span className="text-white font-medium">{requests.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#A3A3A3]">Events Attending</span>
                    <span className="text-white font-medium">{events.length}</span>
                  </div>
                </div>
              </div>

              {requests.length > 0 && (
                <div className="bg-[#1F1F1F] rounded-lg p-6 border border-white/5">
                  <h3 className="text-lg font-semibold text-white mb-4">Connection Requests</h3>
                  <div className="space-y-3">
                    {requests.slice(0, 3).map((request) => {
                      const otherProfile = getProfileById(request.fromUserId);
                      return (
                        <div key={request.id} className="flex items-center gap-3">
                          <img
                            src={otherProfile?.photos[0] || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop'}
                            alt="User"
                            className="w-10 h-10 rounded-full object-cover"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-white text-sm truncate">{otherProfile?.name || 'User'}</p>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleRespond(request.id, 'accepted')}
                              className="w-8 h-8 rounded-full bg-green-900/30 text-green-400 hover:bg-green-900/50 flex items-center justify-center"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            </button>
                            <button
                              onClick={() => handleRespond(request.id, 'rejected')}
                              className="w-8 h-8 rounded-full bg-red-900/30 text-red-400 hover:bg-red-900/50 flex items-center justify-center"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'connections' && (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white mb-4">Your Connections</h3>
            {connections.filter(c => c.status === 'accepted').length === 0 ? (
              <div className="bg-[#1F1F1F] rounded-lg p-6 border border-white/5 text-center">
                <p className="text-[#A3A3A3] mb-4">No connections yet.</p>
                <Link href="/profiles" className="btn-secondary inline-block">
                  Browse Members
                </Link>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {connections.filter(c => c.status === 'accepted').map((conn) => {
                  const otherProfile = getProfileById(conn.fromUserId === user.id ? conn.toUserId : conn.fromUserId);
                  return (
                    <Link key={conn.id} href={`/profiles/${otherProfile?.id}`} className="bg-[#1F1F1F] rounded-lg p-4 border border-white/5 card-hover flex items-center gap-4">
                      <img
                        src={otherProfile?.photos[0] || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop'}
                        alt={otherProfile?.name}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      <div>
                        <p className="text-white font-medium">{otherProfile?.name}</p>
                        <p className="text-[#A3A3A3] text-sm">{otherProfile?.location}</p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {activeTab === 'events' && (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white mb-4">Events You&apos;re Attending</h3>
            {events.length === 0 ? (
              <div className="bg-[#1F1F1F] rounded-lg p-6 border border-white/5 text-center">
                <p className="text-[#A3A3A3] mb-4">No events yet.</p>
                <Link href="/events" className="btn-secondary inline-block">
                  Browse Events
                </Link>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {events.map((event) => (
                  <div key={event.id} className="bg-[#1F1F1F] rounded-lg p-4 border border-white/5">
                    <span className={`inline-block px-2 py-1 rounded-full text-xs mb-2 ${
                      event.type === 'charity' ? 'bg-emerald-900/30 text-emerald-400' :
                      event.type === 'dating' ? 'bg-pink-900/30 text-pink-400' :
                      'bg-blue-900/30 text-blue-400'
                    }`}>
                      {event.type}
                    </span>
                    <h4 className="text-white font-medium mb-1">{event.title}</h4>
                    <p className="text-[#A3A3A3] text-sm">
                      {new Date(event.date).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}