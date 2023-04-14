import { sessionInfo } from "../../utils/valtioStore";
import { Navigate } from "react-router-dom";

export default function SecureRoute({
  children,
  dashBoardName,
}: {
  children: JSX.Element;
  dashBoardName: string;
}) {
  if (sessionInfo.accessToken === "") return <Navigate to="/" />;
  if (dashBoardName === sessionInfo.userType) return children;
  else {
    if (sessionInfo.userType === "manager") return <Navigate to="/manager" />;
    if (sessionInfo.userType === "doctor") return <Navigate to="/doctor" />;
    else return <Navigate to="/donor" />;
  }
}
