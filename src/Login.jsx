import { useState } from "react";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginHandler = async () => {
    try {
      const res = await axios.post("http://localhost:3000/login", {
        email,
        password,
      });
      console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="card bg-base-300 w-96 shadow-sm justify-center">
      <div className="card-body">
        <h2 className="card-title">Login</h2>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Email:</legend>
          <input
            type="text"
            className="input"
            value={email}
            placeholder="Type here"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </fieldset>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Password:</legend>
          <input
            type="password"
            className="input"
            value={password}
            placeholder="Type here"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </fieldset>
        <div className="card-actions justify-end">
          <button className="btn btn-primary" onClick={loginHandler}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
