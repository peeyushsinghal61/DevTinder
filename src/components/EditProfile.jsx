import { useEffect, useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { Base_Url } from "../utils/constant";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [age, setAge] = useState(user?.age || "");
  const [gender, setGender] = useState(user?.gender || "");
  const [about, setAbout] = useState(user?.about || "");
  const [photoUrl, setPhotoUrl] = useState(user?.photoUrl || "");
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);
  const dispatch = useDispatch();
  console.log("user in edit profile", user);
  async function handleSaveProfile() {
    try {
      const updatedProfile = await axios.patch(
        `${Base_Url}/profile/update`,
        { firstName, lastName, age, gender, about, photoUrl },
        { withCredentials: true },
      );
      console.log("Profile updated successfully:", updatedProfile.data);
      setError("");
      setShowToast(true);
      //let t = setTimeout(() => setShowToast(false), 3000);
      dispatch(addUser(updatedProfile.data));
      //return () => clearTimeout(t);
    } catch (error) {
      console.error("Failed to update profile:", error);
      setError(
        "Failed to update profile. Please try again." + error.response.data,
      );
    }
  }
  useEffect(() => {
    if(!showToast) return;
    let t = setTimeout(() => setShowToast(false), 3000);
    return () => clearTimeout(t);
  }, [showToast]);
  
  return (
    <div className="flex justify-center items-center gap-8 my-10">
      {" "}
      {showToast && (
        <div className="toast toast-top toast-start">
          <div className="alert alert-success">
            <span>Message sent successfully.</span>
          </div>
        </div>
      )}
      <div className="flex justify-center items-center">
        <div className="card card-border bg-base-300 w-96  ">
          <div className="card-body flex-col gap-8 ">
            <h2 className="card-title justify-center">Edit Profile</h2>
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
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </label>
            <label className="input">
              <input
                type="text"
                className="grow"
                placeholder="Age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </label>
            <label className="input">
              <input
                type="text"
                className="grow"
                placeholder="Gender"
                value={gender}
                readOnly={true}
              />
            </label>
            <div className="dropdown dropdown-hover">
              <div tabIndex={0} role="button" className="btn m-1">
                Gender
              </div>
              <ul
                tabIndex="-1"
                className="dropdown-content menu bg-base-300 rounded-box z-1 w-52 p-2 shadow-sm cursor-pointer"
                onClick={(e) => setGender(e.target.textContent)}
              >
                <li>male</li>
                <li>female</li>
                <li>other</li>
              </ul>
            </div>
            <label className="input">
              <input
                type="text"
                className="grow"
                placeholder="About"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
              />
            </label>
            <label className="input">
              <input
                type="text"
                className="grow"
                placeholder="Photo URL"
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}
              />
            </label>
            {error && <p className="text-red-500 text-sm">{error}</p>}

            <div className="card-actions justify-center">
              <button className="btn btn-primary" onClick={handleSaveProfile}>
                Save Profile
              </button>
            </div>
          </div>
        </div>
      </div>
      <UserCard user={{ firstName, lastName, age, gender, about, photoUrl }} />
    </div>
  );
};

export default EditProfile;
