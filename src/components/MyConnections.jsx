import axios from "axios";
import { useEffect } from "react";
import { Base_Url } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";
const MyConnections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();

  async function getConnections() {
    try {
      const response = await axios.get(Base_Url + "/user/connections", {
        withCredentials: true,
      });
      console.log("connections", response.data);
      dispatch(addConnections(response.data));
    } catch (error) {
      console.log("error in fetching connections", error);
    }
  }
  useEffect(() => {
    if (connections) return;
    console.log("fetching connections", connections);
    getConnections();
  }, []);

  if (!connections?.data || connections.data.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        No connections found
      </div>
    );
  }
  console.log("connections", connections);
  return (
    <div className="flex items-center justify-center gap-4 flex-wrap mt-4 flex-wrap">
      {connections?.data?.map((connection) => (
        <div className="card bg-base-300 w-96 shadow-sm" key={connection.id}>
          <figure>
            <img
              src={connection.photoUrl}
              alt={`${connection.firstName} ${connection.lastName}`}
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">
              {connection.firstName} {connection.lastName}
            </h2>
            <p>Age: {connection.age}</p>
            <p>Gender: {connection.gender}</p>
            <p>{connection.about}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyConnections;
