import axios from "axios";
import { useState } from "react";
import { Base_Url } from "../utils/constant";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  async function handleSignUp() {
    try {
      const obj = await axios.post(
        Base_Url + "/signup",
        { emailId, password, firstName, lastName },
        { withCredentials: true },
      );
      console.log(obj);
      dispatch(addUser(obj.data))
      navigate("/profile")
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="card card-border bg-base-300 w-96  ">
        <div className="card-body flex-col gap-8 ">
          <h2 className="card-title justify-center">Login</h2>
          <label className="input">
            <input
              type="text"
              className="grow"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </label>
          <label className="input">
            <input
              type="text"
              className="grow"
              placeholder="Last Name    "
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </label>
          <label className="input">
            <input
              type="email"
              className="grow"
              placeholder="EmailId"
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
          <div className="flex card-actions justify-center items-center gap-16">
            <button className="btn btn-primary" onClick={handleSignUp}>
              SignUp
            </button>
            <div className="flex items-center">
              <p>alreadyUser?</p>
              <button
                className="btn btn-primary ml-2"
                onClick={() => {
                  navigate("/login");
                }}
              >
                login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
