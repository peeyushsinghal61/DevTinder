import axios from "axios";
import { useEffect } from "react";
import { Base_Url } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { setFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);
  console.log("feed in feed component", feed);
  const getFeed = async () => {
    if (feed) return; // If feed is already fetched, do not fetch again
    try {
      let res = await axios.get(Base_Url + "/user/feed", {
        withCredentials: true,
      });

      dispatch(setFeed(res.data.data));
    } catch (err) {
      console.log("Something went wrong while fetching the feed:", err);
    }
  };
  useEffect(() => {
    getFeed();
  }, []);

  if (!feed || feed.length === 0) {
    return (
      <h2 className="flex items-center justify-center mt-20">No users found</h2>
    );
  }

  return (
    <div className="flex flex-wrap items-center justify-center my-4">
      {feed &&<UserCard key={feed[0]._id} user={feed[0]} />}
    </div>
  );
};

export default Feed;
