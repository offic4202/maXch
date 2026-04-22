import { User, Profile, Event, Connection, UserRole } from './types';

const STORAGE_KEY = 'maze_match_data';

interface StoreData {
  users: User[];
  profiles: Profile[];
  events: Event[];
  connections: Connection[];
  currentUserId: string | null;
}

const initialData: StoreData = {
  users: [
    { id: 'admin1', email: 'admin@themazematch.com', password: 'admin123', role: 'super_admin', isVerified: true, verifiedAt: new Date(), createdAt: new Date() },
    { id: 'admin2', email: 'support@themazematch.com', password: 'support123', role: 'admin', isVerified: true, verifiedAt: new Date(), createdAt: new Date() },
    { id: 'manager1', email: 'manager@themazematch.com', password: 'manager123', role: 'manager', isVerified: true, verifiedAt: new Date(), createdAt: new Date() },
    { id: 'studio1', email: 'studio@themazematch.com', password: 'studio123', role: 'studio_owner', isVerified: true, verifiedAt: new Date(), createdAt: new Date() },
    { id: 'user1', email: 'john@example.com', password: 'user123', role: 'member', profileId: 'profile1', isVerified: true, verifiedAt: new Date(), createdAt: new Date() },
    { id: 'user2', email: 'grace@example.com', password: 'user123', role: 'member', profileId: 'profile2', isVerified: true, verifiedAt: new Date(), createdAt: new Date() },
    { id: 'user3', email: 'michael@example.com', password: 'user123', role: 'member', profileId: 'profile3', isVerified: true, verifiedAt: new Date(), createdAt: new Date() },
    { id: 'user4', email: 'amaka@example.com', password: 'user123', role: 'member', profileId: 'profile4', isVerified: true, verifiedAt: new Date(), createdAt: new Date() },
    { id: 'user5', email: 'david@example.com', password: 'user123', role: 'member', profileId: 'profile5', isVerified: true, verifiedAt: new Date(), createdAt: new Date() },
  ],
  profiles: [
    {
      id: 'profile1',
      userId: 'user1',
      name: 'Emeka Okonkwo',
      dateOfBirth: '1992-05-15',
      gender: 'male',
      phone: '08012345678',
      idType: 'nin',
      idNumber: '12345678901',
      lga: 'Lekki',
      location: 'Lekki',
      state: 'Lagos',
      occupation: 'Software Engineer',
      education: 'University of Lagos',
      bio: 'Passionate about technology and connecting with like-minded individuals. I believe in building meaningful relationships based on trust and shared values.',
      photos: ['https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop'],
      interests: ['Technology', 'Fitness', 'Travel', 'Photography'],
      lookingFor: 'marriage',
      isVerified: true,
      verifiedAt: new Date(),
      createdAt: new Date()
    },
    {
      id: 'profile2',
      userId: 'user2',
      name: 'Grace Adeyemi',
      dateOfBirth: '1996-08-22',
      gender: 'female',
      phone: '08023456789',
      idType: 'bvn',
      idNumber: '23456789012',
      lga: 'Ikeja',
      location: 'Ikeja',
      state: 'Lagos',
      occupation: 'Marketing Manager',
      education: 'Covenant University',
      bio: 'Life is beautiful when shared with the right person. I love adventures, good food, and meaningful conversations. Looking for someone genuine.',
      photos: ['https://images.unsplash.com/photo-1531746020798-e6953b6ae501?w=400&h=500&fit=crop'],
      interests: ['Travel', 'Music', 'Fashion', 'Cooking'],
      lookingFor: 'marriage',
      isVerified: true,
      verifiedAt: new Date(),
      createdAt: new Date()
    },
    {
      id: 'profile3',
      userId: 'user3',
      name: 'Michael Okafor',
      dateOfBirth: '1989-11-03',
      gender: 'male',
      phone: '08034567890',
      idType: 'passport',
      idNumber: 'A1234567',
      lga: 'Victoria Island',
      location: 'Victoria Island',
      state: 'Lagos',
      occupation: 'Business Executive',
      education: 'Harvard Business School',
      bio: 'Entrepreneur with a heart for community development. I believe in the power of connections to transform lives.',
      photos: ['https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=500&fit=crop'],
      interests: ['Business', 'Volunteering', 'Sports', 'Wine & Dining'],
      lookingFor: 'dating',
      isVerified: true,
      verifiedAt: new Date(),
      createdAt: new Date()
    },
    {
      id: 'profile4',
      userId: 'user4',
      name: 'Amaka Nwosu',
      dateOfBirth: '1998-02-14',
      gender: 'female',
      phone: '08045678901',
      idType: 'nin',
      idNumber: '34567890123',
      lga: 'Ikoyi',
      location: 'Ikoyi',
      state: 'Lagos',
      occupation: 'Fashion Designer',
      education: 'Parsons School of Design',
      bio: 'Creating beauty in every stitch. I pour my heart into my designs and looking for someone who appreciates art and creativity.',
      photos: ['https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=500&fit=crop'],
      interests: ['Fashion', 'Art', 'Dance', 'Photography'],
      lookingFor: 'marriage',
      isVerified: true,
      verifiedAt: new Date(),
      createdAt: new Date()
    },
    {
      id: 'profile5',
      userId: 'user5',
      name: 'David Chukwu',
      dateOfBirth: '1995-07-20',
      gender: 'male',
      phone: '08056789012',
      idType: 'drivers_license',
      idNumber: 'DL123456',
      lga: 'Gwagwalada',
      location: 'Abuja',
      state: 'Abuja',
      occupation: 'Medical Doctor',
      education: 'University of Ibadan',
      bio: 'Dedicated physician with a passion for healthcare innovation. In my free time, I enjoy music and mentoring young people.',
      photos: ['https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=500&fit=crop'],
      interests: ['Music', 'Fitness', 'Reading', 'Technology'],
      lookingFor: 'marriage',
      isVerified: true,
      verifiedAt: new Date(),
      createdAt: new Date(),
      socialHandles: {
        instagram: '@davidchukwu_md',
        twitter: '@DrDavidChukwu',
        tiktok: '@DrDavid'
      }
    },
  ],
  events: [
    {
      id: 'event1',
      title: 'Valentine\'s Romance Gala',
      description: 'An exclusive evening of elegance and connection. Join us for a magical night of fine dining, live music, and the opportunity to meet like-minded singles.',
      type: 'dating',
      date: '2026-02-14',
      time: '7:00 PM',
      location: 'Eko Hotels & Suites',
      state: 'Lagos',
      capacity: 100,
      attendees: ['user1', 'user2', 'user3'],
      createdBy: 'manager1',
      createdAt: new Date()
    },
    {
      id: 'event2',
      title: 'Charity Ball for Education',
      description: 'Annual charity event supporting underprivileged children\'s education. All proceeds go towards providing school supplies and scholarships.',
      type: 'charity',
      date: '2026-03-15',
      time: '6:00 PM',
      location: 'Landmark Centre',
      state: 'Lagos',
      capacity: 200,
      attendees: ['user1', 'user4'],
      createdBy: 'admin1',
      createdAt: new Date()
    },
    {
      id: 'event3',
      title: 'Speed Dating Mixer',
      description: 'Fun and relaxed speed dating event. Meet multiple potential matches in a structured, pressure-free environment.',
      type: 'dating',
      date: '2026-02-28',
      time: '5:00 PM',
      location: 'The Palette Cafe',
      state: 'Lagos',
      capacity: 50,
      attendees: ['user2', 'user5'],
      createdBy: 'manager1',
      createdAt: new Date()
    },
    {
      id: 'event4',
      title: 'Social Networking Brunch',
      description: 'Weekly networking brunch for professionals. Build meaningful connections over delicious food and great conversation.',
      type: 'social',
      date: '2026-02-22',
      time: '11:00 AM',
      location: 'Bungalow Restaurant',
      state: 'Lagos',
      capacity: 30,
      attendees: ['user1', 'user3', 'user5', 'user6'],
      createdBy: 'manager1',
      createdAt: new Date()
    },
  ],
  connections: [
    { id: 'conn1', fromUserId: 'user1', toUserId: 'user2', status: 'pending', createdAt: new Date() },
    { id: 'conn2', fromUserId: 'user2', toUserId: 'user1', status: 'accepted', createdAt: new Date() },
    { id: 'conn3', fromUserId: 'user3', toUserId: 'user4', status: 'pending', createdAt: new Date() },
  ],
  currentUserId: null,
};

