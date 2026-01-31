import React from "react"
import { AppProvider } from "../context/AppContext"
import Navbar from "./Navbar"
import { Routes, Route } from "react-router-dom"

import Home from "../pages/Home"
import PostDetail from "../pages/PostDetail"
import Communities from "../pages/Communities"
import CommunityDetail from "../pages/CommunityDetail"
import Companies from "../pages/Companies"
import CompanyDetail from "../pages/CompanyDetail"
import Resources from "../pages/Resources"
import Bookmarks from "../pages/Bookmarks"
import Search from "../pages/Search"
import FloatingActionButton from "./FloatingActionButton"

function Layout() {
  return (
    <AppProvider> {/* ✅ THIS IS THE FIX */}
      <div className="app">
        <Navbar />

        <div className="main-container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/post/:id" element={<PostDetail />} />
            <Route path="/communities" element={<Communities />} />
            <Route path="/community/:id" element={<CommunityDetail />} />
            <Route path="/companies" element={<Companies />} />
            <Route path="/company/:id" element={<CompanyDetail />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/search" element={<Search />} />
            <Route path="/bookmarks" element={<Bookmarks />} />
          </Routes>

          <FloatingActionButton />
        </div>
      </div>
    </AppProvider>
  )
}

export default Layout