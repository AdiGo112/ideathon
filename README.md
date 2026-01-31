# BatchWise - Interactive University Discussion Platform

A fully interactive Reddit-style frontend prototype for university students, alumni, and faculty. Built with React, React Router, and plain CSS - **no backend, no database, all in-memory data**.

## 🎯 Overview

BatchWise is a comprehensive frontend prototype that simulates a fully working discussion platform. All data is stored in memory using React Context, making it perfect for demos, user testing, or as a foundation for a full-stack application.

## ✨ Features

### Core Functionality

#### 🏠 Home Page (`/`)
- Central feed with all posts
- Left sidebar navigation (Home, Communities, Companies, Resources, Bookmarks)
- Right sidebar with:
  - Pinned announcements
  - Trending posts (based on upvotes in last 3 days)
  - Filters (Batch, Company, Post Type)
- Working upvote/downvote system
- Bookmark posts for later
- Click any post to view details

#### 📝 Post Detail Page (`/post/:id`)
- Full post content with formatted paragraphs
- Upvote/downvote functionality (max 1 per user)
- Comment system:
  - Add top-level comments
  - Reply to comments (1 level nesting)
  - Delete your own comments
  - Upvote comments
- Real-time UI updates
- Bookmark toggle

#### 👥 Communities Page (`/communities`)
- Grid of all communities
- Join/Leave functionality
- Member counts
- Click to view community details

#### 🏘️ Community Detail Page (`/community/:id`)
- Community header with description
- Join/Leave button
- Create new posts in the community
- View all posts from that community
- Posts link to full detail pages

#### 🏢 Companies Page (`/companies`)
- Grid of company cards
- Thread counts per company
- Clean, scannable layout

#### 🏗️ Company Detail Page (`/company/:id`)
- Tabbed interface:
  - **Interview Experiences**: All interview-related posts
  - **Resources**: Resource posts for that company
  - **Discussions**: Questions and general discussions
- Posts filtered by selected tab
- All posts clickable to detail view

#### 📚 Resources Page (`/resources`)
- Curated list of resources (DSA sheets, resume templates, etc.)
- Filter by category (DSA, Resume, Interview Prep, Career)
- Upvote counts
- Mock external links

#### 🔍 Search Page (`/search?q=`)
- Global search functionality
- Searches across:
  - **Posts**: Title and content
  - **Users**: Names
  - **Communities**: Name and description
- Results organized by category
- All results are clickable and navigate correctly

#### 🔖 Bookmarks Page (`/bookmarks`)
- View all bookmarked posts
- Quick access to saved content

### Interactions & Behavior

**Upvoting:**
- One upvote per user maximum
- Click again to remove upvote
- Updates immediately in UI
- Downvote disabled for Announcements

**Comments:**
- Add comments to any post
- Reply to comments (1 level deep)
- Delete your own comments only
- Upvote any comment
- Instant UI feedback

**Community Membership:**
- Join/Leave any community
- Button state changes immediately
- Affects "My Communities" visibility

**Bookmarks:**
- Save posts for later
- Toggle on/off
- Persists during session

**Post Creation:**
- Create posts in communities
- Choose post type
- Immediately visible in feed
- Navigates to post detail after creation

## 🛠️ Tech Stack

- **React 18** - UI library
- **React Router 6** - Client-side routing
- **React Context** - State management
- **Plain CSS** - No component libraries
- **Vite** - Build tool & dev server

## 📦 Installation & Setup

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Quick Start

```bash
# Navigate to project directory
cd BatchWise-app

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The app will be available at `http://localhost:5173`

## 📁 Project Structure

