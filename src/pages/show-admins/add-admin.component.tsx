import { Form, Formik } from "formik";
import { FunctionComponent } from "react";
import { Button, Modal } from "react-bootstrap";
import { FormattedMessage, useIntl } from "react-intl";
import styles from "./show-admins.module.css";
import {
  SelectComponent,
  SelectValue,
} from "../../components/select/select.component";
import * as Yup from "yup";
import { InputComponent } from "../../components/input/input.component";
import axios from "axios";
import { API_ACTION_SUPERADMIN_ADD_ADMIN } from "../../constants/api.constant";
import { handleAxiosError } from "../../services/axios.service";

interface FormProps {
  identityType: string;
  identityCode: string;
  firstname: string;
  lastname: string;
  sexe: string;
  nationality: string;
  familySituation: string;
  email: string;
  phoneNumber: string;
  address: string;
  fatherName: string;
  motherName: string;
  password: string;
  birthday: string;
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
  identityCode: "admin2",
  lastname: "lastname-admin2",
  sexe: "HOMME",
  address: "Rue ben moussa, Salé Jadida",
  email: "jack@admin2.fr",
  familySituation: "CELEBATAIRE",
  fatherName: "FatherAOfAdmin2",
  motherName: "MotherBOfAdmin2",
  nationality: "MAROCAINE",
  phoneNumber: "0011334455",
  password: "admin2",
  birthday: "2001-12-30",
};

const formSchema = Yup.object().shape({
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
});

interface AddAdministratorComponentProps {
  show: boolean;
  toggle: (_: boolean) => void;
}

export const AddAdministratorComponent: FunctionComponent<
  AddAdministratorComponentProps
> = ({ show, toggle }) => {
  const { formatMessage } = useIntl();

  const onSubmithandler = (props: FormProps) => {
    axios
      .post(API_ACTION_SUPERADMIN_ADD_ADMIN, props)
      .then(() => {
        toggle(false);
      })
      .catch(handleAxiosError);
  };

  return (
    <Modal show={show} onHide={() => toggle(false)} size="xl">
      <Modal.Header closeButton>
        <Modal.Title>
          <FormattedMessage id="superadmin.add.admin.title" />
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={initialFormValues}
          onSubmit={onSubmithandler}
          validationSchema={formSchema}
        >
          {({ errors, touched }) => (
            <Form>
              <div className={styles.registerContainer}>
                <SelectComponent
                  label={formatMessage({ id: "field.identityType" })}
                  name="identityType"
                  errors={errors.identityType}
                  touched={touched.identityType}
                  values={idenityTypes}
                />

                <InputComponent
                  label={formatMessage({ id: "field.identityCode" })}
                  name="identityCode"
                  errors={errors.identityCode}
                  touched={touched.identityCode}
                />

                <InputComponent
                  label={formatMessage({ id: "field.firstname" })}
                  name="firstname"
                  errors={errors.firstname}
                  touched={touched.firstname}
                />

                <InputComponent
                  label={formatMessage({ id: "field.lastname" })}
                  name="lastname"
                  errors={errors.lastname}
                  touched={touched.lastname}
                />

                <InputComponent
                  label={formatMessage({ id: "field.phoneNumber" })}
                  name="phoneNumber"
                  errors={errors.phoneNumber}
                  touched={touched.phoneNumber}
                />

                <InputComponent
                  type="date"
                  label={formatMessage({ id: "field.birthday" })}
                  name="birthday"
                  errors={errors.birthday}
                  touched={touched.birthday}
                />

                <SelectComponent
                  label={formatMessage({ id: "field.nationality" })}
                  name="nationality"
                  errors={errors.nationality}
                  touched={touched.nationality}
                  values={nationalities}
                />
                <InputComponent
                  label={formatMessage({ id: "field.email" })}
                  name="email"
                  errors={errors.email}
                  touched={touched.email}
                />

                <InputComponent
                  label={formatMessage({ id: "field.password" })}
                  name="password"
                  errors={errors.password}
                  touched={touched.password}
                />

                <InputComponent
                  label={formatMessage({ id: "field.motherName" })}
                  name="motherName"
                  errors={errors.motherName}
                  touched={touched.motherName}
                />

                <InputComponent
                  label={formatMessage({ id: "field.fatherName" })}
                  name="fatherName"
                  errors={errors.fatherName}
                  touched={touched.fatherName}
                />

                <InputComponent
                  label={formatMessage({ id: "field.address" })}
                  name="address"
                  errors={errors.address}
                  touched={touched.address}
                />

                <SelectComponent
                  label={formatMessage({ id: "field.familySituation" })}
                  name="familySituation"
                  errors={errors.familySituation}
                  touched={touched.familySituation}
                  values={familialSituations}
                />

                <SelectComponent
                  label={formatMessage({ id: "field.sexe" })}
                  name="sexe"
                  errors={errors.sexe}
                  touched={touched.sexe}
                  values={sexes}
                />

                <Button
                  variant="dark"
                  type="submit"
                  className={styles.buttonValidate}
                >
                  <FormattedMessage id="common.validate" />
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => toggle(false)}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
