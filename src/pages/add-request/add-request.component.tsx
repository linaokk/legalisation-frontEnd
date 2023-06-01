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
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/root.constant";
import { toast } from "react-toastify";
import { Messages } from "../../constants/messages.constant";
import { CameraComponent } from "../../components/camera/camera.component";

interface FormProps {
  description: string;
  document?: File;
  documentType: string;
  userPicture: string;
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
  document: undefined,
  documentType: "IMMATRICULATION_CNSS",
  userPicture: "",
};

const signupSchema = Yup.object().shape({
  description: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  userPicture: Yup.string()
    .min(100, "Need to add a picture")
    .required("Required"),
  document: Yup.mixed<File>().test(
    "fileNeeded",
    "The file is needed",
    (value) => {
      if (!value) return false;
      return true;
    }
  ),
  documentType: Yup.string().min(2, "Too Short!").required(),
});

export const AddRequestComponent: FunctionComponent = () => {
  const navigate = useNavigate();

  const onSubmithandler = (props: FormProps) => {
    const formData = new FormData();
    Object.entries(props).forEach(([key, value]) => {
      formData.append(key, value);
    });

    axios
      .post("/requests/add", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        toast.success(Messages.REQUEST_CREATED);
        navigate(ROUTES.MY_REQUESTS);
      })
      .catch((err) => {
        toast.error(Messages.REQUEST_ERROR_CREATE);
      });
  };

  return (
    <>
      <NavbarComponent />
      <div className="container">
        <h1
          style={{ textDecoration: "underline", margin: "20px 0px 30px 0px" }}
        >
          Create new request
        </h1>

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

                <InputFileComponent
                  label="Document"
                  name="document"
                  errors={errors.document}
                />

                <CameraComponent
                  label="User picture"
                  errors={errors.userPicture}
                  name="userPicture"
                  width={300}
                  height={200}
                />

                <button type="submit">Send</button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};
