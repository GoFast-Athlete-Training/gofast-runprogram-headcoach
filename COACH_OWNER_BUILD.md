# Coach/Owner Build - Architecture & Structure

## Premise

**Overall Command Center** - Functions as a comms suite, CRM, and coaching platform all in one integrated system.

The Head Coach/Owner needs a single place to manage:
- Program growth (recruiting sites, coaches, participants)
- Daily operations (curriculum, communication)
- Relationship building (ecosystem, BD)
- System configuration (pricing, registration setup)

---

## Structure Overview

Organized similar to GrowthDashboard.jsx with clear functional separation:

### 1. **Set Up Functions** (Configuration)
Things you configure once or periodically to set up the system.

### 2. **Recruit Functions** (Growth & Goals)
Growth-oriented activities with goals, metrics, and pipelines.

### 3. **Manage Functions** (Operations)
Day-to-day operations and communication.

---

## Dashboard Structure

### Main Dashboard
- **Header Summary** with key metrics (sites, coaches, participants)
- **Goal Progress Bars** (like GrowthDashboard)
  - New Site Goal
  - New Participants Goal  
  - New Coaches Goal
- **Quick Action Cards** organized by function type

---

## Section 1: Recruit (Growth Functions)

### Overview
Similar to GrowthDashboard.jsx with goal bars and pipeline access.

### Components:

#### **Goal Progress Bars**
1. **New Site Goal**
   - Current: X sites
   - Target: Y sites
   - Progress bar with percentage
   - Time horizon indicator

2. **New Participants Goal**
   - Current: X participants
   - Target: Y participants
   - Note: Can come with each new site
   - Progress bar

3. **New Coaches Goal**
   - Current: X coaches
   - Target: Y coaches
   - Progress bar

#### **Pipeline Button**
- Links to CRM with 4 pipelines:
  - Educational Leaders
  - PTAs
  - Coaches & Runners (DMV)
  - All Other Connectors

#### **BD Framework Integration**
- **Attract** - How to attract new sites/coaches/participants
- **Engage** - How to engage with prospects
- **Nurture** - How to nurture relationships

### Pages:
- `/recruit` - Main recruit dashboard with goals
- `/crm` - Pipeline view (4 pipelines)
- `/ecosystem` - Network view (simplified, no philosophy)

---

## Section 2: Manage (Operations Functions)

### Components:

#### **Communicate**
- Send messages to parents & coaches
- Bulk messaging
- Audience selection (Parents, Coaches, Everyone)
- **Status**: ✅ Good as is

#### **Set Up Registration**
- Currently labeled "Pricing" - needs rename/refactor
- Each school needs:
  - Dropdown of pricing options
  - Variance support (different schools, different prices)
  - Registration flow configuration
- **Location**: Could go in Settings or be its own section
- **Purpose**: Configure how each site handles registration and pricing

#### **Curriculum**
- Create weekly workout plans
- Distribute to all sites
- Character themes, exercises, discussion topics
- **Status**: ✅ Good as is

### Pages:
- `/communicate` - ✅ Good
- `/curriculum` - ✅ Good
- `/registration` or `/settings` - Needs refactor (currently `/pricing`)

---

## Section 3: Set Up Functions (Configuration)

### Components:

#### **Settings**
- General system settings
- Gmail configuration (for email sending)
- **Registration Setup** (consider moving here)
  - Per-school pricing configuration
  - Registration flow settings
  - Dropdown options for each site

#### **Ecosystem**
- **Current**: Too philosophical, not built out
- **Needed**: 
  - How to add people to network
  - View connections
  - Less philosophy, more functionality
- **Connection**: Should link back to CRM pipelines

---

## Navigation Structure

### Sidebar Menu:
1. **Dashboard** - Main command center
2. **Recruit** - Growth goals & pipeline
3. **CRM** - Pipeline management (4 pipelines)
4. **Ecosystem** - Network view (simplified)
5. **Curriculum** - Weekly plans
6. **Communicate** - Messaging
7. **Registration Setup** - Pricing/registration config (rename from Pricing)
8. **Settings** - System configuration

---

