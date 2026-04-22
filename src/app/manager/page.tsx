'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { getAllEvents, createEvent, getUserById, getProfileById } from '@/lib/store';
import { Event, EventType } from '@/lib/types';
import { NIGERIAN_STATES } from '@/lib/types';

export default function ManagerPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [events, setEvents] = useState<Event[]>([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'social' as EventType,
    date: '',
    time: '',
    location: '',
    state: '',
    capacity: 50,
  });

  useEffect(() => {
    if (!user || (user.role !== 'manager' && user.role !== 'admin')) {
      router.push('/auth/login');
      return;
    }

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setEvents(getAllEvents());
  }, [user, router]);

  const handleCreateEvent = (e: React.FormEvent) => {
    e.preventDefault();
    
    createEvent({
      ...formData,
      createdBy: user!.id,
    });

    setEvents(getAllEvents());
    setShowCreateForm(false);
    setFormData({
      title: '',
      description: '',
      type: 'social',
      date: '',
      time: '',
      location: '',
      state: '',
      capacity: 50,
    });
  };

  if (!user || (user.role !== 'manager' && user.role !== 'admin')) {
    return null;
  }

  return (
    <div className="min-h-screen py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Manager Panel</h1>
            <p className="text-[#A3A3A3]">Manage events</p>
          </div>
          <button
            onClick={() => setShowCreateForm(!showCreateForm)}
            className="btn-primary"
          >
            {showCreateForm ? 'Cancel' : 'Create Event'}
          </button>
        </div>

        {showCreateForm && (
          <div className="bg-[#1F1F1F] rounded-lg p-6 border border-white/5 mb-8">
            <h2 className="text-xl font-semibold text-white mb-6">Create New Event</h2>
            <form onSubmit={handleCreateEvent} className="space-y-4">
              <div>
                <label className="block text-white mb-2">Event Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="input-field"
                  placeholder="Event title"
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white mb-2">Event Type</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value as EventType })}
                    className="input-field"
                  >
                    <option value="social">Social</option>
                    <option value="dating">Dating</option>
                    <option value="charity">Charity</option>
                  </select>
                </div>
                <div>
                  <label className="block text-white mb-2">Capacity</label>
                  <input
                    type="number"
                    value={formData.capacity}
                    onChange={(e) => setFormData({ ...formData, capacity: parseInt(e.target.value) })}
                    className="input-field"
                    min="1"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-white mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="input-field h-24"
                  placeholder="Event description"
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white mb-2">Date</label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="input-field"
                    required
                  />
                </div>
                <div>
                  <label className="block text-white mb-2">Time</label>
                  <input
                    type="time"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="input-field"
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white mb-2">Location</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="input-field"
                    placeholder="Venue name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-white mb-2">State</label>
                  <select
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="input-field"
                    required
                  >
                    <option value="">Select state</option>
                    {NIGERIAN_STATES.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>

              <button type="submit" className="btn-primary w-full">
                Create Event
              </button>
            </form>
          </div>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => {
            const creator = getUserById(event.createdBy);
            return (
              <div key={event.id} className="bg-[#1F1F1F] rounded-lg overflow-hidden border border-white/5">
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      event.type === 'charity' ? 'bg-emerald-900/30 text-emerald-400' :
                      event.type === 'dating' ? 'bg-pink-900/30 text-pink-400' :
                      'bg-blue-900/30 text-blue-400'
                    }`}>
                      {event.type}
                    </span>
                    <span className="text-[#A3A3A3] text-xs">
                      {event.attendees.length}/{event.capacity} attending
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-white mb-2">{event.title}</h3>
                  <p className="text-[#A3A3A3] text-sm mb-4 line-clamp-2">{event.description}</p>
                  
                  <div className="space-y-2 text-sm text-[#A3A3A3]">
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span>{new Date(event.date).toLocaleDateString()} at {event.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span>{event.location}, {event.state}</span>
                    </div>
                  </div>

                  {event.attendees.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-white/5">
                      <p className="text-[#A3A3A3] text-xs mb-2">Attendees:</p>
                      <div className="flex flex-wrap gap-1">
                        {event.attendees.slice(0, 5).map((userId) => {
                          const profile = getProfileById(userId);
                          return (
                            <img
                              key={userId}
                              src={profile?.photos[0] || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop'}
                              alt={profile?.name || 'User'}
                              className="w-8 h-8 rounded-full object-cover"
                              title={profile?.name}
                            />
                          );
                        })}
                        {event.attendees.length > 5 && (
                          <span className="w-8 h-8 rounded-full bg-[#1A1A1A] flex items-center justify-center text-xs text-[#A3A3A3]">
                            +{event.attendees.length - 5}
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {events.length === 0 && (
          <div className="text-center py-12">
            <p className="text-[#A3A3A3]">No events yet. Create your first event!</p>
          </div>
        )}
      </div>
    </div>
  );
}