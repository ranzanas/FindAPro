import "./education.css";

export default function Education() {
  const education = [
    {
      schoolName: "Islington College",
      startDate: "2023",
      endDate: "2026",
      degreeName: "BSc (Hons) Computing",
      address: "Kamalpokhari, Kathmandu",
    },
    {
      schoolName: "National School of Sciences (NIST)",
      startDate: "2020",
      endDate: "2022",
      degreeName: "High School",
      address: "Lainchaour, Kathmandu",
    },
    {
      schoolName: "Fluorescent Secondary School",
      startDate: "2013",
      endDate: "2020",
      degreeName: "Secondary Education",
      address: "Baniyatar, Kathmandu",
    },
  ];
  return (
    <div className="education-card">
      <div className="education-header">
        <h1>Education</h1>
        <button className="addedu-btn">Add Education</button>
      </div>
      <div className="educard-container">
        {education.map((edu) => (
          <div className="edu-card">
            <div className="educards-info">
              <h3>{edu.schoolName}</h3>
              <p>
                {edu.startDate} - {edu.endDate}
              </p>
              <p>{edu.degreeName}</p>
              <p>{edu.address}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
