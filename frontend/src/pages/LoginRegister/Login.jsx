import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import styles from "./Login.module.scss";

const Login = ({ setIsLog, setUserIdStorage }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errData, setErrData] = useState(false);
  const [err, setErr] = useState('');

  const log = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3300/login", {
        email,
        password,
      });

      setUserIdStorage(response.data.id);

      setIsLog(true);

     
    } catch (e) {
      console.log(e);
      setErrData(true);
      setErr(e.response.data.error);
      setEmail("");
      setPassword("");
      setUserIdStorage(null);
    }
  };

  return (
    <div className={styles.login}>
      <form className={styles.formLogin} onSubmit={log}>
        <h1>I have an account</h1>

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
        Don't have an account?{" "}
        <Link className={styles.redirectRegister} to="/register">
          Register
        </Link>
      </p>

      {errData && <p className={styles.errData}>{err}</p>}
    </div>
  );
};

export default Login;
