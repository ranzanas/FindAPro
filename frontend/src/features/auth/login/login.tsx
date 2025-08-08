import { useState, type FormEvent, type ChangeEvent } from "react";
import loginPhoto from "../../../assets/images/loginPhoto.jpg";

import { Link, useNavigate } from "react-router-dom";
import "./login.css";
import type { AxiosResponse } from "axios";
import { loginApi } from "../../../shared/config/api";

function Login() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) {
      return;
    }
    setLoading(true);
    loginApi(formData)
      .then((res: AxiosResponse) => {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("currentUser", JSON.stringify(res.data.user));
        navigate("/home");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="login-wrapper">
      <div className="login-box">
        <div className="image-section">
          <img src={loginPhoto} alt="Login" />
        </div>

        <div className="form-section">
          <form onSubmit={handleSubmit} className="login-form" action="">
            <h2>Login</h2>
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
              type="text"
              placeholder="Password"
            />
            <button>Submit</button>
            <p>
              Don't have an account?
              <Link className="register-link" to="/register">
                Register
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
