import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./profilePage.css";
import userFemale from "../../assets/images/userFemale.jpg";

interface IUser {
  _id: string;
  firstName: string;
  lastName: string;
  email?: string;
  profession?: string;
  address?: string;
  phone: string;
  username: string;
}

export default function Profile() {
  const { id } = useParams();
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch(`http://localhost:3000/api/user/userList?name=${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.users.length > 0) {
          setUser(data.users[0]);
        } else {
          console.warn("No user found with this ID");
        }
      })
      .catch((err) => console.error("Error fetching user:", err));
  }, [id]);

  if (!user) return <p>No user found</p>;

  return (
    <div className="profile-container">
      <div className="basicInfo">
        <div className="personalInfo">
          <div className="imageSection">
            <img src={userFemale} alt="" />
          </div>
          <div className="detailsSection">
            <h1>Ranjana Silwal</h1>
            <p>FullStack Developer</p>
            <p>Kamalpokhari, Kathmandu</p>
          </div>
        </div>
        <div className="contactInfo">
          <h1>Contact Information</h1>

          <p>ranjanasilwal4@gmail.com</p>

          <p>9842557384</p>
        </div>
      </div>
      <div className="experienceSection">
        <h1>Experience</h1>
      </div>
    </div>
  );
}
