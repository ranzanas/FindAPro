import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../shared/config/axiosinstance";
import { updateUserApi } from "../../shared/config/api";
import "./editProfileForm.css";

interface IEditForm {
  firstName: string;
  lastName: string;
  email?: string;
  phone: string;
  address?: string;
  profession?: string;
}

export default function EditProfileForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<IEditForm>();

  useEffect(() => {
    axiosInstance
      .get(`/user/userList?name=${id}`)
      .then((res) => {
        const user = res.data.users[0];
        reset({
          firstName: user.firstName || "",
          lastName: user.lastName || "",
          email: user.email || "",
          phone: user.phone || "",
          address: user.address || "",
          profession: user.profession || "",
        });
      })
      .catch((err) => console.error("Error loading user:", err));
  }, [id, reset]);

  const onSubmit = async (data: IEditForm) => {
    try {
      await updateUserApi(id!, data);

      const current = localStorage.getItem("currentUser");
      if (current) {
        const me = JSON.parse(current);
        if (me?._id === id) {
          const updated = { ...me, ...data };
          localStorage.setItem("currentUser", JSON.stringify(updated));
        }
      }

      navigate(-1);
    } catch (err) {
      console.error("Error updating profile:", err);
    }
  };

  return (
    <div className="editprofile-container">
      <h1>Edit Profile</h1>
      <form className="editprofile-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="inputField">
          <p>First Name:</p>
          <input
            type="text"
            {...register("firstName", { required: "First name is required" })}
          />
          {errors.firstName && <span>{errors.firstName.message}</span>}
        </div>

        <div className="inputField">
          <p>Last Name:</p>
          <input
            type="text"
            {...register("lastName", { required: "Last name is required" })}
          />
          {errors.lastName && <span>{errors.lastName.message}</span>}
        </div>

        <div className="inputField">
          <p>Email:</p>
          <input type="email" {...register("email")} />
        </div>

        <div className="inputField">
          <p>Phone:</p>
          <input
            type="tel"
            {...register("phone", { required: "Phone is required" })}
          />
          {errors.phone && <span>{errors.phone.message}</span>}
        </div>

        <div className="inputField">
          <p>Address:</p>
          <input type="text" {...register("address")} />
        </div>

        <div className="inputField">
          <p>Profession:</p>
          <input type="text" {...register("profession")} />
        </div>

        <div className="editprofile-buttons">
          <button type="submit" disabled={isSubmitting}>
            Save Changes
          </button>
          <button
            type="button"
            className="cancel-btn"
            onClick={() => navigate(-1)}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
