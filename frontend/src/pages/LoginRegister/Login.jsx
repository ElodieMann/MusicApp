import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getUserId, isLog } from "../../redux/userId";
import { logIn } from "../../services/api";
import styles from "./Login.module.scss";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [err, setErr] = useState("");

  const onChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const log = async (e) => {
    e.preventDefault();

    try {
      const credential = { email: user.email, password: user.password };
      const response = await logIn(credential);

      if (response) {
        dispatch(getUserId(response.data.id));
        dispatch(isLog(true));
        navigate("/");
      }
    } catch (e) {
      console.log(e);

      setErr(e.response.data.error); 
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
          onChange={onChange}
        />

        <label htmlFor="password">Password</label>

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={onChange}
        />
        <input type="submit" value="Log In" />
      </form>

      <p className={styles.redirect}>
        Don't have an account?{" "}
        <Link className={styles.redirectRegister} to="/register">
          Register
        </Link>
      </p>

      {!!err && <p className={styles.errData}>{err}</p>}
    </div>
  );
};

export default Login;
