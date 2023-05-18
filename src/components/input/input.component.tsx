import { Field } from "formik";
import { FunctionComponent } from "react";
import inputStyle from "./input.module.css";

interface InputComponentProps {
  label: string;
  name: string;
  errors: string | undefined;
  touched: boolean | undefined;
  type?: string;
}

const getLabelError = (
  errors: string | undefined,
  touched: boolean | undefined
) => {
  if (!errors || !touched) return null;
  return <label className={inputStyle.labelError}>{errors}</label>;
};

export const InputComponent: FunctionComponent<InputComponentProps> = ({
  label,
  name,
  errors,
  touched,
  type,
}) => {
  return (
    <div className={inputStyle.inputElement}>
      <label>
        {label} : {getLabelError(errors, touched)}
      </label>

      <Field type={type} name={name} className="text" />
    </div>
  );
};
