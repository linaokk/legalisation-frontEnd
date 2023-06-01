import { FunctionComponent, useRef, createRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./login.style.css";
import Webcam from "react-webcam";
import { useAuthentication } from "../../hooks/authentication.hook";
import { ROUTES } from "../../constants/root.constant";
import { handleAxiosError } from "../../services/axios.service";
import { API_LOGIN } from "../../constants/api.constant";

export const LoginComponent: FunctionComponent = () => {
  const navigate = useNavigate();
  const webCamRef = useRef<Webcam>(null);
  const passwordRef = createRef<HTMLInputElement>();
  const usernameRef = createRef<HTMLInputElement>();
  const { setToken } = useAuthentication();

  const loginHandler = () => {
    const camera = webCamRef.current;
    if (!camera) {
      return;
    }
    const screenShot = camera.getScreenshot() as string;

    const username = usernameRef.current?.value || "";
    const password = passwordRef.current?.value || "";
    const loginRequest = { login: username, password, userPicture: screenShot };

    axios
      .post(API_LOGIN, loginRequest)
      .then((res) => {
        setToken(res.data.token);
        navigate(ROUTES.DASHBOARD);
      })
      .catch(handleAxiosError);
  };
  return (
    <div className="login-container">
      <div className="login-inputs">
        <input type="text" required ref={usernameRef} placeholder="Username" />
        <input
          type="password"
          required
          ref={passwordRef}
          placeholder="Password"
        />
      </div>

      <Webcam
        audio={false}
        screenshotFormat="image/png"
        ref={webCamRef}
      ></Webcam>

      <div className="login-actions">
        <button onClick={loginHandler} type="submit">
          login
        </button>
        <button
          onClick={() => {
            if (!passwordRef.current || !usernameRef.current) return;
            usernameRef.current.value = "admin";
            passwordRef.current.value = "admin";
          }}
        >
          Set Admin
        </button>
        <button
          onClick={() => {
            if (!passwordRef.current || !usernameRef.current) return;
            usernameRef.current.value = "AE180899";
            passwordRef.current.value = "JeSuisUnMoTpAsSe";
          }}
        >
          Set AE180899
        </button>
      </div>
    </div>
  );
};
