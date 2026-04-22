import Link from 'next/link';
import { getAllProfiles, getAllEvents } from '@/lib/store';

export default function Home() {
  const profiles = getAllProfiles().slice(0, 4);
  const events = getAllEvents().slice(0, 3);

  return (
    <div className="pattern-overlay">
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0D0D0D]/50 to-[#0D0D0D]" />
        
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#C9A962] rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#8B4513] rounded-full blur-[120px]" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <p className="text-[#C9A962] text-lg mb-6 tracking-[0.3em] uppercase" style={{ fontFamily: 'Cormorant Garamond' }}>
            Welcome to
          </p>
          <h1 className="text-6xl md:text-8xl font-bold mb-6">
            <span className="text-[#C9A962]">The</span>{' '}
            <span className="text-white">Maze</span>
            <br />
            <span className="text-white">Match</span>
          </h1>
          <p className="text-xl md:text-2xl text-[#A3A3A3] mb-10 max-w-2xl mx-auto" style={{ fontFamily: 'Cormorant Garamond' }}>
            Where refined gentlemen and ladies connect for meaningful relationships, events, and lasting partnerships
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/register" className="btn-primary text-lg px-8 py-4">
              Join The Maze
            </Link>
            <Link href="/profiles" className="btn-secondary text-lg px-8 py-4">
              Browse Members
            </Link>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-[#C9A962]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[#C9A962] tracking-[0.2em] uppercase mb-4">Why Choose Us</p>
            <h2 className="text-4xl md:text-5xl font-bold text-white">A Premium Experience</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-[#1F1F1F] p-8 rounded-lg border border-white/5 card-hover">
              <div className="w-16 h-16 rounded-full bg-[#C9A962]/10 flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-[#C9A962]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-white mb-4">Verified Profiles</h3>
              <p className="text-[#A3A3A3]">
                Every profile is carefully vetted to ensure authenticity. Connect with genuine people seeking meaningful connections.
              </p>
            </div>

            <div className="bg-[#1F1F1F] p-8 rounded-lg border border-white/5 card-hover">
              <div className="w-16 h-16 rounded-full bg-[#C9A962]/10 flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-[#C9A962]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-white mb-4">Exclusive Events</h3>
              <p className="text-[#A3A3A3]">
                From charity galas to dating mixers, our events provide elegant settings to meet like-minded individuals.
              </p>
            </div>

            <div className="bg-[#1F1F1F] p-8 rounded-lg border border-white/5 card-hover">
              <div className="w-16 h-16 rounded-full bg-[#C9A962]/10 flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-[#C9A962]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-white mb-4">Meaningful Connections</h3>
              <p className="text-[#A3A3A3]">
                We believe in quality over quantity. Our platform fosters deep, lasting relationships built on mutual respect.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-[#1A1A1A]/50">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
              <p className="text-[#C9A962] tracking-[0.2em] uppercase mb-4">Featured</p>
              <h2 className="text-4xl md:text-5xl font-bold text-white">Our Members</h2>
            </div>
            <Link href="/profiles" className="btn-secondary mt-6 md:mt-0">
              View All Members
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {profiles.map((profile) => (
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
                      <h3 className="text-xl font-semibold text-white">{profile.name}</h3>
                      <p className="text-[#A3A3A3]">{profile.dateOfBirth ? new Date().getFullYear() - new Date(profile.dateOfBirth).getFullYear() : '--'} • {profile.location}</p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
              <p className="text-[#C9A962] tracking-[0.2em] uppercase mb-4">Upcoming</p>
              <h2 className="text-4xl md:text-5xl font-bold text-white">Events & Experiences</h2>
            </div>
            <Link href="/events" className="btn-secondary mt-6 md:mt-0">
              All Events
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {events.map((event) => (
              <Link href="/events" key={event.id} className="group">
                <div className="bg-[#1F1F1F] rounded-lg overflow-hidden border border-white/5 card-hover h-full">
                  <div className="relative h-48">
                    <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-sm font-medium ${
                      event.type === 'charity' ? 'bg-emerald-900/80 text-emerald-400' :
                      event.type === 'dating' ? 'bg-pink-900/80 text-pink-400' :
                      'bg-blue-900/80 text-blue-400'
                    }`}>
                      {event.type === 'charity' ? 'Charity' : event.type === 'dating' ? 'Dating' : 'Social'}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-[#C9A962] transition-colors">{event.title}</h3>
                    <p className="text-[#A3A3A3] text-sm mb-4 line-clamp-2">{event.description}</p>
                    <div className="flex items-center gap-4 text-sm text-[#A3A3A3]">
                      <span>{new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                      <span>•</span>
                      <span>{event.location}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-gradient-to-b from-[#0D0D0D] to-[#1A1A1A]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Begin Your Journey
          </h2>
          <p className="text-xl text-[#A3A3A3] mb-10">
            Join thousands of refined individuals who have found connection through The Maze Match.
          </p>
          <Link href="/auth/register" className="btn-primary text-lg px-10 py-4 inline-block">
            Create Your Profile
          </Link>
        </div>
      </section>

      <footer className="py-16 px-6 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#C9A962] to-[#8B4513] flex items-center justify-center">
                <span className="text-black font-bold text-lg" style={{ fontFamily: 'Playfair Display' }}>M</span>
              </div>
              <span className="text-xl font-semibold text-white" style={{ fontFamily: 'Playfair Display' }}>
                The Maze Match
              </span>
            </div>
            <p className="text-[#A3A3A3] text-sm">
              © 2026 The Maze Match. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link href="/profiles" className="text-[#A3A3A3] hover:text-[#C9A962] transition-colors text-sm">
                Members
              </Link>
              <Link href="/events" className="text-[#A3A3A3] hover:text-[#C9A962] transition-colors text-sm">
                Events
              </Link>
              <Link href="/auth/login" className="text-[#A3A3A3] hover:text-[#C9A962] transition-colors text-sm">
                Login
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}