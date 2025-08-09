import { Link, useNavigate } from "react-router-dom";
import "./register.css";
import { useState, type ChangeEvent, type FormEvent } from "react";
import { registerApi } from "../../../shared/config/api";

export default function Register() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    address: "",
    phone: "",
    email: "",
    profession: "",
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Registration Data:", formData);
    if (loading) return;

    setLoading(true);

    registerApi(formData)
      .then(() => navigate("/login"))
      .finally(() => setLoading(false));
  };
  return (
    <div>
      <div className="header">FindAPro</div>
      <div className="registrationBox">
        <h1>Sign Up to Find A Pro Who Can!</h1>
        <form className="registerForm" onSubmit={handleSubmit}>
          <div className="inputSection">
            <div className="leftBox">
              <div className="inputField">
                <p>First Name:</p>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </div>
              <div className="inputField">
                <p>Phone:</p>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
              <div className="inputField">
                <p>Profession:</p>
                <input
                  type="text"
                  name="profession"
                  value={formData.profession}
                  onChange={handleChange}
                />
              </div>
              <div className="inputField">
                <p>Username:</p>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="rightBox">
              <div className="inputField">
                <p>Last Name:</p>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>
              <div className="inputField">
                <p>Address:</p>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                />
              </div>
              <div className="inputField">
                <p>Email:</p>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="inputField">
                <p>Password:</p>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <div className="buttonBox">
            <button type="submit">Create Account</button>
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
