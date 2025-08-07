import { type JSX } from "react";
import { Navigate } from "react-router-dom";

interface RoleGuardProps {
  children: JSX.Element;
  allowedRoles: string[];
}
const RoleGuard = ({ allowedRoles, children }: RoleGuardProps) => {
  const token = JSON.parse(localStorage.getItem("token")!);
  const user = JSON.parse(localStorage.getItem("currentUser")!);

  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }
  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default RoleGuard;
