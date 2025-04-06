import React from 'react';

const Login = () => {
  return (
    <div className="login-wrapper">
      <div className="login-box">
        <h1>Login</h1>
        <form>
          <label>Email</label>
          <input type="email" placeholder="Email" />

          <label>Password</label>
          <input type="password" placeholder="Password" />

          <input type="submit" value="Login" />
        </form>
      </div>

      <p className="para-2">
        Not have an account? <a href="/Signup">Sign Up Here</a>
      </p>
    </div>
  );
};

export default Login;
