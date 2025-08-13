import "./experience.css";

export default function Experience() {
  const experience = [
    {
      title: "Frontend Developer",
      workingDate: "2020-2021",
      companyName: "Leapfrog Technology",
      companyAddress: "Putalisadak, Kathmandy",
      employementType: "Full-Time",
    },
    {
      title: "Backend Developer",
      workingDate: "2021-2022",
      companyName: "Yeti Solutions",
      companyAddress: "Baneshwor, Kathmandu",
      employementType: "Remote Job",
    },

    {
      title: "Fullstack Developer",
      workingDate: "2022-Present",
      companyName: "Amil Technology",
      companyAddress: "Kamalpokhari, Kathmandu",
      employementType: "Full-Time",
    },
  ];
  return (
    <div className="experience-card">
      <div className="experience-header">
        <h1>Experience</h1>
        <button className="addexp-btn">Add Experience</button>
      </div>
      <div className="expcard-container">
        {experience.map((exp) => (
          <div className="exp-card">
            <div className="cards-info">
              <h3>{exp.title}</h3>
              <p>{exp.workingDate}</p>
              <p>{exp.companyName}</p>
              <p>{exp.companyAddress}</p>
              <p>{exp.employementType}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
