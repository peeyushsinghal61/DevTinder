import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Base_Url } from "../utils/constant";
import axios from "axios";
import { removeUser } from "../utils/userSlice";
const Navbar = () => {
  const user = useSelector((store) => store.user.user);
  const dispatch = useDispatch();
  async function handleLogout() {
    try {
      await axios.post(`${Base_Url}/logout`, {}, { withCredentials: true });
      dispatch(removeUser());
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="navbar bg-base-300 shadow-sm">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">
          DevTinder
        </Link>
      </div>
      <div className="flex gap-2">
        <div className="dropdown dropdown-end flex items-center gap-2 flex items-center gap-2">
          <p className="text-sm">Welcome {user?.firstName}</p>
          {user && (
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img alt="Tailwind CSS Navbar component" src={user?.photoUrl} />
              </div>
            </div>
          )}
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link to="/profile" className="justify-between">
                Profile
                <span className="badge">New</span>
              </Link>
            </li>
            <li>
              <Link to="/my-connections">My Connections</Link>
            </li>
            <li>
              <Link to="/request-received">My requests</Link>
            </li>
            <li>
              <Link to="/login" onClick={handleLogout}>
                Logout
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
