import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import {addUser} from "../utils/userSlice";
import FeedCard from "./FeedCard";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [age, setAge] = useState(user.age);
  const [gender, setGender] = useState(user.gender);
  const [about, setAbout] = useState(user.about);
  const dispatch = useDispatch();

  const [error, setError] = useState("");
  const handleEditProfile = async () => {
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        { firstName, lastName, age, gender, about },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
    } catch (error) {
      setError(error.message);
    }
  };
  useEffect(() => {
    handleEditProfile();
  }, []);
  return (
    <div className="flex justify-center my-10">
      <div className="card bg-base-300 w-96 shadow-sm ">
        <div className="card-body">
          <h2 className="card-title">Edit Profile</h2>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">First Name</legend>
            <input
              type="text"
              className="input"
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Last Name</legend>
            <input
              type="text"
              className="input"
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
              }}
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Age</legend>
            <input
              type="text"
              className="input"
              value={age}
              onChange={(e) => {
                setAge(e.target.value);
              }}
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Gender</legend>
            <input
              type="text"
              className="input"
              value={gender}
              onChange={(e) => {
                setGender(e.target.value);
              }}
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">About</legend>
            <input
              type="text"
              className="input"
              value={about}
              onChange={(e) => {
                setAbout(e.target.value);
              }}
            />
          </fieldset>
          <p className="text-red-600">{error}</p>
          <div className="card-actions  flex justify-center">
            <button className="btn btn-secondary" onClick={handleEditProfile}>Save Profile</button>
          </div>
        </div>
      </div>
      <FeedCard user ={{firstName, lastName, age, gender, about}} />
    </div>
  );
};

export default EditProfile;
