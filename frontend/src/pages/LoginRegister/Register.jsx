import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getUserId, isLog } from "../../redux/userId";
import styles from "./Login.module.scss";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // tu peux creer un seul state object tel que [user, setUser] = useState({
    // username : ""
    // firstname : ""
    // lastname : ""
    // email : ""
    // password : ""
  // })
  // puis tu cree une fonction global qui ajoute l objet enfonction du name tel que 
 
  // const onChange = (e, name) => {
  //   const value = e.target.value;
  //   setUser({
  //     ...username,
  //     [name]: value,
  //   });
  // }; noublie pas de remplacer dans toutes les foncitons input ou tu as setUsername setFirstName....

  const regist = async (e) => {
    e.preventDefault();

    try {
      // fonction dans le ficher api "signUp" et return la response
      // const user = {
      //   username,
      //   firstname,
      //   lastname,
      //   email,
      //   password,
      // } cree un objet pour que ca soit plus propre
      // const response = await signUp(user)
      const response = await axios.post("http://localhost:3300/register", {
        username,
        firstname,
        lastname,
        email,
        password,
      });
      // if res .... {
      dispatch(getUserId(response.data?.[0].id));
      dispatch(isLog(true));
      navigate("/");
    // }

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
        Already have an account
        <Link className={styles.redirectRegister} to="/login">
          Log In
        </Link>
      </p>
    </div>
  );
};

export default Register;