## Goal-Based Dashboard (Recruit Section)

### Layout (Similar to GrowthDashboard.jsx):

```
┌─────────────────────────────────────────────────┐
│  Recruit Dashboard                               │
│  Your command center for program growth          │
├─────────────────────────────────────────────────┤
│  [Pipeline Button]  [Add New Contact]           │
├─────────────────────────────────────────────────┤
│  New Site Goal                                   │
│  Current: 5  |  Target: 10  |  50%              │
│  [Progress Bar]                                  │
├─────────────────────────────────────────────────┤
│  New Participants Goal                           │
│  Current: 145  |  Target: 300  |  48%            │
│  [Progress Bar]                                  │
├─────────────────────────────────────────────────┤
│  New Coaches Goal                                │
│  Current: 12  |  Target: 20  |  60%              │
│  [Progress Bar]                                  │
├─────────────────────────────────────────────────┤
│  Growth Drivers                                  │
│  Attract • Engage • Nurture                      │
│  [3 Cards with metrics]                          │
└─────────────────────────────────────────────────┘
```

### Stack Cards (Like GrowthDashboard):
1. **Attract**
   - Metrics: Upcoming events, content posts, outreach channels
   - Insight quote
   - Route to attract strategies

2. **Engage**
   - Metrics: Contacts, meetings, events
   - Insight quote
   - Route to engagement tools

3. **Nurture**
   - Metrics: Campaigns, newsletters, response rate
   - Insight quote
   - Route to nurture tools

---

## CRM Pipeline Structure

### 4 Pipelines:
1. **Educational Leaders**
   - Principals, superintendents, district administrators
   - Stages: Initial Contact → Building Relationship → Exploring Opportunity → Moving Forward → Active Partner

2. **PTAs**
   - Parent Teacher Associations and parent groups
   - Same stages

3. **Coaches & Runners (DMV)**
   - Other coaches and runners in the DMV area
   - Same stages

4. **All Other Connectors**
   - Community leaders, influencers, connectors
   - Same stages

---

## Ecosystem Refactor

### Current Issues:
- Too philosophical
- Not built out enough
- Doesn't show how to add people

### Needed:
- Simple network visualization
- Easy way to add connections
- Link back to CRM pipelines
- Show connections by category
- Less "think about relationships" - more "here's your network"

---

## Registration Setup (Currently Pricing)

### Current State:
- Labeled as "Pricing"
- Shows pricing per athlete (monthly, semester, annual)
- Shows discounts

### Needed:
- **Rename**: "Registration Setup" or "Site Registration"
- **Per-Site Configuration**:
  - Each school gets dropdown of pricing options
  - Support variance (different prices per school)
  - Registration flow configuration
  - What information to collect
- **Consider**: Move to Settings or make its own section

---

## Key Design Principles

1. **Goal-Oriented**: Like GrowthDashboard, show progress toward goals
2. **Functional Separation**: Set Up vs Recruit vs Manage
3. **Pipeline-Driven**: CRM uses 4 pipelines (not just "sites")
4. **BD Framework**: Attract, Engage, Nurture integration
5. **Scaffolding First**: Don't overbuild, but structure is important

---

## Implementation Priority

### Phase 1: Structure
- ✅ Dashboard with 3 main sections
- ✅ CRM with 4 pipelines
- ⏳ Recruit dashboard with goal bars
- ⏳ Ecosystem refactor (simplify)

### Phase 2: Refinements
- ⏳ Registration Setup refactor
- ⏳ Add BD framework (Attract/Engage/Nurture)
- ⏳ Improve ecosystem functionality

### Phase 3: Integration
- Connect goals to actual data
- Connect pipelines to recruiting
- Full BD workflow

---

## Notes

- **Scaffolding Focus**: Don't overbuild, but get structure right
- **GrowthDashboard Inspiration**: Use similar layout and goal-oriented approach
- **Ecosystem Simplification**: Remove philosophy, add functionality
- **Registration**: Needs to be per-site, not global pricing
- **BD Integration**: Attract/Engage/Nurture should inform recruiting strategy

---

*Last Updated: January 2025*

