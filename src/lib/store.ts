import { PrismaClient, User, Profile, Event, Connection } from '@prisma/client';

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };
export const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export function login(email: string, password: string): Promise<User | null> {
  return prisma.user.findFirst({ where: { email, password } });
}

export function logout(): Promise<void> {
  return Promise.resolve();
}

export function getCurrentUser(): Promise<User | null> {
  return Promise.resolve(null);
}

export async function getAllProfiles(): Promise<Profile[]> {
  return prisma.profile.findMany();
}

export async function getProfileById(id: string): Promise<Profile | null> {
  return prisma.profile.findUnique({ where: { id } });
}

export async function getProfileByUserId(userId: string): Promise<Profile | null> {
  return prisma.profile.findFirst({ where: { userId } });
}

export async function createProfile(data: {
  userId: string;
  name: string;
  dateOfBirth?: string;
  gender?: string;
  phone?: string;
  idType?: string;
  idNumber?: string;
  lga?: string;
  location?: string;
  state?: string;
  occupation?: string;
  education?: string;
  bio?: string;
  photos?: string[];
  interests?: string[];
  lookingFor?: string;
}): Promise<Profile> {
  return prisma.profile.create({
    data: {
      ...data,
      isVerified: false,
    },
  });
}

export async function updateProfile(id: string, data: Partial<Profile>): Promise<Profile | null> {
  try {
    return await prisma.profile.update({
      where: { id },
      data,
    });
  } catch {
    return null;
  }
}

export async function getAllEvents(): Promise<Event[]> {
  return prisma.event.findMany();
}

export async function getEventById(id: string): Promise<Event | null> {
  return prisma.event.findUnique({ where: { id } });
}

export async function createEvent(data: {
  title: string;
  description?: string;
  type: string;
  date: string;
  time: string;
  location: string;
  state: string;
  capacity: number;
  createdBy: string;
}): Promise<Event> {
  return prisma.event.create({ data });
}

export async function updateEvent(id: string, data: Partial<Event>): Promise<Event | null> {
  try {
    return await prisma.event.update({
      where: { id },
      data,
    });
  } catch {
    return null;
  }
}

export async function rsvpToEvent(eventId: string, userId: string): Promise<boolean> {
  const event = await prisma.event.findUnique({ where: { id: eventId } });
  if (!event) return false;
  
  const attendees = event.attendees.includes(userId) 
    ? event.attendees 
    : [...event.attendees, userId];
  
  await prisma.event.update({
    where: { id: eventId },
    data: { attendees },
  });
  return true;
}

export async function cancelRsvp(eventId: string, userId: string): Promise<boolean> {
  const event = await prisma.event.findUnique({ where: { id: eventId } });
  if (!event) return false;
  
  const attendees = event.attendees.filter((a: string) => a !== userId);
  await prisma.event.update({ where: { id: eventId }, data: { attendees } });
  return true;
}

export async function getConnectionsForUser(userId: string): Promise<Connection[]> {
  return prisma.connection.findMany({
    where: { OR: [{ fromUserId: userId }, { toUserId: userId }] },
  });
}

export async function getPendingRequests(userId: string): Promise<Connection[]> {
  return prisma.connection.findMany({
    where: { toUserId: userId, status: 'pending' },
  });
}

export async function sendConnection(fromUserId: string, toUserId: string): Promise<Connection> {
  return prisma.connection.create({
    data: { fromUserId, toUserId, status: 'pending' },
  });
}

export async function respondToConnection(connectionId: string, status: 'accepted' | 'rejected'): Promise<boolean> {
  try {
    await prisma.connection.update({
      where: { id: connectionId },
      data: { status },
    });
    return true;
  } catch {
    return false;
  }
}

export async function getAllUsers(): Promise<User[]> {
  return prisma.user.findMany();
}

export async function getUserById(id: string): Promise<User | null> {
  return prisma.user.findUnique({ where: { id } });
}

export async function getAllConnections(): Promise<Connection[]> {
  return prisma.connection.findMany();
}

export async function registerUser(email: string, password: string, role: string = 'member'): Promise<User> {
  return prisma.user.create({
    data: { email, password, role, isVerified: role !== 'member' },
  });
}

export async function verifyProfile(profileId: string): Promise<boolean> {
  try {
    await prisma.profile.update({
      where: { id: profileId },
      data: { isVerified: true, verifiedAt: new Date() },
    });
    return true;
  } catch {
    return false;
  }
}

export async function deactivateUser(userId: string): Promise<boolean> {
  try {
    await prisma.user.delete({ where: { id: userId } });
    return true;
  } catch {
    return false;
  }
}

export async function updateUserRole(userId: string, role: string): Promise<boolean> {
  try {
    await prisma.user.update({
      where: { id: userId },
      data: { role, isVerified: role !== 'member', verifiedAt: new Date() },
    });
    return true;
  } catch {
    return false;
  }
}

export async function rejectProfile(profileId: string, reason: string): Promise<boolean> {
  try {
    await prisma.profile.update({
      where: { id: profileId },
      data: { isVerified: false, rejectionReason: reason },
    });
    return true;
  } catch {
    return false;
  }
}

export async function getPendingVerifications(): Promise<Profile[]> {
  return prisma.profile.findMany({ where: { isVerified: false } });
}

export async function getVerifiedProfiles(): Promise<Profile[]> {
  return prisma.profile.findMany({ where: { isVerified: true } });
}

export async function getProfilesByState(state: string): Promise<Profile[]> {
  return prisma.profile.findMany({ where: { state } });
}

export default prisma;