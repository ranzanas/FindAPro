import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./profilePage.css";
import userFemale from "../../assets/images/userFemale.jpg";
import Experience from "../experience/experience";
import Education from "../education/education";

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
      <div className="profile-banner">
        <div className="image-section">
          <img src={userFemale} alt="" />
        </div>
        <div className="details-section">
          <div className="name-section">
            <h1>Ranjana Silwal</h1>
          </div>
          <div className="profession-section">
            <span className="profession">Fullstack Web Developer</span>
            <span className="username">@ranjana01</span>
          </div>
          <div className="address-section">
            <span className="address">Kathmandu</span>
          </div>
          <div className="actions">
            <button className="msg-btn">Message</button>
            <button className="follow-btn">Follow</button>
          </div>
        </div>
      </div>
      <div className="main-section">
        <div className="exp-wrapper">
          <div className="experience-section">
            <Experience />
          </div>
          <div className="contact-section">
            <div className="contact-header">
              <h1>Contact</h1>
            </div>
            <div className="contact-info">
              <ul>
                <li>ranjanasilwal4@gmail.com</li>
                <li>9842557384</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="education-section">
          <Education />
        </div>
      </div>
    </div>
  );
}
