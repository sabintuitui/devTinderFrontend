import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequest, removeRequest } from "../utils/requestSlice";

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();
  const handleReview = async (status, _id) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true },
      );
      dispatch(removeRequest(_id));
    } catch (err) {
      console.error(err.message);
    }
  };
  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      dispatch(addRequest(res?.data?.data));
    } catch (error) {
      console.error(error.message);
    }
  };
  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) return;
  if (requests.length === 0)
    return <h2 className="text-center my-5">Request not Found!</h2>;

  return (
    <div className="text-center my-10">
      <h1 className="text-2xl">Requests</h1>
      {requests.map((request) => {
        const { firstName, lastName, about, age, gender } = request.fromUserId;
        return (
          <div className="flex justify-center card card-side bg-base-50 shadow-sm mb-4 ml-5">
            <figure>
              <img
                className="w-10 h-10"
                src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
                alt="Movie"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{firstName + " " + lastName}</h2>
              <p>{about}</p>
              {age && gender && <p>{age + "," + gender}</p>}
            </div>
            <div className="my-3 mx-6 px-2">
              <button
                className="btn btn-primary mx-3"
                onClick={() => {
                  handleReview("rejected", request._id);
                }}
              >
                Rejected
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => {
                  handleReview("accepted", request._id);
                }}
              >
                Accepted
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Requests;
