import { Routes, Route, Navigate } from "react-router-dom"
import { useAuth } from "./context/AuthContext.jsx"
import Login from "./pages/Login"
import Layout from "./components/Layout"
import TnpDashboard from "./pages/tnp/TnpDashboard"

export default function App() {
  const { user } = useAuth()

  return (
    <Routes>
      {/* PUBLIC ROUTE */}
      <Route
        path="/login"
        element={!user ? <Login /> : <Navigate to="/" />}
      />

      {/* PROTECTED ROUTES */}
      {user ? (
        user.role === "tnp" ? (
          <Route path="/*" element={<TnpDashboard />} />
        ) : (
          <Route path="/*" element={<Layout />} />
        )
      ) : (
        // catch-all redirect to login
        <Route path="*" element={<Navigate to="/login" />} />
      )}
    </Routes>
  )
}
