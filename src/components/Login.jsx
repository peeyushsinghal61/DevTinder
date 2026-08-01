import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { Base_Url } from "../utils/constant";
const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  async function handleLogin() {
    try {
      const res = await axios.post(
        `${Base_Url}/login`,
        { emailId, password },
        { withCredentials: true },
      );
      console.log("Login successful:", res.data);
      dispatch(addUser(res.data));
      navigate("/");
    } catch (error) {
      console.error("Login failed:", error);
      setError("Login failed. Please check your credentials.");
      setEmailId("");
      setPassword("");
    }
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="card card-border bg-base-300 w-96  ">
        <div className="card-body flex-col gap-8 ">
          <h2 className="card-title justify-center">Login</h2>
          <label className="input">
            <input
              type="email"
              className="grow"
              placeholder="Email"
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
            />
          </label>
          <label className="input">
            <input
              type="password"
              className="grow"
              placeholder="Password "
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <p className="text-red-500 text-sm">{error}</p>
       <div className="flex card-actions justify-center items-center gap-16">
            <button className="btn btn-primary" onClick={handleLogin}>
              login
            </button>
            <div className="flex items-center">
              <p>new user?</p>
              <button className="btn btn-primary ml-2" onClick={()=>{navigate("/signup")}}>
                Signup
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
