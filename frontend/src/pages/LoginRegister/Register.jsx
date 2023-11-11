import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getUserId,  isLog} from "../../redux/userId"
import styles from "./Login.module.scss";
 
const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

 
  const [username, setUsername] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const regist = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3300/register", {
        username,
        firstname,
        lastname,
        email,
        password,
      });

      dispatch(getUserId(response.data.id));

      dispatch(isLog(true));
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className={styles.login}>
      <form className={styles.formLogin} onSubmit={regist}>
        <h1>Register</h1>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="firstname">Firstname</label>
        <input
          type="text"
          name="firstname"
          placeholder="Firstname"
          onChange={(e) => setFirstname(e.target.value)}
        />
        <label htmlFor="lastname">Lastname</label>
        <input
          type="text"
          name="lastname"
          placeholder="Lastname"
          onChange={(e) => setLastname(e.target.value)}
        />
        <label htmlFor="email">E-mail address</label>
        <input
          type="email"
          name="email"
          placeholder="E-mail address"
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <input type="submit" value="Log In" />
      </form>

      <p className={styles.redirect}>
        Already have an account{" "}
        <Link className={styles.redirectRegister} to="/login">
          Log In
        </Link>
      </p>
    </div>
  );
};

export default Register;
