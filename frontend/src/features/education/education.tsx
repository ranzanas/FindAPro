import { useEffect, useState } from "react";
import axiosInstance from "../../shared/config/axiosinstance";
import "./education.css";

interface IEducation {
  _id: string;
  schoolName: string;
  startDate: string;
  endDate?: string;
  degreeName: string;
  schoolLocation: string;
}

interface EducationProps {
  userId: string; // whose education to show
  canEdit?: boolean; // whether to show "Add Education" button
}

export default function Education({ userId, canEdit = false }: EducationProps) {
  const [educationList, setEducationList] = useState<IEducation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosInstance
      .get(`/education/${userId}`) // 👉 adjust route to match your backend
      .then((res) => {
        setEducationList(res.data.education || []);
      })
      .catch((err) => console.error("Error fetching education:", err))
      .finally(() => setLoading(false));
  }, [userId]);

  return (
    <div className="education-card">
      <div className="education-header">
        <h1>Education</h1>
        {canEdit && <button className="addedu-btn">Add Education</button>}
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
