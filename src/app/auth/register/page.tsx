'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { registerUser, createProfile } from '@/lib/store';
import { useAuth } from '@/lib/auth-context';
import { NIGERIAN_STATES, INTERESTS, ID_TYPES, UserRole, ROLE_LABELS } from '@/lib/types';

export default function RegisterPage() {
  const router = useRouter();
  const { login, refreshProfile } = useAuth();
  const [step, setStep] = useState(1);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole>('member');

  const [name, setName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [phone, setPhone] = useState('');
  const [idType, setIdType] = useState<string>('nin');
  const [idNumber, setIdNumber] = useState('');
  const [lga, setLga] = useState('');
  const [location, setLocation] = useState('');
  const [state, setState] = useState('');
  const [occupation, setOccupation] = useState('');
  const [education, setEducation] = useState('');
  const [bio, setBio] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [lookingFor, setLookingFor] = useState<'marriage' | 'dating' | 'networking'>('marriage');

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    const user = registerUser(email, password, selectedRole);
    if (user) {
      login(email, password);
    } else {
      setError('Email already registered');
      return;
    }
  };

  const handleCreateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const user = registerUser(email, password, selectedRole);
    if (!user) {
      setError('Email already registered');
      return;
    }

    const profile = createProfile({
      userId: user.id,
      name,
      dateOfBirth,
      gender,
      phone,
      idType: idType as 'nin' | 'bvn' | 'passport' | 'drivers_license',
      idNumber,
      lga,
      location,
      state,
      occupation,
      education,
      bio,
      photos: photoUrl ? [photoUrl] : ['https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop'],
      interests: selectedInterests,
      lookingFor,
    });

    login(email, password);
    refreshProfile();
    router.push('/auth/register-success');
  };

  const toggleInterest = (interest: string) => {
    setSelectedInterests(prev => 
      prev.includes(interest) 
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  if (step === 1) {
    return (
      <div className="min-h-screen flex items-center justify-center py-12 px-6">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#C9A962] to-[#8B4513] flex items-center justify-center">
                <span className="text-black font-bold text-xl" style={{ fontFamily: 'Playfair Display' }}>M</span>
              </div>
            </Link>
            <h1 className="text-3xl font-bold text-white mb-2">Join The Maze</h1>
            <p className="text-[#A3A3A3]">Create your account</p>
          </div>

          <form onSubmit={handleRegister} className="space-y-6">
            {error && (
              <div className="bg-red-900/30 border border-red-900 text-red-400 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            <div>
              <label className="block text-white mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field"
                placeholder="your@email.com"
                required
              />
            </div>

            <div>
              <label className="block text-white mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field"
                placeholder="••••••••"
                required
              />
            </div>

            <div>
              <label className="block text-white mb-2">Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="input-field"
                placeholder="••••••••"
                required
              />
            </div>

            <div>
              <label className="block text-white mb-2">I am a...</label>
              <div className="grid grid-cols-1 gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedRole('member')}
                  className={`py-3 rounded-lg border transition-all text-left ${
                    selectedRole === 'member'
                      ? 'border-[#C9A962] bg-[#C9A962]/10 text-white'
                      : 'border-white/10 text-[#A3A3A3] hover:border-white/30'
                  }`}
                >
                  <span className="block font-medium">Member</span>
                  <span className="text-sm opacity-70">Looking for connections, dates, or networking</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedRole('manager')}
                  className={`py-3 rounded-lg border transition-all text-left ${
                    selectedRole === 'manager'
                      ? 'border-[#C9A962] bg-[#C9A962]/10 text-white'
                      : 'border-white/10 text-[#A3A3A3] hover:border-white/30'
                  }`}
                >
                  <span className="block font-medium">Event Manager</span>
                  <span className="text-sm opacity-70">Organize dating events, mixers, and social gatherings</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedRole('studio_owner')}
                  className={`py-3 rounded-lg border transition-all text-left ${
                    selectedRole === 'studio_owner'
                      ? 'border-[#C9A962] bg-[#C9A962]/10 text-white'
                      : 'border-white/10 text-[#A3A3A3] hover:border-white/30'
                  }`}
                >
                  <span className="block font-medium">Studio Owner</span>
                  <span className="text-sm opacity-70">Own a photography studio or venue</span>
                </button>
              </div>
            </div>

            <button type="submit" className="w-full btn-primary py-4">
              Continue
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-[#A3A3A3]">
              Already have an account?{' '}
              <Link href="/auth/login" className="text-[#C9A962] hover:underline">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-6">
      <div className="w-full max-w-lg">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#C9A962] to-[#8B4513] flex items-center justify-center">
              <span className="text-black font-bold text-xl" style={{ fontFamily: 'Playfair Display' }}>M</span>
            </div>
          </Link>
          <h1 className="text-3xl font-bold text-white mb-2">Create Your Profile</h1>
          <p className="text-[#A3A3A3]">Tell us about yourself</p>
        </div>

        <form onSubmit={handleCreateProfile} className="space-y-6">
          {error && (
            <div className="bg-red-900/30 border border-red-900 text-red-400 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-white mb-2">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input-field"
                placeholder="Your name"
                required
              />
            </div>
            <div>
              <label className="block text-white mb-2">Date of Birth</label>
              <input
                type="date"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
                className="input-field"
                required
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-white mb-2">Gender</label>
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setGender('male')}
                  className={`flex-1 py-3 rounded-lg border transition-all ${
                    gender === 'male'
                      ? 'border-[#C9A962] bg-[#C9A962]/10 text-white'
                      : 'border-white/10 text-[#A3A3A3] hover:border-white/30'
                  }`}
                >
                  Male
                </button>
                <button
                  type="button"
                  onClick={() => setGender('female')}
                  className={`flex-1 py-3 rounded-lg border transition-all ${
                    gender === 'female'
                      ? 'border-[#C9A962] bg-[#C9A962]/10 text-white'
                      : 'border-white/10 text-[#A3A3A3] hover:border-white/30'
                  }`}
                >
                  Female
                </button>
              </div>
            </div>
            <div>
              <label className="block text-white mb-2">Phone Number</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="input-field"
                placeholder="08012345678"
                required
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-white mb-2">ID Type</label>
              <select
                value={idType}
                onChange={(e) => setIdType(e.target.value)}
                className="input-field"
              >
                {ID_TYPES.map(id => (
                  <option key={id.value} value={id.value}>{id.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-white mb-2">ID Number</label>
              <input
                type="text"
                value={idNumber}
                onChange={(e) => setIdNumber(e.target.value)}
                className="input-field"
                placeholder="Your ID number"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-white mb-2">LGA (Local Government)</label>
            <input
              type="text"
              value={lga}
              onChange={(e) => setLga(e.target.value)}
              className="input-field"
              placeholder="Your LGA"
              required
            />
          </div>

          <div>
            <label className="block text-white mb-2">Looking For</label>
            <select
              value={lookingFor}
              onChange={(e) => setLookingFor(e.target.value as 'marriage' | 'dating' | 'networking')}
              className="input-field"
            >
              <option value="marriage">Marriage</option>
              <option value="dating">Dating</option>
              <option value="networking">Networking</option>
            </select>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-white mb-2">Location (City)</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="input-field"
                placeholder="Lagos"
                required
              />
            </div>
            <div>
              <label className="block text-white mb-2">State</label>
              <select
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="input-field"
                required
              >
                <option value="">Select state</option>
                {NIGERIAN_STATES.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-white mb-2">Occupation</label>
              <input
                type="text"
                value={occupation}
                onChange={(e) => setOccupation(e.target.value)}
                className="input-field"
                placeholder="Your profession"
                required
              />
            </div>
            <div>
              <label className="block text-white mb-2">Education</label>
              <input
                type="text"
                value={education}
                onChange={(e) => setEducation(e.target.value)}
                className="input-field"
                placeholder="University"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-white mb-2">Photo URL (optional)</label>
            <input
              type="url"
              value={photoUrl}
              onChange={(e) => setPhotoUrl(e.target.value)}
              className="input-field"
              placeholder="https://example.com/photo.jpg"
            />
            <p className="text-[#A3A3A3] text-sm mt-1">Leave empty to use default placeholder</p>
          </div>

          <div>
            <label className="block text-white mb-2">About You</label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="input-field h-32"
              placeholder="Tell us about yourself..."
              maxLength={500}
              required
            />
            <p className="text-[#A3A3A3] text-sm mt-1">{bio.length}/500 characters</p>
          </div>

          <div>
            <label className="block text-white mb-2">Interests</label>
            <div className="flex flex-wrap gap-2">
              {INTERESTS.map(interest => (
                <button
                  key={interest}
                  type="button"
                  onClick={() => toggleInterest(interest)}
                  className={`px-4 py-2 rounded-full text-sm transition-all ${
                    selectedInterests.includes(interest)
                      ? 'bg-[#C9A962] text-black'
                      : 'bg-[#1F1F1F] text-[#A3A3A3] hover:text-white'
                  }`}
                >
                  {interest}
                </button>
              ))}
            </div>
          </div>

          <button type="submit" className="w-full btn-primary py-4">
            Create Profile
          </button>
        </form>
      </div>
    </div>
  );
}