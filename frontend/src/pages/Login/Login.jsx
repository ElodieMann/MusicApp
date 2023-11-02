import React from 'react';
import styles from "./Login.module.scss"

const Login = () => {
    return (
        <div className={styles.login}>
            <form className={styles.formLogin}>
            <h1>I have an account</h1>
                <label htmlFor="email">E-mail address</label>
                <input type="email" name='email' placeholder='E-mail address'/>
                <label htmlFor="password">Password</label>
                <input type="password" name='password' placeholder='Password'/>
                <input type="submit" value="Send" />
            </form>

            <p className={styles.redirect}>Don't have an account? <a className={styles.redirectRegister} href="">Register</a></p>
        </div>
    );
};

export default Login;