```
BatchWise-app/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx          # Top navigation with search
│   │   ├── PostCard.jsx        # Reusable post card component
│   │   └── Comment.jsx         # Comment with nested replies
│   ├── pages/
│   │   ├── Home.jsx            # Main feed with sidebars
│   │   ├── PostDetail.jsx      # Full post view with comments
│   │   ├── Communities.jsx     # All communities grid
│   │   ├── CommunityDetail.jsx # Single community with posts
│   │   ├── Companies.jsx       # All companies grid
│   │   ├── CompanyDetail.jsx   # Company with tabbed content
│   │   ├── Resources.jsx       # Resources with filters
│   │   ├── Search.jsx          # Search results
│   │   └── Bookmarks.jsx       # Saved posts
│   ├── context/
│   │   └── AppContext.jsx      # Global state management
│   ├── data/
│   │   └── mockData.js         # All mock data
│   ├── styles/
│   │   └── styles.css          # All CSS in one file
│   ├── App.jsx                 # Main app with routing
│   └── main.jsx                # Entry point
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## 🎨 Design Philosophy

### Reddit-Inspired Aesthetic
- Light gray background (#dae0e6)
- White content cards
- Minimal shadows, visible borders
- Information-dense layout
- No "corporate dashboard" feel

### Color System
- **Orange (#ff4500)**: Upvotes, alumni, questions
- **Blue (#0079d3)**: Links, students, interview experiences
- **Green (#46d160)**: Pins, faculty, announcements
- **Gray shades**: Text hierarchy and backgrounds

### Typography
- **Space Mono**: Logo (distinctive, technical)
- **IBM Plex Sans**: Body text (readable, professional)

## 📊 Mock Data

### Current User
```javascript
{
  id: 1,
  name: "Aditya",
  role: "Student",
  batch: 2027
}
```

### Data Includes
- **10 Users**: Mix of students, alumni, faculty
- **6 Communities**: DSA, ML & AI, Resume Review, Campus Beauties, Web Dev, Product Management
- **8 Companies**: Google, Microsoft, Amazon, Goldman Sachs, Meta, Apple, Netflix, Uber
- **12 Posts**: Interview experiences, questions, announcements, discussions
- **6 Resources**: DSA sheets, resume templates, interview prep guides

### Post Object Structure
```javascript
{
  id: number,
  title: string,
  content: string,
  authorId: number,
  communityId: number | null,
  companyId: number | null,
  postType: 'Interview Experience' | 'Question' | 'Announcement' | 'Discussion',
  upvotes: number[],      // Array of user IDs who upvoted
  comments: Comment[],
  createdAt: ISO string,
  isPinned: boolean
}
```

### Comment Object Structure
```javascript
{
  id: number,
  authorId: number,
  content: string,
  createdAt: ISO string,
  upvotes: number[],
  parentCommentId: number | null,
  replies: Comment[]
}
```

## 🎮 Key Interactions

### Upvoting Logic
- User can upvote once per post/comment
- Clicking again removes the upvote
- Updates vote count immediately
- Stored as array of user IDs

### Comment Threading
- Top-level comments: `parentCommentId = null`
- Replies: `parentCommentId = parent comment ID`
- Maximum 1 level of nesting
- Replies stored in `replies` array

### State Management
All state is managed through React Context:
- `posts` - All posts with comments
- `joinedCommunities` - Communities user has joined
- `bookmarkedPosts` - Post IDs user has bookmarked

State updates trigger immediate re-renders, so all interactions feel instant.

## 🔧 Customization

### Adding More Data

**Add a new post:**
```javascript
// In mockData.js, add to initialPosts array
{
  id: 13,
  title: "Your Post Title",
  content: "Your post content...",
  authorId: 1,
  communityId: 1,
  companyId: null,
  postType: "Discussion",
  upvotes: [],
  comments: [],
  createdAt: new Date().toISOString(),
  isPinned: false
}
```

**Add a new community:**
```javascript
// In mockData.js, add to communities array
{
  id: 7,
  name: "Your Community Name",
  description: "Community description",
  memberCount: 500,
  members: [1, 2, 3]
}
```

### Modifying Styles
All CSS is in `/src/styles/styles.css`. Key CSS variables are at the top:

```css
:root {
  --bg-primary: #dae0e6;        /* Background */
  --bg-secondary: #ffffff;       /* Cards */
  --accent-blue: #0079d3;        /* Links */
  --accent-orange: #ff4500;      /* Upvotes */
  /* ... more variables */
}
```

## 🚀 Use Cases

Perfect for:
- **UX/UI Demos**: Show stakeholders the flow and interactions
- **User Testing**: Get feedback on navigation and features
- **Portfolio Projects**: Demonstrate React and routing skills
- **Full-Stack Foundation**: Add a backend to make it production-ready
- **Learning**: Study React Context and React Router patterns

## 📝 Future Enhancements

If building a real version, consider:
- User authentication & profiles
- Real database (PostgreSQL, MongoDB)
- Rich text editor for posts
- Image uploads
- Real-time notifications
- Direct messaging
- Email digests
- Admin moderation tools
- Sorting options (hot, new, top)
- Post categories/tags
- User karma system
- Report/flag content
- Saved drafts

## 🐛 Known Limitations

- Data resets on page refresh (no persistence)
- No pagination (all posts load at once)
- No image uploads
- No markdown support in posts
- Search is case-insensitive substring match
- No user profiles/edit profile
- No password reset or security features

## 🤝 Contributing

This is a prototype/demo project. Feel free to:
- Fork and extend features
- Use as a starting point for your own project
- Submit improvements or bug fixes
- Use it for learning purposes

## 📄 License

MIT License - feel free to use this project however you'd like.

---

**Built with ❤️ as a frontend prototype for BatchWise**

Questions? Issues? Fork it and make it your own!