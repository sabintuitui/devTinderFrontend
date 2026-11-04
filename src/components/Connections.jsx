import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/connectionSlice";

const Connections = () => {
  const connections = useSelector((store) => store.connection);
  const dispatch = useDispatch();

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnection(res?.data?.data));
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);
  if (!connections) return;
  if (connections.length === 0) return <h1>No Connection Found !</h1>;

  return (
    <div className="text-center my-10">
      <h1 className="text-2xl">Connections</h1>
      {connections.map((connection) => {
        const { firstName, lastName, about, age, gender } = connection;
        return (
          <div className="flex justify-center card card-side bg-base-50 shadow-sm mb-4 ml-5">
            <figure>
              <img
                src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
                alt="Movie"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{firstName + " " + lastName}</h2>
              <p>{about}</p>
              {age && gender && <p>{age + "," + gender}</p>}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Connections;
