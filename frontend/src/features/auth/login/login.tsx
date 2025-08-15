//import { useState, type FormEvent, type ChangeEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import "./login.css";
import type { AxiosResponse } from "axios";
import { loginApi } from "../../../shared/config/api";
//import Register from "../register/register";

interface ILoginForm {
  username: string;
  password: string;
}

function Login() {
  //destructuring
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ILoginForm>();
  const navigate = useNavigate();

  const onSubmit = async (data: ILoginForm) => {
    await loginApi(data)
      .then((res: AxiosResponse) => {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("currentUser", JSON.stringify(res.data.user));
        navigate("/home");
      })
      .finally(() => {
        reset();
      });
  };

  return (
    <div className="login-wrapper">
      <div className="header">FindAPro</div>
      <div className="loginBox">
        <h1>Login</h1>
        <form action="" className="loginForm" onSubmit={handleSubmit(onSubmit)}>
          <div className="inputPart">
            <div className="detailSection">
              <span>Username:</span>
              <input
                type="text"
                {...register("username", {
                  required: "Username is required",
                  maxLength: {
                    value: 10,
                    message: "Username should be less than 10",
                  },
                  minLength: {
                    value: 3,
                    message: "Username should be more than 3 characters",
                  },
                })}
              />{" "}
              {errors.username && (
                <div className="text-red">
                  {errors.username.message?.toString()}
                </div>
              )}
            </div>
            <div className="detailSection">
              <span>Password:</span>
              <input
                type="password"
                {...register("password", {
                  required: "Password is required",
                })}
              />
              {errors.password && (
                <div className="text-red">
                  {errors.password.message?.toString()}
                </div>
              )}
            </div>
          </div>

          <div className="buttonPart">
            <button type="submit" disabled={isSubmitting}>
              Log in
            </button>
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
