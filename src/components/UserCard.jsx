import axios from "axios";
import { useLocation } from "react-router-dom";
import { Base_Url } from "../utils/constant";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";
const UserCard = ({ user }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  console.log(user);
  async function handleRequests(status, id) {
    try {
      let response = await axios.post(
        Base_Url + `/send/${status}/${id}`,
        {},
        { withCredentials: true },
      );
      console.log("request handled successfully", response);
      dispatch(removeUserFromFeed(response.data.id._id));
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="card bg-base-300 w-72 shadow-sm m-4">
      <figure>
        {user?.photoUrl && (
          <img
            src={user.photoUrl}
            alt={user?.firstName}
            width="200px"
            height="200px"
          />
        )}
      </figure>
      <div className="card-body">
        <h2 className="card-title">{user?.firstName + " " + user?.lastName}</h2>
        {user?.age && user?.gender && <p>{user?.age + ", " + user?.gender}</p>}
        <p>{user?.about}</p>
        {location.pathname !== "/profile" && (
          <div className="card-actions justify-center">
            <button
              className="btn btn-secondary"
              onClick={() => {
                handleRequests("interested", user._id);
              }}
            >
              interested
            </button>
            <button
              className="btn btn-primary"
              onClick={() => {
                handleRequests("ignored", user._id);
              }}
            >
              ignore
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserCard;
