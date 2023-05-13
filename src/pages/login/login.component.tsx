import { FunctionComponent, useRef, createRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./login.style.css";
import Webcam from "react-webcam";
import { create } from "domain";
export const LoginComponent: FunctionComponent = () => {
  const navigate = useNavigate();
  const webCamRef = useRef<Webcam>(null);
  const passwordRef = createRef<HTMLInputElement>();
  const usernameRef = createRef<HTMLInputElement>();

  console.log(process.env);

  const loginHandler = () => {
    const camera = webCamRef.current;
    if (!camera) {
      return;
    }
    const screenShot = camera.getScreenshot() as string;
   
    const username = usernameRef.current?.value || "";
    const password = passwordRef.current?.value || "";
    const loginRequest = { numIdentite:username, password, screenShot };
     console.log(loginRequest);
     axios
        .post(process.env.REACT_APP_WS_HOST+"/login",{data:loginRequest})


        
     
  };
  return (
    <>
      {" "}
      <div className="center">
        <input type="checkbox" id="show" />
        <label className="show-btn">View Form</label>
        <div className="container">
          <label className="close-btn fas fa-times" title="close"></label>
          <div className="text">Login Form</div>
          <form action="#">
            <div className="data">
              <label>Email or Phone</label>
              <input type="text" required ref={usernameRef} />
            </div>
            <div className="data">
              <label>Password</label>
              <input type="password" required ref={passwordRef} />
            </div>
            <Webcam
              audio={false}
              screenshotFormat="image/png"
              ref={webCamRef}
              videoConstraints={{ width: 80, height: 80 }}
            ></Webcam>
            <div className="forgot-pass">
              <a href="#">Forgot Password?</a>
            </div>

            <div className="btn">
              <div className="inner"></div>
              <button onClick={loginHandler} type="submit">
                login
              </button>
            </div>
            <div className="signup-link">
              Not a member? <a href="#">Signup now</a>
            </div>
          </form>
        </div>
      </div>{" "}
    </>
  );
};
