import { FunctionComponent, useRef, useState } from "react";
import Webcam from "react-webcam";
import styles from "./camera.module.css";
import { useFormikContext } from "formik";

interface CameraComponentProps {
  width: number;
  height: number;
  label: string;
  name: string;
  errors?: string;
}

export const CameraComponent: FunctionComponent<CameraComponentProps> = ({
  height,
  width,
  label,
  errors,
  name,
}) => {
  const webCamRef = useRef<Webcam>(null);
  const [screenShot, setScreenShot] = useState<string | null>();
  const { setFieldValue } = useFormikContext();

  const handleCapture = () => {
    const camera = webCamRef.current;
    if (!camera) {
      return;
    }

    const capture = camera.getScreenshot();

    setScreenShot(capture);
    setFieldValue(name, capture);
  };

  const handleRecapture = () => {
    setScreenShot(null);
    setFieldValue(name, undefined);
  };

  return (
    <div className={styles.cameraWowo}>
      <div>
        {label}
        {errors && <span className={styles.errorMessage}>: {errors}</span>}
      </div>
      {!screenShot && (
        <Webcam
          audio={false}
          width={width}
          height={height}
          screenshotFormat="image/png"
          ref={webCamRef}
        />
      )}
      {screenShot && <img src={screenShot} alt="user camerashot"></img>}
      {!screenShot && (
        <button type="button" onClick={handleCapture}>
          Capture
        </button>
      )}
      {screenShot && (
        <button type="button" onClick={handleRecapture}>
          Recapture
        </button>
      )}
    </div>
  );
};
