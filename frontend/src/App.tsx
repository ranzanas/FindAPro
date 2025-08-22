import { Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./features/auth/login/login";
import Register from "./features/auth/register/register";
import Home from "./features/home/homepage";
import LoginGuard from "./shared/guards/loginGuard";
import AuthGuard from "./shared/guards/authGuard";
import Profile from "./features/profile/profilePage";
import ExperienceForm from "./features/experience/experienceForm";
import EducationForm from "./features/education/educationForm";
import EditProfileForm from "./features/profile/editProfileForm";

function App() {
  return (
    <Routes>
      <Route
        path="/login"
        element={
          <LoginGuard>
            <Login />
          </LoginGuard>
        }
      />

      <Route
        path="/register"
        element={
          <LoginGuard>
            <Register />
          </LoginGuard>
        }
      />
      <Route
        path="/home"
        element={
          <AuthGuard>
            <Home />
          </AuthGuard>
        }
      />
      <Route
        path="/"
        element={
          <LoginGuard>
            <Login />
          </LoginGuard>
        }
      />
      <Route
        path="/profile/:id"
        element={
          <AuthGuard>
            <Profile />
          </AuthGuard>
        }
      />

      <Route path="/add-experience" element={<ExperienceForm />} />
      <Route path="/add-education" element={<EducationForm />} />

      <Route path="/edit-profile/:id" element={<EditProfileForm />} />
    </Routes>
  );
}

export default App;
