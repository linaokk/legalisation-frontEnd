import { FunctionComponent } from "react";
import axios from "axios";
import styles from "./sign-up.module.css";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { InputComponent } from "../../components/input/input.component";
import {
  SelectComponent,
  SelectValue,
} from "../../components/select/select.component";
import { SignatureComponent } from "../../components/signature/signature.composant";
import { CameraComponent } from "../../components/camera/camera.component";

interface FormProps {
  identityType: string;
  identityCode: string;
  firstname: string;
  lastname: string;
  sexe: string;
  nationality: string;
  familySituation: string;
  email: string;
  emailConfirmation: string;
  phoneNumber: string;
  address: string;
  fatherName: string;
  motherName: string;
  password: string;
  birthday: string;
  signature: string;
  userPicture: string;
}

const idenityTypes: SelectValue[] = [
  { label: "" },
  { label: "CIN", value: "CIN" },
  { label: "Passport", value: "PASSPORT" },
];

const sexes: SelectValue[] = [
  { label: "" },
  { label: "Male", value: "HOMME" },
  { label: "Female", value: "FEMME" },
];

const nationalities: SelectValue[] = [
  { label: "" },
  { label: "Morocco", value: "MAROCAINE" },
  { label: "Algeria", value: "ALGERIENNE" },
];

const familialSituations: SelectValue[] = [
  { label: "" },
  { label: "Veuf", value: "VEUF" },
  { label: "Celib", value: "CELEBATAIRE" },
  { label: "Divorce", value: "DIVIRCE" },
];

const initialFormValues: FormProps = {
  firstname: "first name",
  identityType: "CIN",
  identityCode: "AE180899",
  lastname: "last name",
  sexe: "HOMME",
  address: "81 rue Gallieni 92100 Franc",
  email: "hajji.zouhair@outlook.fr",
  emailConfirmation: "hajji.zouhair@outlook.fr",
  familySituation: "CELEBATAIRE",
  fatherName: "FatherA",
  motherName: "MotherB",
  nationality: "MAROCAINE",
  phoneNumber: "0782793603",
  password: "JeSuisUnMoTpAsSe",
  birthday: "2000-12-30",
  signature: "",
  userPicture: "",
};

const signupSchema = Yup.object().shape({
  firstname: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  lastname: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  identityType: Yup.string().required("Required"),
  emailConfirmation: Yup.string().required("Required"),
  sexe: Yup.string().required("Required"),
  familySituation: Yup.string().required("Required"),
  identityCode: Yup.string().required("Required"),
  birthday: Yup.date().required("Required"),
  nationality: Yup.string().required("Required"),
  address: Yup.string().required("Required"),
  fatherName: Yup.string().required("Required"),
  motherName: Yup.string().required("Required"),
  phoneNumber: Yup.string().required("Required"),
  password: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),

  signature: Yup.string().required("Required").min(100, "too short"),
  userPicture: Yup.string().required("Required").min(100, "too short"),
});

export const SignUpComponent: FunctionComponent = () => {
  const onSubmithandler = (props: FormProps): void => {
    console.log(props);
    axios
      .post("/auth/register", props)
      .then((res) => {
        console.log(">", res);
      })
      .catch((err) => {
        console.log("Error : ", err.response.data);
      });
  };

  return (
    <>
      <Formik
        initialValues={initialFormValues}
        onSubmit={onSubmithandler}
        validationSchema={signupSchema}
      >
        {({ errors, touched, values }) => (
          <Form>
            <div className={styles.registerContainer}>
              <h2>Registration</h2>

              <SelectComponent
                label="identity type"
                name="identityType"
                errors={errors.identityType}
                touched={touched.identityType}
                values={idenityTypes}
              />

              <InputComponent
                label="Identity Code"
                name="identityCode"
                errors={errors.identityCode}
                touched={touched.identityCode}
              />

              <InputComponent
                label="First Name"
                name="firstname"
                errors={errors.firstname}
                touched={touched.firstname}
              />

              <InputComponent
                label="Last Name"
                name="lastname"
                errors={errors.lastname}
                touched={touched.lastname}
              />

              <InputComponent
                label="Phone number"
                name="phoneNumber"
                errors={errors.phoneNumber}
                touched={touched.phoneNumber}
              />

              <InputComponent
                type="date"
                label="Birth date"
                name="birthday"
                errors={errors.birthday}
                touched={touched.birthday}
              />

              <SelectComponent
                label="Nationality"
                name="nationality"
                errors={errors.nationality}
                touched={touched.nationality}
                values={nationalities}
              />
              <InputComponent
                label="Email"
                name="email"
                errors={errors.email}
                touched={touched.email}
              />

              <InputComponent
                label="Email confirmation"
                name="emailConfirmation"
                errors={errors.emailConfirmation}
                touched={touched.emailConfirmation}
              />

              <InputComponent
                label="Password"
                name="password"
                errors={errors.password}
                touched={touched.password}
              />

              <InputComponent
                label="Mother name"
                name="motherName"
                errors={errors.motherName}
                touched={touched.motherName}
              />

              <InputComponent
                label="Father name"
                name="fatherName"
                errors={errors.fatherName}
                touched={touched.fatherName}
              />

              <InputComponent
                label="Address"
                name="address"
                errors={errors.address}
                touched={touched.address}
              />

              <SelectComponent
                label="Familial situation"
                name="familySituation"
                errors={errors.familySituation}
                touched={touched.familySituation}
                values={familialSituations}
              />

              <SelectComponent
                label="Sexe"
                name="sexe"
                errors={errors.sexe}
                touched={touched.sexe}
                values={sexes}
              />

              <SignatureComponent
                height={200}
                width={300}
                label="Signature"
                errors={errors.signature}
                name="signature"
              />

              <CameraComponent
                label="User picture"
                errors={errors.userPicture}
                name="userPicture"
                width={300}
                height={200}
              />

              <button type="submit">Submit the form</button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};
