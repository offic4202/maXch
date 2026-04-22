'use client';

import { useState } from 'react';
import Link from 'next/link';
import { getAllProfiles } from '@/lib/store';
import { Profile } from '@/lib/types';

export default function ProfilesPage() {
  const profiles = getAllProfiles();
  const [filter, setFilter] = useState<'all' | 'male' | 'female'>('all');

  const filteredProfiles = filter === 'all' 
    ? profiles 
    : profiles.filter(p => p.gender === filter);

  return (
    <div className="min-h-screen py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-[#C9A962] tracking-[0.2em] uppercase mb-4">Discover</p>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Our Members</h1>
          <p className="text-[#A3A3A3] max-w-xl mx-auto">
            Connect with refined gentlemen and ladies seeking meaningful connections
          </p>
        </div>

        <div className="flex justify-center gap-4 mb-12">
          <button
            onClick={() => setFilter('all')}
            className={`px-6 py-3 rounded-full transition-all ${
              filter === 'all' 
                ? 'bg-[#C9A962] text-black' 
                : 'bg-[#1F1F1F] text-[#A3A3A3] hover:text-white'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('female')}
            className={`px-6 py-3 rounded-full transition-all ${
              filter === 'female' 
                ? 'bg-[#C9A962] text-black' 
                : 'bg-[#1F1F1F] text-[#A3A3A3] hover:text-white'
            }`}
          >
            Ladies
          </button>
          <button
            onClick={() => setFilter('male')}
            className={`px-6 py-3 rounded-full transition-all ${
              filter === 'male' 
                ? 'bg-[#C9A962] text-black' 
                : 'bg-[#1F1F1F] text-[#A3A3A3] hover:text-white'
            }`}
          >
            Gentlemen
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProfiles.map((profile) => (
            <Link href={`/profiles/${profile.id}`} key={profile.id} className="group">
              <div className="bg-[#1F1F1F] rounded-lg overflow-hidden border border-white/5 card-hover">
                <div className="aspect-[3/4] relative overflow-hidden">
                  <img
                    src={profile.photos[0]}
                    alt={profile.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-xl font-semibold text-white">{profile.name}</h3>
                      {profile.isVerified && (
                        <svg className="w-4 h-4 text-[#C9A962]" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                    <p className="text-[#A3A3A3]">{profile.dateOfBirth ? new Date().getFullYear() - new Date(profile.dateOfBirth).getFullYear() : '--'} • {profile.location}</p>
                  </div>
                </div>
                <div className="p-4 border-t border-white/5">
                  <div className="flex flex-wrap gap-2">
                    {profile.interests.slice(0, 3).map((interest) => (
                      <span key={interest} className="text-xs px-2 py-1 bg-white/5 rounded-full text-[#A3A3A3]">
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filteredProfiles.length === 0 && (
          <div className="text-center py-16">
            <p className="text-[#A3A3A3]">No profiles found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
}