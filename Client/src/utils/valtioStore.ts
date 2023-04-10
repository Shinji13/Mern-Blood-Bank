import { proxy } from "valtio";

interface sessionInfo {
  userId: String;
  userType: "doctor" | "manager" | "donor" | "undefined";
}

export const sessionInfo = proxy<sessionInfo>({
  userId: "",
  userType: "undefined",
});
