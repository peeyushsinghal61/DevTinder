import EditProfile from "./EditProfile";
import { useSelector } from "react-redux";

const Profile = () => {
  const user = useSelector((store) => store.user.user);
  console.log("user in profile component", user);
  if (!user) return null;
  return (
    <div>
      <EditProfile key={user._id} user={user} />
    </div>
  );
};

export default Profile;
