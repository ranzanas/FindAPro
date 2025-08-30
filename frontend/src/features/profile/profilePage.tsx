import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./profilePage.css";
import userFemale from "../../assets/images/userFemale.jpg";
import Experience from "../experience/experience";
import Education from "../education/education";
import axiosInstance from "../../shared/config/axiosinstance";
import { updateProfilePicApi } from "../../shared/config/api";
import { FaPencilAlt } from "react-icons/fa";

interface IUser {
  _id: string;
  firstName: string;
  lastName: string;
  email?: string;
  profession?: string;
  address?: string;
  phone: string;
  username: string;
  profilePicture?: { url?: string; public_id?: string };
}

export default function Profile() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [user, setUser] = useState<IUser | null>(null);
  const [uploading, setUploading] = useState(false);

  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    axiosInstance
      .get(`/user/userList?name=${id}`)
      .then((res) => setUser(res.data.users[0]))
      .catch((err) => console.error("Error fetching user:", err));
  }, [id]);

  const handlePickPhoto = () => fileInputRef.current?.click();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      const res = await updateProfilePicApi(file);
      const newUrl = res.data?.image?.url;

      if (newUrl) {
        setUser((prev) =>
          prev
            ? {
                ...prev,
                profilePicture: { ...(prev.profilePicture || {}), url: newUrl },
              }
            : prev
        );

        const current = localStorage.getItem("currentUser");
        if (current) {
          const me = JSON.parse(current);
          if (me?._id === user?._id) {
            me.profilePicture = { ...(me.profilePicture || {}), url: newUrl };
            localStorage.setItem("currentUser", JSON.stringify(me));
          }
        }
      }
    } catch (err) {
      console.error("Profile picture upload failed:", err);
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  if (!user) return <p>No user found</p>;

  const imgSrc = user.profilePicture?.url || userFemale;
  return (
    <div className="profile-container">
      <div className="profile-banner">
        <div className="image-section">
          <img src={imgSrc} alt="Profile" />

          {currentUser?._id === user._id && (
            <>
              <button
                type="button"
                className="edit-photo-btn"
                onClick={handlePickPhoto}
                aria-label="Change profile photo"
                title={uploading ? "Uploading..." : "Change profile photo"}
                disabled={uploading}
              >
                <FaPencilAlt />
              </button>

              <input
                ref={fileInputRef}
                className="hidden-file-input"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
              />
            </>
          )}
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
              <button
                className="edit-btn"
                onClick={() => navigate(`/edit-profile/${user._id}`)}
              >
                Edit Profile
              </button>
            ) : (
              <div className="actions"></div>
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
          <Education
            userId={user._id}
            canEdit={currentUser?._id === user._id}
          />
        </div>
      </div>
    </div>
  );
}
