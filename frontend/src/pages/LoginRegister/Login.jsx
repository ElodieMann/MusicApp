//Login.jsx
import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getUserId, isLog } from "../../redux/userId";
import styles from "./Login.module.scss";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // pareil que register creer un seul state qui contient les 2
  const [errData, setErrData] = useState(false);
  const [err, setErr] = useState("");

  // creer une seule fonction onChange voir ficher Register

  const log = async (e) => {
    e.preventDefault();

    try {
      // fonction dans ficher api 
      // const credential = { email, password }
      // const response = await logIn(credential)
      const response = await axios.post("http://localhost:3300/login", {
        email,
        password,
      });

      // tu dois mettre ca dans un iff
      dispatch(getUserId(response.data.id));
      dispatch(isLog(true));
      navigate("/");
      //
      
    } catch (e) {
      console.log(e);
      
      setErrData(true);
      setErr(e.response.data.error); // pas besoin des 2 si tu as une reponse.data.error alors cest forcemment true enleve le boolean
      
      setEmail("");
      setPassword("");
      dispatch(getUserId(""));
      dispatch(isLog(false));
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
