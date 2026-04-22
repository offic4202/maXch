# The Maze Match - Platform Specification

## 1. Project Overview

**Project Name**: The Maze Match  
**Type**: Web Application (Next.js)  
**Core Functionality**: A premium matchmaking and event platform connecting Nigerian singles through curated profiles, events, and dating-matching services.  
**Target Users**: Nigerian gentlemen and ladies seeking meaningful connections, with optional manager accounts for organizations.

---

## 2. UI/UX Specification

### Layout Structure

**Pages**:
1. **Landing Page** - Hero, features, featured members, upcoming events
2. **Browse Profiles** - Grid of verified members
3. **Profile Detail** - Individual member profile view
4. **Events Page** - Upcoming events, charity, dating matches
5. **Login/Register** - Authentication
6. **Dashboard (User)** - Manage profile, view requests
7. **Admin Panel** - Manage members, events, requests
8. **Manager Panel** - Limited admin (event management only)

**Responsive Breakpoints**:
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

### Visual Design

**Color Palette**:
- Primary: `#1A1A1A` (Rich Black)
- Secondary: `#C9A962` (African Gold)
- Accent: `#8B4513` (Sienna Brown)
- Background: `#0D0D0D` (Deep Black)
- Surface: `#1F1F1F` (Card Dark)
- Text Primary: `#FAFAFA`
- Text Secondary: `#A3A3A3`
- Success: `#22C55E`
- Error: `#EF4444`

**Typography**:
- Headings: `Playfair Display` (serif, elegant)
- Body: `DM Sans` (clean, modern)
- Accent: `Cormorant Garamond` (refined)

**Spacing System**:
- Base unit: 4px
- Section padding: 80px vertical, 24px horizontal
- Card padding: 24px
- Grid gap: 24px

**Visual Effects**:
- Subtle gold gradient overlays on hero
- Card hover: scale(1.02) with gold border glow
- Smooth transitions: 0.3s ease
- Image overlays with gradient for text readability

### Components

**Navigation**:
- Fixed header with logo, nav links, auth buttons
- Mobile: hamburger menu
- Active state: gold underline

**Profile Card**:
- Image (aspect-ratio 3:4)
- Name, age, location
- Quick bio snippet
- "Connect" button
- Hover: gold border glow

**Event Card**:
- Image background
- Event type badge (Charity/Date/Social)
- Title, date, location
- Attendee count
- CTA button

**Buttons**:
- Primary: Gold background, black text
- Secondary: Transparent, gold border
- Hover: brightness increase

**Forms**:
- Dark inputs with gold focus border
- Floating labels
- Validation states

---

## 3. Functionality Specification

### User Roles

1. **Member** - Create profile, browse, connect, attend events
2. **Manager** - Manage events only, view attendees
3. **Admin** - Full platform management

### Core Features

**Authentication**:
- Email/password registration and login
- Role-based access control (Member/Manager/Admin)
- Session management

**Profile Management**:
- Create profile with photos (up to 5), bio, personal details
- Edit/update profile
- Profile verification status

**Profile Fields**:
- Name, age, location ( Nigerian state)
- Occupation, education
- Photos (up to 5)
- Bio (500 chars max)
- Interests
- Looking for (marriage, dating, networking)

**Events**:
- Create events (Admin/Manager)
- Event types: Charity, Dating Match, Social
- Event details: title, description, date, location, capacity
- RSVP functionality
- Attendee list

**Connections**:
- Send connection request
- Accept/decline requests
- View matched connections

**Admin Panel**:
- Member management (approve, deactivate)
- Event management
- View all requests
- Analytics dashboard

**Manager Panel**:
- Create/edit events
- View event attendees

### Data Handling

- In-memory store for demo (production would use database)
- Profile images as placeholder URLs
- LocalStorage for session persistence

---

## 4. Acceptance Criteria

1. Landing page displays with hero, featured profiles, upcoming events
2. User can register and create a profile with photos and bio
3. Users can browse and view other member profiles
4. Users can send and receive connection requests
5. Admin can access full admin panel
6. Manager can access event management only
7. Events display with RSVP functionality
8. Responsive design works on mobile, tablet, desktop
9. Gold/African aesthetic is consistent throughout
10. All forms validate properly