function getStorage(): StoreData {
  if (typeof window === 'undefined') return initialData;
  
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialData));
    return initialData;
  }
  return JSON.parse(stored);
}

function setStorage(data: StoreData): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }
}

export function login(email: string, password: string): User | null {
  const data = getStorage();
  const user = data.users.find(u => u.email === email && u.password === password);
  if (user) {
    data.currentUserId = user.id;
    setStorage(data);
    return user;
  }
  return null;
}

export function logout(): void {
  const data = getStorage();
  data.currentUserId = null;
  setStorage(data);
}

export function getCurrentUser(): User | null {
  const data = getStorage();
  if (!data.currentUserId) return null;
  return data.users.find(u => u.id === data.currentUserId) || null;
}

export function getAllProfiles(): Profile[] {
  const data = getStorage();
  return data.profiles;
}

export function getProfileById(id: string): Profile | null {
  const data = getStorage();
  return data.profiles.find(p => p.id === id) || null;
}

export function getProfileByUserId(userId: string): Profile | null {
  const data = getStorage();
  return data.profiles.find(p => p.userId === userId) || null;
}

export function createProfile(profile: Omit<Profile, 'id' | 'createdAt' | 'isVerified'>): Profile {
  const data = getStorage();
  const newProfile: Profile = {
    ...profile,
    id: 'profile' + Date.now(),
    isVerified: false,
    createdAt: new Date(),
  };
  data.profiles.push(newProfile);
  
  const user = data.users.find(u => u.id === profile.userId);
  if (user) {
    user.profileId = newProfile.id;
  }
  
  setStorage(data);
  return newProfile;
}

