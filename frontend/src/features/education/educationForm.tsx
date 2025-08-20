import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../shared/config/axiosinstance";
import "./educationForm.css";

interface IEducationForm {
  schoolName: string;
  startDate: string;
  endDate?: string;
  degreeName: string;
  schoolLocation: string;
}

export default function EducationForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<IEducationForm>();

  const navigate = useNavigate();

  const onSubmit = async (data: IEducationForm) => {
    try {
      await axiosInstance.post("/profile/addEducation", data);
      reset();
      navigate(-1);
    } catch (err) {
      console.error("Error adding education:", err);
    }
  };

  return (
    <div className="education-form-container">
      <h1>Add Education</h1>

      <form className="education-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="inputField">
          <p>School Name:</p>
          <input
            type="text"
            {...register("schoolName", { required: "School name is required" })}
          />
          {errors.schoolName && <span>{errors.schoolName.message}</span>}
        </div>

        <div className="inputField">
          <p>Degree Name:</p>
          <input
            type="text"
            {...register("degreeName", { required: "Degree name is required" })}
          />
          {errors.degreeName && <span>{errors.degreeName.message}</span>}
        </div>

        <div className="inputField">
          <p>Start Date:</p>
          <input
            type="date"
            {...register("startDate", { required: "Start date is required" })}
          />
          {errors.startDate && <span>{errors.startDate.message}</span>}
        </div>

        <div className="inputField">
          <p>End Date:</p>
          <input type="date" {...register("endDate")} />
        </div>

        <div className="inputField">
          <p>School Location:</p>
          <input
            type="text"
            {...register("schoolLocation", {
              required: "School location is required",
            })}
          />
          {errors.schoolLocation && (
            <span>{errors.schoolLocation.message}</span>
          )}
        </div>

        <div className="buttonBox">
          <button type="submit" disabled={isSubmitting}>
            Add Education
          </button>
        </div>
      </form>
    </div>
  );
}
