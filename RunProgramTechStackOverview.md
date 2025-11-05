# Run Program Tech Stack Overview

## System Architecture

Multi-site youth running program management system with three distinct user-facing applications and one admin/command center, all connected through a shared backend API.

```
┌─────────────────────────────────────────────────────────────────┐
│                    Frontend Applications                         │
├─────────────────────────────────────────────────────────────────┤
│  Head Coach Portal    │  Coach Portal    │  Parent Portal       │
│  (headcoach.gofast)   │  (coach.gofast)  │  (parent.gofast)     │
│  Super Admin          │  Site-Level      │  Registration &      │
│  Command Center       │  Operations      │  Progress Tracking   │
└─────────────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│                    Backend API (GoFast v2)                       │
│              /api/bgr/* endpoints                                 │
└─────────────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│                      Database                                    │
│  Sites │ Coaches │ Athletes │ Workouts │ Feedback │ Payments    │
└─────────────────────────────────────────────────────────────────┘
```

---

## Application Breakdown

### 1. Head Coach Portal (`gofast-runprogram-headcoach`)
**Role**: Super Admin / Command Center

**Purpose**: Complete management system for program owner/head coach

**Key Functions**:

#### **Recruit Functions** (Growth & Goals)
- **Recruit Dashboard** (`/recruit`)
  - Goal progress bars: New Sites, New Participants, New Coaches
  - BD framework integration (Attract/Engage/Nurture)
  - Pipeline button linking to CRM
- **CRM** (`/crm`)
  - 4 pipelines: Educational Leaders, PTAs, Coaches & Runners, Connectors
  - Contact management with stages
  - Pipeline tracking
- **Ecosystem** (`/ecosystem`)
  - Network visualization
  - Connection stats by category
  - Links to CRM

#### **Manage Functions** (Operations)
- **Curriculum** (`/curriculum`)
  - Create weekly workout plans
  - Character themes, exercises, discussion topics
  - Distribute to all coaches
- **Communicate** (`/communicate`)
  - Send messages to parents & coaches
  - Bulk messaging
  - Audience selection

#### **Set Up Functions** (Configuration)
- **Registration Setup** (`/pricing` - renamed)
  - **Per-site pricing configuration** ← Connects to Parent Portal checkout
  - Each school gets dropdown of pricing options
  - Support variance (different prices per school)
  - Registration flow configuration
- **Settings** (`/settings`)
  - Gmail configuration
  - System settings

**Data Flow TO Other Apps**:
- Workout plans → Coach Portal
- Site/pricing configuration → Parent Portal (checkout)
- Coach assignments → Coach Portal
- Site creation → Both portals

**Tech Stack**:
- React 18.3.1 + Vite 5.4.10
- React Router 6.28.0
- Tailwind CSS 3.4.15
- Lucide React icons
- shadcn/ui patterns

---

### 2. Coach Portal (`gofast-runprogram-coach`)
**Role**: Site-Level Operations

**Purpose**: Allows coaches to deliver workouts and provide feedback

**Key Functions**:
- **Dashboard** (`/dashboard`)
  - Weekly workout banner (from Head Coach)
  - School/site name display
  - Quick stats (athletes, workout plan, feedback submitted)
- **Workout View** (`/workout`)
  - Full lesson plan with character theme
  - Goal (e.g., "2 ¾ miles")
  - Workout plan breakdown
  - Discussion topics
  - Coach instructions from Head Coach
  - Home assignments
- **Give Feedback** (`/feedback`)
  - List of athletes (~10 kids per coach)
  - Star ratings (1-5) for:
    - Effort, Attitude, Performance, Listening, Working with Others
  - Written comments
  - Track which athletes have received feedback
- **Roster Management** (`/roster`)
  - View all athletes at their site
  - Mark attendance
  - Search athletes

**Data Flow FROM Head Coach**:
- Receives weekly workout plans automatically
- Receives coach instructions
- Receives site assignments

