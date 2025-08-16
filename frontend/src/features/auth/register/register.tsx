import { Link, useNavigate } from "react-router-dom";
import "./register.css";
import { registerApi } from "../../../shared/config/api";
import { useForm } from "react-hook-form";

interface IRegisterForm {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  address: string;
  profession: string;
  username: string;
  password: string;
}

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<IRegisterForm>();

  const navigate = useNavigate();

  const onSubmit = async (data: IRegisterForm) => {
    await registerApi(data)
      .then(() => navigate("/login"))
      .finally(() => {
        reset();
      });
  };
  return (
    <div>
      <div className="header">FindAPro</div>
      <div className="registrationBox">
        <h1>Sign Up to Find A Pro Who Can!</h1>
        <form className="registerForm" onSubmit={handleSubmit(onSubmit)}>
          <div className="inputSection">
            <div className="leftBox">
              <div className="inputField">
                <p>First Name:</p>

                <input
                  type="text"
                  {...register("firstName", {
                    required: "Please don't leave this field empty",
                    minLength: {
                      value: 3,
                      message: "Username must be more than 3 characters long",
                    },
                  })}
                />
              </div>
              {errors.firstName && (
                <div className="text-red">
                  {errors.firstName.message?.toString()}
                </div>
              )}

              <div className="inputField">
                <p>Phone:</p>
                <input
                  type="tel"
                  {...register("phone", {
                    required: "Phone number is mandatory",
                    minLength: {
                      value: 10,
                      message: "Phone number should be 10 characters long",
                    },
                    maxLength: {
                      value: 10,
                      message: "Phone number should be 10 characters long",
                    },
                    pattern: {
                      value: /^\d{10}$/,
                      message: "Only digits allowed (0-9)",
                    },
                  })}
                />
              </div>
              {errors.phone && (
                <div className="text-red">
                  {errors.phone.message?.toString()}
                </div>
              )}

              <div className="inputField">
                <p>Profession:</p>
                <input
                  type="text"
                  {...register("profession", {
                    required: "Profession is required",
                    minLength: {
                      value: 3,
                      message: "Please enter valid profession",
                    },
                    maxLength: {
                      value: 45,
                      message: "Please enter valid profession",
                    },
                  })}
                />
              </div>

              {errors.profession && (
                <div className="text-red">
                  {errors.profession.message?.toString()}
                </div>
              )}

              <div className="inputField">
                <p>Username:</p>
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
                />
              </div>

              {errors.username && (
                <div className="text-red">
                  {errors.username.message?.toString()}
                </div>
              )}
            </div>

            <div className="rightBox">
              <div className="inputField">
                <p>Last Name:</p>
                <input
                  type="text"
                  {...register("lastName", {
                    required: "Please do not leave this field empty",
                  })}
                />
              </div>

              {errors.lastName && (
                <div className="text-red">
                  {errors.lastName.message?.toString()}
                </div>
              )}

              <div className="inputField">
                <p>Address:</p>
                <input
                  type="text"
                  {...register("address", {
                    required: "Address is required",
                  })}
                />
              </div>

              {errors.address && (
                <div className="text-red">
                  {errors.address.message?.toString()}
                </div>
              )}

              <div className="inputField">
                <p>Email:</p>
                <input
                  type="email"
                  {...register("email", {
                    required: "Email is required",
                  })}
                />
              </div>
              {errors.email && (
                <div className="text-red">
                  {errors.email.message?.toString()}
                </div>
              )}

              <div className="inputField">
                <p>Password:</p>
                <input
                  type="password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be 6 characters long",
                    },
                    maxLength: {
                      value: 20,
                      message: "Password must be more than 20 characters long",
                    },
                    pattern: {
                      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,20}$/,
                      message: "Use upper & lower case letters and a number",
                    },
                  })}
                />
              </div>

              {errors.password && (
                <div className="text-red">
                  {errors.password.message?.toString()}
                </div>
              )}
            </div>
          </div>

          <div className="buttonBox">
            <button type="submit" disabled={isSubmitting}>
              Create Account
            </button>
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
