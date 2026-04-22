import { PrismaClient, User, Profile, Event, Connection } from '@prisma/client';

const prisma = new PrismaClient();

let userCache: any[] = [];
let profileCache: any[] = [];
let eventCache: any[] = [];
let connectionCache: any[] = [];
let initialized = false;

async function refreshCaches() {
  userCache = await prisma.user.findMany({ include: { profile: true } });
  profileCache = await prisma.profile.findMany({ include: { user: true } });
  eventCache = await prisma.event.findMany();
  connectionCache = await prisma.connection.findMany();
  initialized = true;
}

export async function initStore() {
  if (initialized) return;
  await refreshCaches();
}

export function getAllUsers() {
  return userCache;
}

export function getUserById(id: string) {
  return userCache.find(u => u.id === id);
}

export function getUserByEmail(email: string) {
  return userCache.find(u => u.email === email);
}

export async function createUser(data: { email: string; password: string; role: string }) {
  const user = await prisma.user.create({ data });
  return user;
}

export async function updateUserRole(userId: string, role: string) {
  const user = await prisma.user.update({ where: { id: userId }, data: { role } });
  await refreshCaches();
  return user;
}

export async function verifyUser(userId: string) {
  const user = await prisma.user.update({
    where: { id: userId },
    data: { isVerified: true, verifiedAt: new Date() }
  });
  await refreshCaches();
  return user;
}

export async function deactivateUser(userId: string) {
  const user = await prisma.user.update({
    where: { id: userId },
    data: { isVerified: false, verifiedAt: null }
  });
  await refreshCaches();
  return user;
}

export function getAllProfiles() {
  return profileCache;
}

export function getProfileById(id: string) {
  return profileCache.find(p => p.id === id);
}

export function getProfileByUserId(userId: string) {
  return profileCache.find(p => p.userId === userId);
}

export async function createProfile(data: any) {
  const profile = await prisma.profile.create({ data });
  await refreshCaches();
  return profile;
}

export async function updateProfile(id: string, data: any) {
  const profile = await prisma.profile.update({ where: { id }, data });
  await refreshCaches();
  return profile;
}

export async function verifyProfile(profileId: string) {
  const profile = await prisma.profile.update({
    where: { id: profileId },
    data: { isVerified: true, verifiedAt: new Date() }
  });
  await refreshCaches();
  return profile;
}

export async function rejectProfile(profileId: string, reason: string) {
  const profile = await prisma.profile.update({
    where: { id: profileId },
    data: { isVerified: false, rejectionReason: reason }
  });
  await refreshCaches();
  return profile;
}

export function getAllEvents() {
  return eventCache;
}

export function getEventById(id: string) {
  return eventCache.find(e => e.id === id);
}

export async function createEvent(data: any) {
  const event = await prisma.event.create({ data });
  await refreshCaches();
  return event;
}

export async function updateEvent(id: string, data: any) {
  const event = await prisma.event.update({ where: { id }, data });
  await refreshCaches();
  return event;
}

export async function rsvpToEvent(eventId: string, userId: string) {
  const event = eventCache.find(e => e.id === eventId);
  if (!event) return null;
  const attendees = event.attendees || [];
  if (!attendees.includes(userId)) {
    const updated = await prisma.event.update({
      where: { id: eventId },
      data: { attendees: { push: userId } }
    });
    await refreshCaches();
    return updated;
  }
  return event;
}

export async function cancelRsvp(eventId: string, userId: string) {
  const event = eventCache.find(e => e.id === eventId);
  if (!event) return null;
  const attendees = (event.attendees || []).filter((a: string) => a !== userId);
  const updated = await prisma.event.update({
    where: { id: eventId },
    data: { attendees }
  });
  await refreshCaches();
  return updated;
}

export function getAllConnections() {
  return connectionCache;
}

export async function createConnection(data: { fromUserId: string; toUserId: string }) {
  const conn = await prisma.connection.create({ data });
  await refreshCaches();
  return conn;
}

export async function updateConnectionStatus(connectionId: string, status: string) {
  const conn = await prisma.connection.update({
    where: { id: connectionId },
    data: { status }
  });
  await refreshCaches();
  return conn;
}

export function getCurrentUser(email?: string) {
  if (email) {
    return userCache.find(u => u.email === email);
  }
  if (typeof localStorage !== 'undefined') {
    const stored = localStorage.getItem('currentUserEmail');
    if (stored) return userCache.find(u => u.email === stored);
  }
  return null;
}

export function login(email: string, password: string) {
  const user = userCache.find(u => u.email === email && u.password === password);
  if (user && typeof localStorage !== 'undefined') {
    localStorage.setItem('currentUserEmail', email);
  }
  return user || null;
}

export function logout() {
  if (typeof localStorage !== 'undefined') {
    localStorage.removeItem('currentUserEmail');
  }
}

export async function sendConnection(fromUserId: string, toUserId: string) {
  return createConnection({ fromUserId, toUserId });
}

export async function registerUser(email: string, password: string, role: string = 'member') {
  const existing = getUserByEmail(email);
  if (existing) return null;
  return createUser({ email, password, role });
}

export function getPendingVerifications() {
  return profileCache.filter(p => !p.isVerified);
}

export function getConnectionsForUser(userId: string) {
  return connectionCache.filter(c => c.fromUserId === userId || c.toUserId === userId);
}

export function getPendingRequests(userId: string) {
  return connectionCache.filter(c => c.toUserId === userId && c.status === 'pending');
}

export async function respondToConnection(connectionId: string, status: string) {
  return updateConnectionStatus(connectionId, status);
}

export async function seedDatabase() {
  await refreshCaches();
  const existing = userCache.find(u => u.email === 'admin@themazematch.com');
  if (existing) return { message: 'Already seeded' };

  await prisma.user.createMany({
    data: [
      { email: 'admin@themazematch.com', password: 'admin123', role: 'super_admin', isVerified: true, verifiedAt: new Date() },
      { email: 'support@themazematch.com', password: 'support123', role: 'admin', isVerified: true, verifiedAt: new Date() },
      { email: 'manager@themazematch.com', password: 'manager123', role: 'manager', isVerified: true, verifiedAt: new Date() },
      { email: 'studio@themazematch.com', password: 'studio123', role: 'studio_owner', isVerified: true, verifiedAt: new Date() },
    ],
    skipDuplicates: true
  });

  await refreshCaches();

  const adminUser = userCache.find(u => u.email === 'admin@themazematch.com');
  const managerUser = userCache.find(u => u.email === 'manager@themazematch.com');
  const studioUser = userCache.find(u => u.email === 'studio@themazematch.com');

  if (adminUser) {
    await prisma.profile.create({
      data: { userId: adminUser.id, name: 'Admin User', isVerified: true, verifiedAt: new Date() }
    });
  }

  if (managerUser) {
    await prisma.profile.create({
      data: { userId: managerUser.id, name: 'Event Manager', isVerified: true, verifiedAt: new Date() }
    });
    await prisma.event.create({
      data: {
        title: 'Valentine Social Night',
        description: 'A romantic evening for singles',
        type: 'dating',
        date: '2026-02-14',
        time: '19:00',
        location: 'The Hub, Victoria Island',
        state: 'Lagos',
        capacity: 100,
        attendees: [],
        createdBy: managerUser.id
      }
    });
  }

  if (studioUser) {
    await prisma.profile.create({
      data: { userId: studioUser.id, name: 'Studio Owner', isVerified: true, verifiedAt: new Date() }
    });
  }

  await refreshCaches();
  return { message: 'Seeded successfully' };
}

export default prisma;