import React from 'react';

const Signup = () => {
  return (
    <div className="signup-wrapper">
      <div className="signup-box">
        <h1>Sign Up</h1>
        <h4>It's free and only takes a minute...</h4>
        <form>
          <label>First Name</label>
          <input type="text" placeholder="Firstname" />

          <label>Last Name</label>
          <input type="text" placeholder="Lastname" />

          <label>Email</label>
          <input type="email" placeholder="Email" />

          <label>Date of Birth</label>
          <input type="date" />

          <label>Phone Number</label>
          <input type="number" placeholder="Phone number" />

          <label>Password</label>
          <input type="password" placeholder="Password" />

          <label>Confirm Password</label>
          <input type="password" placeholder="Confirm password" />

          <input type="submit" value="Sign Up" />
        </form>

        <p>
          By clicking the Sign Up button, you agree to our <br />
          <a href="#">Terms and Conditions</a> and <a href="#">Privacy Policy</a>
        </p>
      </div>
      <p className="para-2">
        Already have an account? <a href="/Login">Login here</a>
      </p>
    </div>
  );
};

export default Signup;
