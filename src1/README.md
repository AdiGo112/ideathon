# CampusLoop - University Discussion Platform Prototype

A Reddit-style frontend prototype for a university-only discussion platform. This is a **frontend-only** demo with no backend, authentication, or API calls - perfect for showcasing UX and layout design.

## 🎯 Project Overview

CampusLoop is designed to be a familiar yet purpose-built platform for university students, alumni, and faculty to discuss internships, share interview experiences, and connect around career opportunities.

## 🚀 Quick Start

Simply open `index.html` in your browser. No build process, no dependencies, no server required.

## 📁 File Structure

```
├── index.html          # Complete standalone app (React via CDN)
├── campusloop.jsx      # React component (for reference/development)
├── campusloop.css      # Stylesheet (for reference/development)
└── README.md          # This file
```

## 🎨 Design Decisions

### Visual Style - Reddit-Inspired

**Why Reddit's design works well for this use case:**
- **Information density**: Students want to scan many posts quickly
- **Clear hierarchy**: Vote counts and metadata are instantly visible
- **Minimal chrome**: Content takes center stage, not flashy UI elements
- **Familiar patterns**: Students already know how to navigate Reddit-style layouts

**Color Palette:**
- Light gray background (`#dae0e6`) - easy on the eyes for long reading sessions
- White content cards - clean separation between posts
- Orange accent (`#ff4500`) - draws attention to upvotes and important elements
- Blue accent (`#0079d3`) - links and interactive elements
- Subtle borders - just enough definition without feeling cluttered

### Typography Choices

**Space Mono** (logo) - Distinctive, technical, memorable
**IBM Plex Sans** (body) - Readable, professional, slightly warmer than system fonts

Avoiding generic choices like Inter, Roboto, Arial maintains visual interest while staying highly readable.

### Layout Structure

**Three-column layout:**
1. **Left Sidebar (240px)**: Navigation and communities - sticky for easy access
2. **Center Feed (flexible)**: Main content area - posts dominate the viewport
3. **Right Sidebar (300px)**: Announcements, trending, filters - sticky for quick actions

**Responsive behavior:**
- < 1024px: Left sidebar collapses, showing only center + right
- < 768px: Mobile single-column view

### Component Architecture

**Post Card Anatomy:**
```
┌─────────────────────────────────────┐
│ [Vote] │ [Tags] [Title]             │
│  ▲    │ [Preview text]              │
│ 892   │ Author | Role | Batch       │
│  ▼    │ Comments | Timestamp        │
└─────────────────────────────────────┘
```

**Key Features:**
- Upvote/downvote with instant feedback
- Visual badges for Student/Alumni/Faculty roles
- Color-coded post types (Interview Experience, Question, Announcement)
- Pinned posts stand out with green accent and "pinned" badge
- Company tags for quick filtering
- Disabled downvotes on Announcements (as per requirements)

## 💡 Interactive Features

### Working Features (Frontend Only)
✅ Upvote/downvote posts (updates local state)
✅ Filter by batch ("All" or "My Batch" - shows only Batch 2027)
✅ Filter by company (dropdown)
✅ Filter by post type (dropdown)
✅ Pinned posts always appear first
✅ Hover states on all interactive elements

### Mock Data Structure

Each post object contains:
```javascript
{
  id: number,
  title: string,
  content: string,
  authorName: string,
  authorRole: 'Student' | 'Alumni' | 'Faculty',
  batch: string | null,
  company: string | null,
  postType: 'Interview Experience' | 'Question' | 'Announcement',
  score: number,
  commentsCount: number,
  timestamp: string,
  isPinned: boolean
}
```

## 🎭 Sample Content

The prototype includes 8 diverse posts:
- TPO announcements (pinned, faculty)
- FAANG interview experiences (alumni)
- Career advice questions (students)
- Company-specific threads (Google, Microsoft, Amazon, Goldman Sachs)

4 Communities:
- DSA (2.3k members)
- ML & AI (1.8k members)
- Resume Review (3.1k members)
- Campus Beauties (892 members)

5 Trending topics to showcase the sidebar

## 🔧 Technical Implementation

**React Patterns Used:**
- `useState` for local state management
- Controlled components for filters
- Array mapping for rendering lists
- Conditional rendering for badges and tags
- Event handlers for voting and filtering

**CSS Techniques:**
- CSS Grid for three-column layout
- Flexbox for component internal layouts
- CSS custom properties (variables) for theming
- Sticky positioning for sidebars and navbar
- Hover transitions for interactivity
- Responsive breakpoints

**No External UI Libraries:**
As requested, we built everything from scratch using plain CSS and React. This keeps the bundle size minimal and gives complete control over the design.

## 🎯 Use Cases

Perfect for demoing:
- UX flow for university career platforms
- Community discussion interfaces
- Content filtering and discovery
- Role-based content display
- Mobile-responsive layouts

## 🚀 Future Enhancements (If Building Real Version)

- Individual post detail pages with comments
- User authentication and profiles
- Real-time updates
- Search functionality
- Rich text editor for posts
- Image uploads
- Notification system
- Private messaging
- Email digests
- Moderation tools

## 📝 Notes

**Why this design over alternatives:**
- **Not a corporate dashboard**: Avoided card-heavy, low-density layouts
- **Not a social feed**: Optimized for information scanning, not endless scrolling
- **Student-friendly tone**: Informal enough to feel comfortable, formal enough to be taken seriously
- **Performance-conscious**: Minimal CSS, no heavy frameworks, fast load times

**Browser Compatibility:**
Works in all modern browsers (Chrome, Firefox, Safari, Edge). Uses standard CSS Grid and Flexbox - no experimental features.

---

Built as a frontend prototype to demonstrate UX and visual design. Ready for stakeholder demos, user testing, or as a starting point for full implementation.
