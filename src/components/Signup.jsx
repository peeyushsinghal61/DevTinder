import { useState } from "react";

const Signup = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
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
              type="password"
              className="grow"
              placeholder="Password "
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <div className="card-actions justify-center">
            <button className="btn btn-primary" onClick={handleLogin}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
