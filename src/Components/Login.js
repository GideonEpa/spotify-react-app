import React from 'react';

function Login({logout}) {
    return (
        <button onClick={logout}>Logout</button>
    )
}

export default Login;