import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../shared/config/axiosinstance";
import "./experienceForm.css";

interface IExperienceForm {
  jobTitle: string;
  startDate: string;
  endDate?: string;
  companyName: string;
  companyAddress: string;
  employmentType: string;
}

export default function ExperienceForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<IExperienceForm>();

  const navigate = useNavigate();

  const onSubmit = async (data: IExperienceForm) => {
    try {
      await axiosInstance.post("/profile/addExperience", data);
      reset();
      navigate(-1);
    } catch (err) {
      console.error("Error adding experience:", err);
    }
  };

  return (
    <div className="experience-form-container">
      <h1>Add Experience</h1>
      <form className="experience-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="inputField">
          <p>Job Title:</p>
          <input
            type="text"
            {...register("jobTitle", { required: "Job title is required" })}
          />
          {errors.jobTitle && <span>{errors.jobTitle.message}</span>}
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
          <p>Company Name:</p>
          <input
            type="text"
            {...register("companyName", {
              required: "Company name is required",
            })}
          />
          {errors.companyName && <span>{errors.companyName.message}</span>}
        </div>

        <div className="inputField">
          <p>Company Address:</p>
          <input
            type="text"
            {...register("companyAddress", { required: "Address is required" })}
          />
          {errors.companyAddress && (
            <span>{errors.companyAddress.message}</span>
          )}
        </div>

        <div className="inputField">
          <p>Employment Type:</p>
          <select
            {...register("employmentType", {
              required: "Employment type is required",
            })}
          >
            <option value="">Select</option>
            <option value="Full-Time">Full-Time</option>
            <option value="Part-Time">Part-Time</option>
            <option value="Internship">Internship</option>
            <option value="Freelance">Freelance</option>
          </select>
          {errors.employmentType && (
            <span>{errors.employmentType.message}</span>
          )}
        </div>

        <div className="buttonBox">
          <button type="submit" disabled={isSubmitting}>
            Add Experience
          </button>
        </div>
      </form>
    </div>
  );
}