**Data Flow TO Parent Portal**:
- Feedback submissions → Parents see after 24h delay
- Attendance → Parents can see

**Tech Stack**:
- React 18.3.1 + Vite 5.4.10
- React Router 6.28.0
- Tailwind CSS 3.4.15
- Lucide React icons
- shadcn/ui patterns

---

### 3. Parent Portal (`gofast_runprogram_parent`)
**Role**: Registration & Progress Tracking

**Purpose**: Parents register children and track their progress

**Key Functions**:
- **Registration** (`/register`)
  - **Site selection** ← Links to Head Coach's site management
  - **Pricing display** ← Uses Head Coach's per-site pricing configuration
  - Parent and child information
  - Payment information
  - Registration confirmation
- **Dashboard** (`/dashboard`)
  - School/site banner
  - Current week's lesson focus
  - Weekly workout banner with character theme
  - RSVP functionality
  - Weekly survey forms
- **Lesson Details** (`/lesson`)
  - Full workout plan view
  - Character focus explanation
  - Discussion topics
  - Home assignments
- **Athlete Progress** (`/feedback`)
  - View feedback by week
  - Star ratings across categories
  - Coach comments (available after 24-hour delay)
  - Progress tracking over time
- **Homework Logging** (`/log-homework`)
  - Track at-home running assignments

**Data Flow FROM Head Coach**:
- Site list and pricing → Registration dropdown
- Weekly workout plans → Dashboard and lesson view
- Site-specific information

**Data Flow FROM Coach Portal**:
- Feedback → Visible after 24h delay
- Attendance → Visible to parents

**Tech Stack**:
- React 18.3.1 + Vite 5.4.10
- React Router 6.28.0
- Tailwind CSS 3.4.15
- Lucide React icons
- shadcn/ui patterns

---

## Critical Connection Points

### 1. **Site Pricing → Parent Checkout**
**Flow**:
```
Head Coach Portal
  Registration Setup
    → Configure per-site pricing
    → Dropdown options for each school
    → Store in database
        ↓
Parent Portal
  Registration Page
    → Fetches site list with pricing
    → Shows site-specific pricing
    → Checkout uses correct pricing
```

**Implementation Needed**:
- Head Coach sets pricing per site in Registration Setup
- Parent Portal registration fetches site-specific pricing
- Checkout component uses selected site's pricing
- Payment processing (TODO)

### 2. **Workout Distribution**
**Flow**:
```
Head Coach Portal
  Curriculum Page
    → Creates weekly workout plan
    → Saves to database
        ↓
Coach Portal
  Dashboard/Workout Page
    → Automatically receives new workout
    → Displays to coach
        ↓
Parent Portal
  Dashboard/Lesson Page
    → Parents see same workout
    → Child will do this workout
```

**Current State**: ✅ Scaffolded (demo data)

### 3. **Coach Assignment**
**Flow**:
```
Head Coach Portal
  Recruit → CRM or Coaches Page
    → Onboard new coach
    → Assign to site
    → Save to database
        ↓
Coach Portal
  Login/Auth
    → Coach sees only their assigned site
    → Only sees athletes from their site
```

**Current State**: ⏳ Needs implementation

### 4. **Feedback Flow**
**Flow**:
```
Coach Portal
  Give Feedback Page
    → Rates athlete (1-5 stars)
    → Adds comments
    → Submits to database
    → Timestamp stored
        ↓
[24-hour delay]
        ↓
Parent Portal
  Athlete Progress Page
    → Parent can now view feedback
    → Shows ratings and comments
```

**Current State**: ✅ Scaffolded (demo data)

---

## Missing Component: Onboarding Module

### **Onboarding Module** (New Repo to Build)
**Purpose**: Static HTML landing/onboarding pages

**Needed Features**:
- **Landing Page**
  - Program overview
  - Site selection
  - Links to registration
- **Site-Specific Pages**
  - Each site gets custom landing page
  - Shows site-specific info
  - Registration CTA
  - Pricing display (from Head Coach config)
