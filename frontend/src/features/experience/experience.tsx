import { useEffect, useState } from "react";
import axiosInstance from "../../shared/config/axiosinstance";
import "./experience.css";
import { Link } from "react-router-dom";

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

  useEffect(() => {
    axiosInstance
      .get(`profile/experience/${userId}`)
      .then((res) => {
        setExperiences(res.data.experiences || []);
      })
      .catch((err) => console.error("Error fetching experiences:", err))
      .finally(() => setLoading(false));
  }, [userId]);

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
              <div className="expcards-info">
                <h3>{exp.jobTitle}</h3>
                <p>
                  {new Date(exp.startDate).getFullYear()} -
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
