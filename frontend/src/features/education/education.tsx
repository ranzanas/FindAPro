import { useEffect, useState } from "react";
import axiosInstance from "../../shared/config/axiosinstance";
import "./education.css";
import { Link, useNavigate } from "react-router-dom";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";

interface IEducation {
  _id: string;
  schoolName: string;
  startDate: string;
  endDate?: string;
  degreeName: string;
  schoolLocation: string;
}

interface EducationProps {
  userId: string;
  canEdit?: boolean;
}

export default function Education({ userId, canEdit = false }: EducationProps) {
  const [educationList, setEducationList] = useState<IEducation[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance
      .get(`profile/education/${userId}`)
      .then((res) => {
        setEducationList(res.data.educations || []);
      })
      .catch((err) => console.error("Error fetching education:", err))
      .finally(() => setLoading(false));
  }, [userId]);

  const handleDelete = async (eduId: string) => {
    const ok = window.confirm("Delete this education?");
    if (!ok) return;
    try {
      await axiosInstance.delete(`/profile/education/${eduId}`);
      setEducationList((prev) => prev.filter((e) => e._id !== eduId));
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Could not delete. Please try again.");
    }
  };

  const handleEdit = (eduId: string) => {
    navigate(`/edit-education/${eduId}`);
  };

  return (
    <div className="education-card">
      <div className="education-header">
        <h1>Education</h1>
        {canEdit && (
          <Link to="/add-education">
            <button className="addedu-btn">Add Education</button>
          </Link>
        )}
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : educationList.length > 0 ? (
        <div className="educard-container">
          {educationList.map((edu) => (
            <div className="edu-card" key={edu._id}>
              <div className="educard-top">
                <h3 className="edu-title">{edu.schoolName}</h3>

                {canEdit && (
                  <div className="edu-actions">
                    <button
                      className="icon-btn"
                      title="Edit"
                      onClick={() => handleEdit(edu._id)}
                    >
                      <FaPencilAlt />
                    </button>
                    <button
                      className="icon-btn danger"
                      title="Delete"
                      onClick={() => handleDelete(edu._id)}
                    >
                      <FaTrashAlt />
                    </button>
                  </div>
                )}
              </div>
              <div className="educards-info">
                <p>
                  {new Date(edu.startDate).getFullYear()} -{" "}
                  {edu.endDate
                    ? new Date(edu.endDate).getFullYear()
                    : "Present"}
                </p>
                <p>{edu.degreeName}</p>
                <p>{edu.schoolLocation}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <h2>No education added yet</h2>
      )}
    </div>
  );
}