- **Onboarding Flow**
  - Information about program
  - What to expect
  - Registration process

**Connection to Head Coach**:
- Head Coach creates new site → Generates onboarding page
- Head Coach sets pricing → Displays on site page
- Static HTML deployment (can be Vercel/Netlify)

**Tech Stack** (Proposed):
- Static HTML/CSS/JS
- Or simple React static site
- Deployed separately from main portals

---

## Data Flow Summary

### Workout Distribution Flow
```
Head Coach creates workout
    ↓
Stored in database
    ↓
All coaches' dashboards automatically update
    ↓
Coaches view detailed workout plan
    ↓
Parents see workout in their dashboard
    ↓
Coaches deliver workout to athletes
    ↓
Coaches submit feedback
    ↓
Parents see feedback (24h delay)
```

### Registration Flow
```
Parent visits Parent Portal
    ↓
Selects site (from Head Coach's site list)
    ↓
Sees site-specific pricing (from Head Coach config)
    ↓
Completes registration form
    ↓
Payment processed (TODO)
    ↓
Athlete added to site roster
    ↓
Coach sees new athlete in roster
    ↓
Parent receives confirmation
    ↓
Parent can now access dashboard
```

### Site Creation Flow
```
Head Coach creates new site
    ↓
Configure site details
    ↓
Set site-specific pricing
    ↓
Onboarding page generated (TODO)
    ↓
Site appears in Parent Portal registration
    ↓
Site appears in Coach Portal (for assigned coaches)
```

---

## API Endpoints (Conceptual)

### Head Coach Endpoints
```
GET    /api/bgr/headcoach/sites              # All sites
POST   /api/bgr/headcoach/workout             # Create workout
GET    /api/bgr/headcoach/stats               # Program stats
POST   /api/bgr/headcoach/coach               # Onboard coach
POST   /api/bgr/headcoach/site                # Create site
PUT    /api/bgr/headcoach/site/:id/pricing    # Set site pricing
GET    /api/bgr/headcoach/crm/contacts         # CRM contacts
POST   /api/bgr/headcoach/crm/contact          # Add contact
```

### Coach Endpoints
```
GET    /api/bgr/coach/:coachId/hydrate        # Dashboard data
GET    /api/bgr/coach/:coachId/roster         # Athlete roster
GET    /api/bgr/workout/current?siteId=:id    # Current workout
POST   /api/bgr/feedback                      # Submit feedback
POST   /api/bgr/attendance                    # Mark attendance
```

### Parent Endpoints
```
GET    /api/bgr/parent/:parentId/hydrate       # Dashboard data
GET    /api/bgr/sites                         # Get sites for registration
GET    /api/bgr/site/:id/pricing              # Get site pricing
POST   /api/bgr/parent/register               # Register child
GET    /api/bgr/feedback?athleteId=:id         # View feedback
GET    /api/bgr/lesson/:lessonId              # Lesson details
```

---

## Database Schema (Conceptual)

### Core Tables

**Sites**
- `id`, `name`, `location`, `pricing_config` (JSON), `created_at`

**Coaches**
- `id`, `name`, `email`, `role` ('coach' | 'headcoach'), `site_id` (nullable for head coach)

**Parents**
- `id`, `name`, `email`, `phone`, `site_id`

**Athletes**
- `id`, `name`, `age`, `grade`, `parent_id`, `site_id`

**Workouts**
- `id`, `week`, `week_focus`, `title`, `description`, `goal`, `workout_data` (JSON), `discussion_data` (JSON), `instructor_notes`, `created_by` (head coach id), `created_at`

**Feedback**
- `id`, `athlete_id`, `coach_id`, `week`, `effort`, `attitude`, `performance`, `listening`, `working_with_others`, `comments`, `created_at`

**Attendance**
- `id`, `athlete_id`, `session_date`, `present`, `coach_id`

