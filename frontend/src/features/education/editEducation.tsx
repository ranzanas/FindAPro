import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../shared/config/axiosinstance";
import "./educationForm.css";

interface IEducationForm {
  schoolName: string;
  startDate: string;
  endDate?: string;
  degreeName: string;
  schoolLocation: string;
}

interface IEducation {
  _id: string;
  schoolName: string;
  startDate?: string;
  endDate?: string;
  degreeName: string;
  schoolLocation: string;
}

export default function EditEducationForm() {
  const { eduId } = useParams();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<IEducationForm>();

  useEffect(() => {
    if (!eduId) return;

    axiosInstance
      .get(`/profile/listEducation`)
      .then((res) => {
        const list: IEducation[] = res.data?.educations ?? [];
        const edu = list.find((e) => e._id === eduId);

        if (!edu) {
          console.error("Education not found for id:", eduId);
          return;
        }

        reset({
          schoolName: edu.schoolName || "",
          startDate: edu.startDate,
          endDate: edu.endDate,
          degreeName: edu.degreeName || "",
          schoolLocation: edu.schoolLocation || "",
        });
      })
      .catch((err) => console.error("Error loading educations:", err));
  }, [eduId, reset]);

  const onSubmit = async (data: IEducationForm) => {
    try {
      await axiosInstance.patch(`/profile/education/${eduId}`, data);
      navigate(-1);
    } catch (err) {
      console.error("Error updating education:", err);
    }
  };

  return (
    <div className="education-form-container">
      <h1>Edit Education</h1>
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
          <p>Degree Name:</p>
          <input
            type="text"
            {...register("degreeName", { required: "Degree name is required" })}
          />
          {errors.degreeName && <span>{errors.degreeName.message}</span>}
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
