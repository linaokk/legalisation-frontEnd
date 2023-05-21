import { FunctionComponent } from "react";
import { NavbarComponent } from "../../components/navbar/navbar.component";

import {
  SelectComponent,
  SelectValue,
} from "../../components/select/select.component";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import styles from "./add-request.module.css";
import { InputComponent } from "../../components/input/input.component";
import { InputFileComponent } from "../../components/input-file/input-file.component";

interface FormProps {
  description: string;
  document: any;
  documentType: string;
}

const documentTypes: SelectValue[] = [
  { label: "" },
  { label: "Immatriculation CNSS", value: "IMMATRICULATION_CNSS" },
  { label: "Attestation", value: "ATTESTATION" },
  { label: "Aval", value: "AVAL" },
  {
    label: "Certificat de preuve d'identite",
    value: "CERTIFICAT_DE_PREUVE_DIDENTITE",
  },
  { label: "Certificat d'engagement", value: "CERTIFICAT_DENGAGEMENT" },
];

const initialFormValues: FormProps = {
  description: "Je suis une description",
  document: "c:/",
  documentType: "IMMATRICULATION_CNSS",
};

const signupSchema = Yup.object().shape({
  description: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  document: Yup.string().required(),
  documentType: Yup.string().min(2, "Too Short!").required(),
});

const onSubmithandler = () => {
  console.info(">CouCOu");
};
export const AddRequestComponent: FunctionComponent = () => {
  return (
    <>
      <NavbarComponent />
      <div className="container">
        <Formik
          initialValues={initialFormValues}
          onSubmit={onSubmithandler}
          validationSchema={signupSchema}
        >
          {({ errors, touched }) => (
            <Form>
              <div className={styles.addRequestContainer}>
                <SelectComponent
                  key="select-document-type"
                  errors={errors.documentType}
                  label="Document Type"
                  name="documentType"
                  values={documentTypes}
                  touched={touched.documentType}
                />

                <InputComponent
                  key="input-document-description"
                  errors={errors.description}
                  label="Description"
                  name="description"
                  touched={touched.description}
                  type="text"
                />

                <InputFileComponent />
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};
