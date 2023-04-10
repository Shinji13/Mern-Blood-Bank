import { useRef, useState } from "react";
import { donorSignUpInfo } from "./types";
import { NavigateFunction, useNavigate } from "react-router-dom";

export const useSignUp: () => [
  0 | 1 | 2,
  React.Dispatch<React.SetStateAction<0 | 1 | 2>>,
  donorSignUpInfo,
  401 | 404 | 201,
  React.Dispatch<React.SetStateAction<401 | 404 | 201>>,
  NavigateFunction
] = () => {
  const signUpFields = useRef<donorSignUpInfo>({
    fullName: "",
    nationalId: "",
    email: "",
    address: "",
    password: "",
    tel: "",
    bloodtype: "",
    age: 18,
  });
  const [phase, changePhase] = useState<0 | 1 | 2>(0);
  const [error, setError] = useState<401 | 404 | 201>(201);
  const navegate = useNavigate();
  return [phase, changePhase, signUpFields.current, error, setError, navegate];
};
