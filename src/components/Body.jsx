import { useEffect } from "react";
import Navbar from "./Navbar";
import { Outlet, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Base_Url } from "../utils/constant";
import { addUser } from "../utils/userSlice";
const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user.user);
  const fetchData = async () => {
    try {
      let res = await axios.get(Base_Url + "/profile/view", {
        withCredentials: true,
      });
      console.log(res);
      dispatch(addUser(res.data));
    } catch (err) {
      if(err.status === 401) {
      navigate("/login");}
      console.log("somthig went wrong");
    }
  };
  useEffect(() => {
    if(!user) {
      fetchData();
    }
  }, []);
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Body;
