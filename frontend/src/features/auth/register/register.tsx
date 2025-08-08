import { Link } from "react-router-dom";
import "./register.css";

export default function Register() {
  return (
    <div>
      <div className="header">FindAPro</div>
      <div className="registrationBox">
        <h1>Sign Up to Find A Pro Who Can!</h1>
        <form action="" className="registerForm">
          <div className="inputSection">
            <div className="leftBox">
              <div className="inputField">
                <p>First Name:</p>
                <input type="text" name="" id="" />
              </div>
              <div className="inputField">
                <p>Phone:</p>
                <input type="tel" name="" id="" />
              </div>
              <div className="inputField">
                <p>Profession:</p>
                <input type="text" name="" id="" />
              </div>
              <div className="inputField">
                <p>Username:</p>
                <input type="text" name="" id="" />
              </div>
            </div>
            <div className="rightBox">
              <div className="inputField">
                <p>Last Name:</p>
                <input type="text" name="" id="" />
              </div>
              <div className="inputField">
                <p>Address:</p>
                <input type="text" name="" id="" />
              </div>
              <div className="inputField">
                <p>Email:</p>
                <input type="email" name="" id="" />
              </div>
              <div className="inputField">
                <p>Password:</p>
                <input type="password" name="" id="" />
              </div>
            </div>
          </div>
          <div className="buttonBox">
            <button type="button">Create Account</button>
          </div>
          <br />
          <p>
            Already have an account?
            <Link className="login-link" to="/login">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
