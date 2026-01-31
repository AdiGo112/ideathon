import { createContext, useContext, useEffect, useState } from "react"
import { users } from "../data/users"

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const storedUser = localStorage.getItem("batchwise_user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const login = (identifier, password) => {
    const foundUser = users.find(
      u =>
        (u.email === identifier || u.prn === identifier) &&
        u.password === password
    )

    if (foundUser) {
      setUser(foundUser)
      localStorage.setItem(
        "batchwise_user",
        JSON.stringify(foundUser)
      )
      return true
    }
    return false
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("batchwise_user")
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
