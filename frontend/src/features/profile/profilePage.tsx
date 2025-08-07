import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./profilePage.css";

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
  const { id } = useParams(); // Get user id from URL
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
      <h2>
        {user.firstName} {user.lastName}
      </h2>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
      <p>
        <strong>Username:</strong> {user.username}
      </p>
      <p>
        <strong>Profession:</strong> {user.profession ?? "Not listed"}
      </p>
      <p>
        <strong>Address:</strong> {user.address ?? "Not available"}
      </p>
      <p>
        <strong>Phone:</strong> {user.phone ?? "Not available"}
      </p>
    </div>
  );
}
