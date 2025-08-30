import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
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

interface IExperience {
  _id: string;
  jobTitle: string;
  startDate?: string;
  endDate?: string;
  companyName: string;
  companyAddress: string;
  employmentType: string;
}

export default function EditExperienceForm() {
  const { expId } = useParams();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<IExperienceForm>();

  useEffect(() => {
    if (!expId) return;

    axiosInstance
      .get(`/profile/listExperience`)
      .then((res) => {
        const list: IExperience[] = res.data?.experiences ?? [];
        const exp = list.find((e) => e._id === expId);

        if (!exp) {
          console.error("Experience not found for id:", expId);
          return;
        }

        reset({
          jobTitle: exp.jobTitle || "",
          startDate: exp.startDate,
          endDate: exp.endDate,
          companyName: exp.companyName || "",
          companyAddress: exp.companyAddress || "",
          employmentType: exp.employmentType || "Full-Time",
        });
      })
      .catch((err) => console.error("Error loading experiences:", err));
  }, [expId, reset]);

  const onSubmit = async (data: IExperienceForm) => {
    try {
      await axiosInstance.patch(`/profile/experience/${expId}`, data);
      navigate(-1);
    } catch (err) {
      console.error("Error updating experience:", err);
    }
  };

  return (
    <div className="experience-form-container">
      <h1>Edit Experience</h1>
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