**CRM Contacts**
- `id`, `name`, `organization`, `email`, `phone`, `pipeline` ('educational-leaders' | 'ptas' | 'coaches-runners' | 'connectors'), `stage`, `notes`, `created_at`

**Site Pricing**
- `id`, `site_id`, `pricing_options` (JSON), `created_at`, `updated_at`

---

## Implementation Status

### ✅ Completed (Demo/Scaffold)
- Head Coach Portal structure
- Coach Portal structure
- Parent Portal structure
- CRM with 4 pipelines
- Recruit dashboard with goals
- Workout distribution flow (mock)
- Feedback system (mock)
- Communication system (mock)

### ⏳ In Progress / Needs Work
- **Registration Setup** - Per-site pricing configuration
- **Checkout Integration** - Connect Head Coach pricing to Parent Portal
- **Coach Onboarding** - Assign coaches to sites
- **Site Management** - Full CRUD for sites
- **Onboarding Module** - New repo for static landing pages
- **Backend API Integration** - Connect to actual GoFast Backend
- **Authentication** - Real auth system
- **Payment Processing** - Stripe/PayPal integration

### 🔴 TODO / Not Started
- Onboarding module repo (static HTML)
- Payment processing
- Email notifications
- Real-time updates
- Mobile optimization

---

## Key Design Principles

1. **Head Coach = Super Admin**: Full control, feeds data to other portals
2. **Site-Based Isolation**: Coaches see only their site, parents register for one site
3. **Pricing Variance**: Each site can have different pricing (configured by Head Coach)
4. **Workout Sync**: Head Coach creates → All coaches see → All parents see
5. **Feedback Delay**: 24-hour delay before parents see coach feedback
6. **Demo First**: Scaffolding with mock data, backend integration later

---

## Deployment Structure

### Frontend Applications
- **Head Coach Portal**: `headcoach.gofast.com` (Vercel)
- **Coach Portal**: `coach.gofast.com` (Vercel)
- **Parent Portal**: `parent.gofast.com` (Vercel)
- **Onboarding Module**: `gofast.com/run` (Vercel/Netlify - static HTML)

### Backend
- **API**: `api.gofast.com/api/bgr/*` (GoFast Backend v2)

---

## Environment Variables

### Head Coach Portal
```env
VITE_API_BASE=https://api.gofast.com/api
VITE_PROJECT_KEY=bgr
```

### Coach Portal
```env
VITE_API_BASE=https://api.gofast.com/api
VITE_PROJECT_KEY=bgr
```

### Parent Portal
```env
VITE_API_BASE=https://api.gofast.com/api
VITE_PROJECT_KEY=bgr
```

---

## Critical Integration Points

### 1. Site Pricing → Checkout
**Priority**: HIGH
- Head Coach sets pricing per site
- Parent Portal registration displays correct pricing
- Checkout uses site-specific pricing

### 2. Onboarding Module
**Priority**: MEDIUM
- New repo needed
- Static HTML pages
- Generated from Head Coach site creation
- Links to Parent Portal registration

### 3. Coach Assignment
**Priority**: HIGH
- Head Coach assigns coaches to sites
- Coaches only see their assigned site
- Site isolation in Coach Portal

### 4. Workout Distribution
**Priority**: HIGH
- Head Coach creates → All coaches receive
- All parents see same workout
- Real-time sync needed

---

## Next Steps

1. **Complete Registration Setup**
   - Per-site pricing configuration
   - Dropdown options
   - Variance support

2. **Build Checkout Integration**
   - Connect Head Coach pricing to Parent Portal
   - Payment processing
   - Registration confirmation

3. **Create Onboarding Module**
   - New repo for static pages
   - Site-specific landing pages
   - Registration flow

4. **Backend Integration**
   - Connect all portals to GoFast Backend API
   - Real authentication
   - Data persistence

5. **Coach Assignment Flow**
   - Head Coach can assign coaches to sites
   - Site-based filtering in Coach Portal

---

*Last Updated: January 2025*
*Status: Demo/Scaffold - Ready for Backend Integration*

