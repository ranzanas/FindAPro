import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./profilePage.css";
import userFemale from "../../assets/images/userFemale.jpg";
import Experience from "../experience/experience";
import Education from "../education/education";
import axiosInstance from "../../shared/config/axiosinstance";

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

  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");

  useEffect(() => {
    axiosInstance
      .get(`/user/userList?name=${id}`)
      .then((res) => {
        setUser(res.data.users[0]);
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
            <h1>
              {user.firstName} {user.lastName}
            </h1>
          </div>
          <div className="profession-section">
            <span className="profession">{user.profession}</span>
            <span className="username">@{user.username}</span>
          </div>
          <div className="address-section">
            <span className="address">{user.address}</span>
          </div>

          <div className="actions">
            {currentUser?._id === user._id ? (
              <button className="edit-btn">Edit Profile</button>
            ) : (
              <div className="actions">
                <button className="msg-btn">Message</button>
                <button className="follow-btn">Follow</button>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="main-section">
        <div className="exp-wrapper">
          <div className="experience-section">
            <Experience
              userId={user._id}
              canEdit={currentUser?._id === user._id}
            />
          </div>

          <div className="contact-section">
            <div className="contact-header">
              <h1>Contact</h1>
            </div>
            <div className="contact-info">
              <ul>
                <li>{user.email}</li>
                <li>{user.phone}</li>
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
