import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

const FeedCard = ({ user }) => {
  const {_id, firstName, lastName, age, gender, about } = user;
  const dispatch = useDispatch();

  const handleSendRequest = async (status, userId) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId, {},
        { withCredentials: true },
      );
      dispatch(removeUserFromFeed(userId));
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="flex justify-center my-4 mb-4">
      <div className="card bg-base-100 w-96 shadow-sm">
        <figure>
          <img
            src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
            alt="Shoes"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{firstName + " " + lastName}</h2>
          <div>
            {age && <p>{age}</p>}
            {gender && <p>{gender}</p>}
          </div>
          <p>{about}</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary" onClick={() =>{handleSendRequest("ignored", _id)}}>Ignored</button>
            <button className="btn btn-secondary" onClick={() =>{handleSendRequest("intrested", _id)}}>Intrested</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedCard;
