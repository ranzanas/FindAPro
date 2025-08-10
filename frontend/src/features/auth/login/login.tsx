import { useState, type FormEvent, type ChangeEvent } from "react";
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
      <div className="header">FindAPro</div>
      <div className="loginBox">
        <h1>Login</h1>
        <form action="" className="loginForm" onSubmit={handleSubmit}>
          <div className="inputPart">
            <div className="detailSection">
              <span>Username:</span>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
              />
            </div>
            <div className="detailSection">
              <span>Password:</span>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="buttonPart">
            <button type="submit">Log in</button>
          </div>
          <br />
          <p>
            Don't have an account?
            <Link className="login-link" to="/register">
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
