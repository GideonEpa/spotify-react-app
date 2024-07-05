import React from 'react';
import styles from '../Modules/Login.module.css'

function Login({logout, userData}) {
    let profileImg = '';
    if (userData.images[1]){
        profileImg = userData.images[1].url
    } 

    return (
        <div className={styles.container}>
            <img 
                style={{
                    borderRadius: 50,
                    width: 50,
                    height: 'auto',
                    objectFit: 'contain',
                    border:'2px solid #ffffff50'
                    }} 
                src={profileImg} />
            <p className={styles.welcome}>{userData.display_name}</p>
            <button 
                className={styles.btn} 
                onClick={logout}>Logout</button>
        </div>
        
    )
}

export default Login;