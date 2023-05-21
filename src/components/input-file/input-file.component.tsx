import { Field } from "formik";
import { FunctionComponent } from "react";

interface InputFileComponentProps {}

export const InputFileComponent: FunctionComponent<
  InputFileComponentProps
> = () => {
  return (
    <>
      <Field type="text"></Field>
    </>
  );
};
