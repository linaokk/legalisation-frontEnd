import { Field } from "formik";
import { FunctionComponent } from "react";
import styles from "./select.module.css";

export interface SelectValue {
  value?: string;
  label: string;
}

interface SelectComponentProps {
  label: string;
  name: string;
  errors: string | undefined;
  touched: boolean | undefined;
  values: SelectValue[];
}

const getLabelError = (
  errors: string | undefined,
  touched: boolean | undefined
) => {
  if (!errors || !touched) return null;
  return <label className={styles.labelError}>{errors}</label>;
};

export const SelectComponent: FunctionComponent<SelectComponentProps> = ({
  name,
  errors,
  label,
  touched,
  values,
}) => {
  return (
    <div className={styles.selectElement}>
      <label>
        {label} : {getLabelError(errors, touched)}
      </label>

      <Field as="select" name={name} className="text">
        {values.map((value) => (
          <option value={value.value}>{value.label}</option>
        ))}
      </Field>
    </div>
  );
};
