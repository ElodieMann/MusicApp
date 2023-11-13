import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getUserId, isLog } from "../../redux/userId";
import { signUp } from "../../services/api";
import styles from "./Login.module.scss";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [user, setUser] = useState({
    username: "",
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };
  const regist = async (e) => {
    e.preventDefault();

    try {
      const userInfo = {
        username: user.username,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        password: user.password,
      }  
      const response = await signUp(userInfo)
    
      if (response)  {
      dispatch(getUserId(response.data?.[0].id));
      dispatch(isLog(true));
      navigate("/");
    }

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
          value={user.username}
          onChange={onChange}
        />
        <label htmlFor="firstname">Firstname</label>
        <input
          type="text"
          name="firstname"
          placeholder="Firstname"
          value={user.firstname}
          onChange={onChange}
        />
        <label htmlFor="lastname">Lastname</label>
        <input
          type="text"
          name="lastname"
          placeholder="Lastname"
          value={user.lastname}
          onChange={onChange}
        />
        <label htmlFor="email">E-mail address</label>
        <input
          type="email"
          name="email"
          placeholder="E-mail address"
          value={user.email}
          onChange={onChange}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={user.password}
          onChange={onChange}
        />
        <input type="submit" value="Log In" />
      </form>

      <p className={styles.redirect}>
        Already have an account
        <Link className={styles.redirectRegister} to="/login">
          Log In
        </Link>
      </p>
    </div>
  );
};

export default Register;
