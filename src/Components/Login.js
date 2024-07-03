import React from 'react';
import styles from '../Modules/Login.module.css'

function Login({logout}) {
    return (
        <button className={styles.btn} onClick={logout}>Logout</button>
    )
}

export default Login;