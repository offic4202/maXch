'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getAllEvents, rsvpToEvent, cancelRsvp, getCurrentUser } from '@/lib/store';
import { useAuth } from '@/lib/auth-context';
import { Event } from '@/lib/types';

export default function EventsPage() {
  const { user } = useAuth();
  const [events, setEvents] = useState<Event[]>([]);
  const [filter, setFilter] = useState<'all' | 'charity' | 'dating' | 'social'>('all');

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setEvents(getAllEvents());
  }, []);

  const filteredEvents = filter === 'all' 
    ? events 
    : events.filter(e => e.type === filter);

  const handleRsvp = (eventId: string) => {
    if (!user) return;
    
    const event = events.find(e => e.id === eventId);
    if (!event) return;
    
    const isAttending = event.attendees.includes(user.id);
    
    if (isAttending) {
      cancelRsvp(eventId, user.id);
    } else {
      rsvpToEvent(eventId, user.id);
    }
    
    setEvents(getAllEvents());
  };

  return (
    <div className="min-h-screen py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-[#C9A962] tracking-[0.2em] uppercase mb-4">Upcoming</p>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Events & Experiences</h1>
          <p className="text-[#A3A3A3] max-w-xl mx-auto">
            Join our exclusive events for networking, charity, and meaningful connections
          </p>
        </div>

        <div className="flex justify-center gap-4 mb-12 flex-wrap">
          <button
            onClick={() => setFilter('all')}
            className={`px-6 py-3 rounded-full transition-all ${
              filter === 'all' 
                ? 'bg-[#C9A962] text-black' 
                : 'bg-[#1F1F1F] text-[#A3A3A3] hover:text-white'
            }`}
          >
            All Events
          </button>
          <button
            onClick={() => setFilter('charity')}
            className={`px-6 py-3 rounded-full transition-all ${
              filter === 'charity' 
                ? 'bg-emerald-600 text-white' 
                : 'bg-[#1F1F1F] text-[#A3A3A3] hover:text-white'
            }`}
          >
            Charity
          </button>
          <button
            onClick={() => setFilter('dating')}
            className={`px-6 py-3 rounded-full transition-all ${
              filter === 'dating' 
                ? 'bg-pink-600 text-white' 
                : 'bg-[#1F1F1F] text-[#A3A3A3] hover:text-white'
            }`}
          >
            Dating
          </button>
          <button
            onClick={() => setFilter('social')}
            className={`px-6 py-3 rounded-full transition-all ${
              filter === 'social' 
                ? 'bg-blue-600 text-white' 
                : 'bg-[#1F1F1F] text-[#A3A3A3] hover:text-white'
            }`}
          >
            Social
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => {
            const isAttending = user && event.attendees.includes(user.id);
            const spotsLeft = event.capacity - event.attendees.length;
            
            return (
              <div key={event.id} className="bg-[#1F1F1F] rounded-lg overflow-hidden border border-white/5 card-hover">
                <div className="relative h-40 flex items-center justify-center">
                  <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-sm font-medium ${
                    event.type === 'charity' ? 'bg-emerald-900/80 text-emerald-400' :
                    event.type === 'dating' ? 'bg-pink-900/80 text-pink-400' :
                    'bg-blue-900/80 text-blue-400'
                  }`}>
                    {event.type === 'charity' ? 'Charity' : event.type === 'dating' ? 'Dating' : 'Social'}
                  </div>
                  <svg className="w-16 h-16 text-white/10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-2">{event.title}</h3>
                  <p className="text-[#A3A3A3] text-sm mb-4 line-clamp-2">{event.description}</p>
                  
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center gap-2 text-sm text-[#A3A3A3]">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span>{new Date(event.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })} at {event.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-[#A3A3A3]">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span>{event.location}, {event.state}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-[#A3A3A3]">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span>{event.attendees.length} attending {spotsLeft > 0 ? `(${spotsLeft} spots left)` : '(Full)'}</span>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => handleRsvp(event.id)}
                    disabled={!user || spotsLeft <= 0}
                    className={`w-full py-3 rounded-lg font-medium transition-all ${
                      isAttending
                        ? 'bg-red-900/30 text-red-400 border border-red-900 hover:bg-red-900/50'
                        : spotsLeft <= 0
                        ? 'bg-white/10 text-white/50 cursor-not-allowed'
                        : 'btn-primary'
                    }`}
                  >
                    {isAttending ? 'Cancel RSVP' : spotsLeft <= 0 ? 'Event Full' : 'RSVP Now'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {filteredEvents.length === 0 && (
          <div className="text-center py-16">
            <p className="text-[#A3A3A3]">No events found in this category.</p>
          </div>
        )}

        <div className="mt-16 bg-[#1F1F1F] rounded-lg p-8 text-center">
          <h3 className="text-2xl font-semibold text-white mb-4">Host an Event?</h3>
          <p className="text-[#A3A3A3] mb-6">
            Are you interested in hosting events for our community? Contact us to discuss partnership opportunities.
          </p>
          <Link href="/auth/register" className="btn-secondary inline-block">
            Get in Touch
          </Link>
        </div>
      </div>
    </div>
  );
}