export function updateProfile(id: string, updates: Partial<Profile>): Profile | null {
  const data = getStorage();
  const index = data.profiles.findIndex(p => p.id === id);
  if (index === -1) return null;
  
  data.profiles[index] = { ...data.profiles[index], ...updates };
  setStorage(data);
  return data.profiles[index];
}

export function getAllEvents(): Event[] {
  const data = getStorage();
  return data.events;
}

export function getEventById(id: string): Event | null {
  const data = getStorage();
  return data.events.find(e => e.id === id) || null;
}

export function createEvent(event: Omit<Event, 'id' | 'createdAt' | 'attendees'>): Event {
  const data = getStorage();
  const newEvent: Event = {
    ...event,
    id: 'event' + Date.now(),
    attendees: [],
    createdAt: new Date(),
  };
  data.events.push(newEvent);
  setStorage(data);
  return newEvent;
}

export function updateEvent(id: string, updates: Partial<Event>): Event | null {
  const data = getStorage();
  const index = data.events.findIndex(e => e.id === id);
  if (index === -1) return null;
  
  data.events[index] = { ...data.events[index], ...updates };
  setStorage(data);
  return data.events[index];
}

export function rsvpToEvent(eventId: string, userId: string): boolean {
  const data = getStorage();
  const event = data.events.find(e => e.id === eventId);
  if (!event) return false;
  
  if (!event.attendees.includes(userId)) {
    event.attendees.push(userId);
    setStorage(data);
  }
  return true;
}

export function cancelRsvp(eventId: string, userId: string): boolean {
  const data = getStorage();
  const event = data.events.find(e => e.id === eventId);
  if (!event) return false;
  
  event.attendees = event.attendees.filter(a => a !== userId);
  setStorage(data);
  return true;
}

export function getConnectionsForUser(userId: string): Connection[] {
  const data = getStorage();
  return data.connections.filter(c => c.fromUserId === userId || c.toUserId === userId);
}

export function getPendingRequests(userId: string): Connection[] {
  const data = getStorage();
  return data.connections.filter(c => c.toUserId === userId && c.status === 'pending');
}

export function sendConnection(fromUserId: string, toUserId: string): Connection {
  const data = getStorage();
  const newConnection: Connection = {
    id: 'conn' + Date.now(),
    fromUserId,
    toUserId,
    status: 'pending',
    createdAt: new Date(),
  };
  data.connections.push(newConnection);
  setStorage(data);
  return newConnection;
}

export function respondToConnection(connectionId: string, status: 'accepted' | 'rejected'): boolean {
  const data = getStorage();
  const connection = data.connections.find(c => c.id === connectionId);
  if (!connection) return false;
  
  connection.status = status;
  setStorage(data);
  return true;
}

export function getAllUsers(): User[] {
  const data = getStorage();
  return data.users;
}

export function getUserById(id: string): User | null {
  const data = getStorage();
  return data.users.find(u => u.id === id) || null;
}

export function getAllConnections(): Connection[] {
  const data = getStorage();
  return data.connections;
}

export function registerUser(email: string, password: string, role: UserRole = 'member'): User {
  const data = getStorage();
  const newUser: User = {
    id: 'user' + Date.now(),
    email,
    password,
    role,
    isVerified: false,
    createdAt: new Date(),
  };
  data.users.push(newUser);
  setStorage(data);
  return newUser;
}

export function verifyProfile(profileId: string): boolean {
  const data = getStorage();
  const profile = data.profiles.find(p => p.id === profileId);
  if (!profile) return false;
  
  profile.isVerified = true;
  profile.verifiedAt = new Date();
  setStorage(data);
  return true;
}

export function deactivateUser(userId: string): boolean {
  const data = getStorage();
  const user = data.users.find(u => u.id === userId);
  if (!user) return false;
  
  user.email = '[deactivated]' + user.email;
  setStorage(data);
  return true;
}

export function updateUserRole(userId: string, role: UserRole): boolean {
  const data = getStorage();
  const user = data.users.find(u => u.id === userId);
  if (!user) return false;
  
  user.role = role;
  if (role !== 'member') {
    user.isVerified = true;
    user.verifiedAt = new Date();
  }
  setStorage(data);
  return true;
}

export function rejectProfile(profileId: string, reason: string): boolean {
  const data = getStorage();
  const profile = data.profiles.find(p => p.id === profileId);
  if (!profile) return false;
  
  profile.isVerified = false;
  profile.rejectionReason = reason;
  setStorage(data);
  return true;
}

export function getPendingVerifications(): Profile[] {
  const data = getStorage();
  return data.profiles.filter(p => !p.isVerified);
}

export function getVerifiedProfiles(): Profile[] {
  const data = getStorage();
  return data.profiles.filter(p => p.isVerified);
}

export function getProfilesByState(state: string): Profile[] {
  const data = getStorage();
  return data.profiles.filter(p => p.state === state);
}