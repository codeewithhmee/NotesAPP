import { useState,useEffect } from "react"
import { useNavigate } from "react-router-dom"

const Login = () => {
  const [email,    setEmail]    = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

   useEffect(() => {
  if (localStorage.getItem("user_id")) {
    navigate("/home")
  }
}, [])

  const handleLogin = async (e) => {
    e.preventDefault()
    const res  = await fetch("http://localhost:5000/api/login", {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify({ email, password })
    })
    const data = await res.json()
    if (data.success) {
      localStorage.setItem("user_id", data.user.id)
      navigate("/home")
    }
  }

  return (
  <div className="login-wrapper">
    <div className="login-card">

      <div className="login-header">
        <h2>Welcome back</h2>
        <p>Login to your notes</p>
      </div>

      <form onSubmit={handleLogin}>
        <div className="input-group">
          <label>Email</label>
          <input
            type="email"
            placeholder="samir@example.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>

        <button type="submit">Login</button>
      </form>

      <p>No account? <span onClick={() => navigate("/signup")}>Sign up</span></p>

    </div>
  </div>
)
}

export default Login