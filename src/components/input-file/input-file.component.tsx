import { useFormikContext } from "formik";
import { ChangeEvent, FunctionComponent } from "react";
import styles from "./input-file.module.css";

interface InputFileComponentProps {
  name: string;
  label: string;
  errors?: any;
  key?: string;
}

export const InputFileComponent: FunctionComponent<InputFileComponentProps> = ({
  label,
  name,
  errors,
  key,
}) => {
  const { setFieldValue } = useFormikContext();

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files.item(0);
      setFieldValue(name, file);
    }
  };

  return (
    <div>
      <div>
        {label}
        {errors && <span className={styles.labelError}>: {errors}</span>}
      </div>
      <input
        key={key}
        type="file"
        className={styles.inputFile}
        onChange={handleFile}
      />
    </div>
  );
};
