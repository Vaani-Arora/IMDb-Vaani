import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./login.css";
import Cookies from "js-cookie";
import { BASE_URL } from "../../Base_url";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function submit(e) {
    e.preventDefault();

    await axios
      .post(`${BASE_URL}/auth/login`, {
        email,
        password,
      })
      .then((res) => {
        Cookies.set("token", res.data.token);
        navigate("/");
      })
      .catch((e) => {
        console.log(e);
        if (e.response) {
          if (e.response.status === 401 || e.response.status === 404) {
            alert(e.response.data.msg);
          } else {
            alert("Got incorrect response code from the server.");
          }
        } else {
          alert("Got incorrect response from the server.");
        }
      });
  }

  return (
    <div className="login">
        <div className="formBox">
            <h1 className="logrej">Login</h1>
            <form className="logform" action="POST">
                <input className="log-input" type="email" placeholder="Email" onChange={(e) => {setEmail(e.target.value)}} />
                <input className="log-input" type="password" placeholder="Password" onChange={(e) => {setPassword(e.target.value)}} />
                <input className="button" type="submit" onClick={submit} />
            </form>
            <Link to="/register">Register here</Link>
        </div>
    </div>
  );
}

export default Login;
