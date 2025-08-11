import { useNavigate } from "react-router-dom";
import styles from "./navigation.module.css";

export default function Navigation() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("currentUser");
    navigate("/login");
  };
  return (
    <div>
      <nav className={styles.navbar}>
        <div className={styles.logo}>FindAPro</div>
        <div className={styles.navlist}>
          <ul>
            <li>Home</li>
            <li>About</li>
            <li>Blog</li>
            <li>Contact Us</li>
          </ul>
          <button className={styles.logoutBtn} onClick={handleLogout}>
            Logout
          </button>
        </div>
      </nav>
    </div>
  );
}
