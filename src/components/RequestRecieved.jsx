import { useEffect } from "react";
import { Base_Url } from "../utils/constant";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addRecievedRequests, removeRecievedRequests } from "../utils/recievedRequestSlice";

const RequestRecieved = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.recievedRequests);
  async function getAllRecievedRequests() {
    try {
      let allRecievedRequests = await axios.get(
        Base_Url + "/user/requests/recieved",
        { withCredentials: true },
      );
      console.log("all recieved request", allRecievedRequests.data.data);
      dispatch(addRecievedRequests(allRecievedRequests.data.data));
    } catch (error) {
      console.log("error in fetching recieved requests", error);
    }
  }
  async function reviewRequest(status, requestId) {
    try {
        let responseStatus=await axios.post(Base_Url+`/review/${status}/${requestId}`,{} ,{withCredentials:true})
        console.log("review request response",responseStatus)
        dispatch(removeRecievedRequests(requestId));
    } catch (error) {
        console.log("error in reviewing request",error)
    }
  }

  useEffect(() => {
    if (requests && requests.length > 0) {
      console.log("cache");
      return;
    }
    getAllRecievedRequests();
  }, []);

  if (!requests || requests.length == 0) {
    return (
      <h2 className="flex items-center justify-center mt-20">
        No requests found
      </h2>
    );
  }

  return (
    <div className="flex flex-wrap gap-4 items-center justify-center my-4">
      {requests.map((request) => {
        return (
          <div
            className="card bg-base-300 w-72 shadow-sm py-4"
            key={request.id}
          >
            <figure>
              <img
                width="200"
                height="200"
                src={request.fromUserId.photoUrl}
                alt={`${request.fromUserId.firstName} ${request.fromUserId.lastName}`}
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">
                {request.fromUserId.firstName} {request.fromUserId.lastName}
              </h2>
              <p>Age: {request.fromUserId.age}</p>
              <p>Gender: {request.fromUserId.gender}</p>
              <p>{request.fromUserId.about}</p>
            </div>
            <div className="card-actions justify-center">
              <button
                className="btn btn-primary"
                onClick={() => reviewRequest("rejected", request._id)}
              >
                reject
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => reviewRequest("accepted", request._id)}
              >
                accept
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default RequestRecieved;
