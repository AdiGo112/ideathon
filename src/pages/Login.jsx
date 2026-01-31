import { useState } from "react"
import { useAuth } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"
import "../styles/login.css"

export default function Login() {
  const [identifier, setIdentifier] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = e => {
    e.preventDefault()

    const success = login(identifier, password)
    if (success) navigate("/")
    else setError("Invalid credentials")
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-left">
          <h2>BatchWise</h2>
          <p>Connect with your batch & beyond</p>
        </div>

        <form className="login-right" onSubmit={handleSubmit}>
          <h3>Login</h3>

          <input
            placeholder="PRN or Email"
            value={identifier}
            onChange={e => setIdentifier(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />

          {error && <p className="error">{error}</p>}

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  )
}