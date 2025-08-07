import { Link, useNavigate } from "react-router-dom";
import registerPhoto from "../../../assets/loginPhoto.jpg";
import "./register.css";
import { useState, type ChangeEvent, type FormEvent } from "react";
import { registerApi } from "../../../shared/config/api";

export default function Register() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    profession: "",
    username: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return;

    console.log("Registration Data:", formData);

    setLoading(true);
    registerApi(formData)
      .then(() => navigate("/login"))
      .finally(() => setLoading(false));
  };

  return (
    <div className="register-wrapper">
      <div className="register-box">
        <div className="image-section">
          <img src={registerPhoto} alt="Register" />
        </div>

        <div className="form-section">
          <form onSubmit={handleSubmit} className="register-form">
            <h2>Register</h2>
            <input
              onChange={handleChange}
              name="firstName"
              value={formData.firstName}
              type="text"
              placeholder="First Name"
            />
            <input
              onChange={handleChange}
              name="lastName"
              value={formData.lastName}
              type="text"
              placeholder="Last Name"
            />
            <input
              onChange={handleChange}
              name="email"
              value={formData.email}
              type="email"
              placeholder="Email"
            />
            <input
              onChange={handleChange}
              name="phone"
              value={formData.phone}
              type="text"
              placeholder="Phone"
            />
            <input
              onChange={handleChange}
              name="address"
              value={formData.address}
              type="text"
              placeholder="Address"
            />
            <input
              onChange={handleChange}
              name="profession"
              value={formData.profession}
              type="text"
              placeholder="Profession"
            />
            <input
              onChange={handleChange}
              name="username"
              value={formData.username}
              type="text"
              placeholder="Username"
            />
            <input
              onChange={handleChange}
              name="password"
              value={formData.password}
              type="password"
              placeholder="Password"
            />
            <button type="submit">Register</button>
            <p>
              Already have an account?
              <Link className="login-link" to="/login">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
