import { useEffect, useState } from "react";
import "./homepage.css";
import { useNavigate } from "react-router-dom";
import { searchUsersApi } from "../../shared/config/api";
import type { AxiosResponse } from "axios";

interface IUser {
  _id: string;
  firstName: string;
  lastName: string;
  email?: string;
  profession?: string;
  address?: string;
}

interface IUserResponse {
  users: IUser[];
}

export default function Home() {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState<IUser[]>([]);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("currentUser");
    navigate("/login");
  };

  useEffect(() => {
    searchUsersApi(search)
      .then((res: AxiosResponse<IUserResponse>) => {
        setUsers(res.data.users);
      })
      .catch((err) => {
        console.error("Error fetching users:", err);
      });
  }, [search]);

  return (
    <div className="home-container">
      <nav className="navbar">
        <div className="logo">FindAPro</div>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </nav>

      <header className="hero">
        <h1>Find the Perfect Professional</h1>
        <p>
          Discover talented professionals and explore their amazing portfolios
        </p>
        <input
          id="search"
          type="text"
          placeholder="Search professionals..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </header>

      <section className="cards-container">
        <h2>{users.length} Professionals Found</h2>

        <div className="card-container">
          {users.map((user) => (
            <div key={user._id} className="card">
              <div className="card-info">
                <h3>
                  {user.firstName} {user.lastName}
                </h3>
                <p className="profession">
                  {user.profession ?? "Profession not listed"}
                </p>
                <p className="location">{user.address ?? "Location unknown"}</p>
                <button
                  className="view-btn"
                  onClick={() => navigate(`/profile/${user._id}`)}
                >
                  View Profile
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
