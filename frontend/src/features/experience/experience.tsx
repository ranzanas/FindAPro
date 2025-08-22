import { useEffect, useState } from "react";
import axiosInstance from "../../shared/config/axiosinstance";
import "./experience.css";
import { Link, useNavigate } from "react-router-dom";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";

interface IExperience {
  _id: string;
  jobTitle: string;
  startDate: string;
  endDate?: string;
  companyName: string;
  companyAddress: string;
  employmentType: string;
}

interface ExperienceProps {
  userId: string;
  canEdit?: boolean;
}

export default function Experience({
  userId,
  canEdit = false,
}: ExperienceProps) {
  const [experiences, setExperiences] = useState<IExperience[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance
      .get(`/profile/experience/${userId}`)
      .then((res) => {
        setExperiences(res.data.experiences || []);
      })
      .catch((err) => console.error("Error fetching experiences:", err))
      .finally(() => setLoading(false));
  }, [userId]);

  const handleDelete = async (expId: string) => {
    const ok = window.confirm("Delete this experience?");
    if (!ok) return;

    try {
      await axiosInstance.delete(`/profile/experience/${expId}`);
      setExperiences((prev) => prev.filter((e) => e._id !== expId));
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Could not delete. Please try again.");
    }
  };

  const handleEdit = (expId: string) => {
    navigate(`/edit-experience/${expId}`);
  };

  return (
    <div className="experience-card">
      <div className="experience-header">
        <h1>Experience</h1>
        {canEdit && (
          <Link to="/add-experience">
            <button className="addexp-btn">Add Experience</button>
          </Link>
        )}
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : experiences.length > 0 ? (
        <div className="expcard-container">
          {experiences.map((exp) => (
            <div className="exp-card" key={exp._id}>
              {/* Top row: title + icons */}
              <div className="expcard-top">
                <h3 className="exp-title">{exp.jobTitle}</h3>

                {canEdit && (
                  <div className="exp-actions">
                    <button
                      className="icon-btn"
                      title="Edit"
                      onClick={() => handleEdit(exp._id)}
                    >
                      <FaPencilAlt />
                    </button>
                    <button
                      className="icon-btn danger"
                      title="Delete"
                      onClick={() => handleDelete(exp._id)}
                    >
                      <FaTrashAlt />
                    </button>
                  </div>
                )}
              </div>

              <div className="expcards-info">
                <p>
                  {new Date(exp.startDate).getFullYear()} -{" "}
                  {exp.endDate
                    ? new Date(exp.endDate).getFullYear()
                    : "Present"}
                </p>
                <p>{exp.companyName}</p>
                <p>{exp.companyAddress}</p>
                <p>{exp.employmentType}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <h2>No experience added yet</h2>
      )}
    </div>
  );
}
