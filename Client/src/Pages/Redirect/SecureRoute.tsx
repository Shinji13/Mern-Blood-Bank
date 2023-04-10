import Intial from "../../intial";
import { sessionInfo } from "../../utils/valtioStore";
import Doctor from "../DoctorDashBoard/Doctor";
import Donor from "../DonorDashBoard/Donor";
import Manager from "../ManagerDashBoard/Manager";

export default function SecureRoute({
  children,
  dashBoardName,
}: {
  children: JSX.Element;
  dashBoardName: string;
}) {
  if (sessionInfo.accessToken === "") return <Intial />;
  if (dashBoardName === sessionInfo.userType) return children;
  else {
    if (sessionInfo.userType === "manager") return <Manager />;
    if (sessionInfo.userType === "doctor") return <Doctor />;
    else return <Donor />;
  }
}
