import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import Community from '../pages/Community'
import Jobs from '../pages/Jobs'
import Resources from '../pages/Resources'
import Bookmarks from '../pages/Bookmarks'
import Profile from '../pages/Profile'
import Settings from '../pages/Settings'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/community" element={<Community />} />
      <Route path="/jobs" element={<Jobs />} />
      <Route path="/resources" element={<Resources />} />
      <Route path="/bookmarks" element={<Bookmarks />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
  )
}