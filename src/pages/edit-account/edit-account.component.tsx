import { FunctionComponent, useEffect, useRef } from "react";
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { PageHeaderComponent } from "../../components/page-header/page-header.component";
import * as Yup from "yup";
import { Form, Formik, FormikProps } from "formik";
import { InputComponent } from "../../components/input/input.component";
import styles from "./edit-account.module.css";
import axios, { AxiosResponse } from "axios";
import {
  API_ACTION_UPDATE_MY_ACCOUNT,
  API_FETCH_MY_ACCOUNT,
} from "../../constants/api.constant";
import { handleAxiosError } from "../../services/axios.service";
import { Client } from "../../models/client.model";
import { toast } from "react-toastify";
import { Messages } from "../../constants/messages.constant";
import { ROUTES } from "../../constants/root.constant";
import { useNavigate } from "react-router-dom";

interface FormProps {
  email: string;
  phoneNumber: string;
  password: string;
}

const initialFormValues: FormProps = {
  email: "",
  phoneNumber: "",
  password: "",
};

const formSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  phoneNumber: Yup.string().required("Required"),
  password: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
});

export const EditAccountComponent: FunctionComponent = () => {
  const formikRef = useRef<FormikProps<FormProps>>(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(API_FETCH_MY_ACCOUNT)
      .then((res: AxiosResponse<Client>) => {
        if (!formikRef.current) return;
        const { setValues } = formikRef.current;
        const { email, phoneNumber } = res.data;
        const newValues: FormProps = {
          email,
          phoneNumber,
          password: "",
        };
        setValues(newValues);
      })
      .catch(handleAxiosError);
  }, []);

  const onSubmithandler = (props: FormProps) => {
    axios
      .put(API_ACTION_UPDATE_MY_ACCOUNT, props)
      .then(() => {
        toast.success(Messages.MY_ACCOUNT_SUCCESS_EDIT);
        navigate(ROUTES.DASHBOARD);
      })
      .catch(handleAxiosError);
  };

  return (
    <>
      <NavbarComponent />
      <div className="container">
        <PageHeaderComponent value="Edit my account" />

        <Formik
          initialValues={initialFormValues}
          onSubmit={onSubmithandler}
          validationSchema={formSchema}
          innerRef={formikRef}
        >
          {({ errors, touched, values }) => (
            <Form className={styles.formStyle}>
              <InputComponent
                label="Email"
                name="email"
                errors={errors.email}
                touched={touched.email}
              />

              <InputComponent
                label="Password"
                name="password"
                key="password"
                errors={errors.password}
                touched={touched.password}
              />

              <InputComponent
                label="Phone number"
                name="phoneNumber"
                errors={errors.phoneNumber}
                touched={touched.phoneNumber}
              />

              <button type="submit" className={styles.saveForm}>
                Save the form
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};
