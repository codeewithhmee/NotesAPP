import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../loading"


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const[eyeclose,setEyeclose]=useState(true);
  const[passType,setPasstype]=useState("password");
    const[loading,setLoading]=useState(false)
  


  function changeEye(){
    if(eyeclose){
      setEyeclose(false);
      setPasstype("text")
    }else{
      setEyeclose(true);
      setPasstype("password")

    }
  }

  useEffect(() => {
    if (localStorage.getItem("user_id")) {
      navigate("/home");
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch(
      "https://note-backend-b56h.onrender.com/api/login",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      },
    );
    const data = await res.json();

    if (data.success) {
      localStorage.setItem("user_id", data.user.id);
      navigate("/home");
    } else {
      setMessage(data.message);
      console.log("dsds", data);
      setLoading(false)
    }
  };

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
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <div className="pass_bar">
              <input
                type={passType}
                placeholder="Enter your password..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <img onClick={changeEye} src={eyeclose?"../image.png":"../visible.png"} alt="" className="eye_close" />

            </div>
          </div>
            {loading && <Loading/>}
          {!loading && message}

          <button type="submit">Login</button>
        </form>

        <p>
          No account? <span onClick={() => navigate("/signup")}>Sign up</span>
        </p>
      </div>
    </div>
  );
};

export default Login;
