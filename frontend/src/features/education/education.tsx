import { useEffect, useState } from "react";
import axiosInstance from "../../shared/config/axiosinstance";
import "./education.css";
import { Link } from "react-router-dom";

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

  useEffect(() => {
    axiosInstance
      .get(`profile/education/${userId}`)
      .then((res) => {
        setEducationList(res.data.educations || []);
      })
      .catch((err) => console.error("Error fetching education:", err))
      .finally(() => setLoading(false));
  }, [userId]);

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
              <div className="educards-info">
                <h3>{edu.schoolName}</h3>
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
