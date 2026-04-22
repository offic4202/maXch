export type UserRole = 'member' | 'manager' | 'studio_owner' | 'admin' | 'super_admin';

export type IdType = 'nin' | 'bvn' | 'passport' | 'drivers_license';

export interface User {
  id: string;
  email: string;
  password: string;
  role: UserRole;
  profileId?: string;
  isVerified: boolean;
  verifiedAt?: Date;
  createdAt: Date;
}

export interface Profile {
  id: string;
  userId: string;
  name: string;
  dateOfBirth: string;
  gender: 'male' | 'female';
  phone: string;
  idType: IdType;
  idNumber: string;
  lga: string;
  location: string;
  state: string;
  occupation: string;
  education: string;
  bio: string;
  photos: string[];
  interests: string[];
  lookingFor: 'marriage' | 'dating' | 'networking';
  isVerified: boolean;
  verifiedAt?: Date;
  rejectionReason?: string;
  createdAt: Date;
  socialHandles?: {
    instagram?: string;
    twitter?: string;
    tiktok?: string;
    youtube?: string;
    linkedin?: string;
    facebook?: string;
  };
  monetizationHandles?: {
    paytag?: string;
    koraTag?: string;
    flutterwaveTag?: string;
    bankName?: string;
    accountNumber?: string;
    accountName?: string;
  };
}

export const SOCIAL_PLATFORMS = [
  { key: 'instagram', label: 'Instagram', icon: '📸' },
  { key: 'twitter', label: 'Twitter/X', icon: '🐦' },
  { key: 'tiktok', label: 'TikTok', icon: '🎵' },
  { key: 'youtube', label: 'YouTube', icon: '▶️' },
  { key: 'linkedin', label: 'LinkedIn', icon: '💼' },
  { key: 'facebook', label: 'Facebook', icon: '👥' }
] as const;

export const MONETIZATION_TYPES = [
  { key: 'paytag', label: 'Paytag', placeholder: 'username' },
  { key: 'koraTag', label: 'Kora Tag', placeholder: 'business tag' },
  { key: 'flutterwaveTag', label: 'Flutterwave', placeholder: 'business tag' }
] as const;

export type EventType = 'charity' | 'dating' | 'social';

export interface Event {
  id: string;
  title: string;
  description: string;
  type: EventType;
  date: string;
  time: string;
  location: string;
  state: string;
  capacity: number;
  attendees: string[];
  createdBy: string;
  createdAt: Date;
}

export type ConnectionStatus = 'pending' | 'accepted' | 'rejected';

export interface Connection {
  id: string;
  fromUserId: string;
  toUserId: string;
  status: ConnectionStatus;
  createdAt: Date;
}

export const NIGERIAN_STATES = [
  'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue',
  'Borno', 'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu',
  'Gombe', 'Imo', 'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi',
  'Kogi', 'Kwara', 'Lagos', 'Nasarawa', 'Niger', 'Ogun', 'Ondo',
  'Osun', 'Oyo', 'Plateau', 'Sokoto', 'Taraba', 'Yobe', 'Zamfara'
] as const;

export const INTERESTS = [
  'Travel', 'Music', 'Art', 'Fitness', 'Cooking', 'Reading', 'Photography',
  'Fashion', 'Sports', 'Movies', 'Technology', 'Business', 'Spirituality',
  'Volunteering', 'Nature', 'Dance', 'Writing', 'Pets', 'Wine & Dining'
] as const;

export const ID_TYPES = [
  { value: 'nin', label: 'National ID (NIN)' },
  { value: 'bvn', label: 'Bank Verification (BVN)' },
  { value: 'passport', label: 'International Passport' },
  { value: 'drivers_license', label: "Driver's License" }
] as const;

export const ROLE_LABELS: Record<UserRole, string> = {
  member: 'Member',
  manager: 'Event Manager',
  studio_owner: 'Studio Owner',
  admin: 'Admin',
  super_admin: 'Super Admin'
};

export const ROLE_PRIVILEGES: Record<UserRole, string[]> = {
  member: [
    'Browse verified profiles',
    'Send/accept connection requests',
    'RSVP to events',
    'View own profile & connections',
    'Update own profile'
  ],
  manager: [
    'All Member privileges',
    'Create & manage dating events',
    'View event attendees',
    'Cancel own events',
    'Access manager dashboard'
  ],
  studio_owner: [
    'All Member privileges',
    'Add studio/location for events',
    'View booking requests',
    'Accept/reject bookings',
    'Access studio dashboard'
  ],
  admin: [
    'View all users & profiles',
    'Verify/reject profiles',
    'Suspend/delete users',
    'Moderate content',
    'View platform analytics'
  ],
  super_admin: [
    'All Admin privileges',
    'Create Admin/Manager accounts',
    'Change user roles',
    'Platform settings',
    'Full system access'
  ]
};