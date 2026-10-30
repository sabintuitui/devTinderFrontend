import React from "react";

const FeedCard = ({ user }) => {
  console.log(user);
  const { firstName, lastName, age, gender, about } = user;

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
            <button className="btn btn-primary">Ignored</button>
            <button className="btn btn-secondary">Intrested</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedCard;
