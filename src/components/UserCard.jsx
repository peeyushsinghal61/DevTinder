import { useLocation } from "react-router-dom";

const UserCard = ({ user }) => {
  const location = useLocation();

  return (
    <div className="card bg-base-300 w-96 shadow-sm">
      <figure>
        {user?.photoUrl && (
          <img src={user.photoUrl} alt={user?.firstName} />
        )}
      </figure>
      <div className="card-body">
        <h2 className="card-title">{user?.firstName + " " + user?.lastName}</h2>
        {user?.age && user?.gender && <p>{user?.age + ", " + user?.gender}</p>}
        <p>{user?.about}</p>
        {location.pathname !== "/profile" && (
          <div className="card-actions justify-center">
            <button className="btn btn-secondary">interested</button>
            <button className="btn btn-primary">ignore</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserCard;
