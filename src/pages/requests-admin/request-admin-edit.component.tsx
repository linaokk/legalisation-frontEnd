import { Form, Formik } from "formik";
import { Button, Modal } from "react-bootstrap";
import * as Yup from "yup";
import { InputFileComponent } from "../../components/input-file/input-file.component";
import { FunctionComponent } from "react";
import { Request } from "../../models/request.model";
import styles from "./requests-admin.module.css";
import axios from "axios";
import { toast } from "react-toastify";
import { handleAxiosError } from "../../services/axios.service";
import { Messages } from "../../constants/messages.constant";
import { API_ACTION_VALIDATE_REQUEST } from "../../constants/api.constant";

interface RequestAdministrationEditProps {
  request: Request;
  show: boolean;
  toggle: (_: boolean) => void;
}

interface FormProps {
  document?: File;
  requestId: number;
}

const formSchema = Yup.object().shape({
  requestId: Yup.number().required(),
  document: Yup.mixed<File>().test(
    "fileNeeded",
    "The file is needed",
    (value) => {
      if (!value) return false;
      return true;
    }
  ),
});

export const RequestAdministrationEdit: FunctionComponent<
  RequestAdministrationEditProps
> = ({ show, toggle, request }) => {
  const initialFormValues: FormProps = {
    requestId: request.id,
  };

  const onSubmithandler = (props: FormProps) => {
    const formData: FormData = new FormData();
    Object.entries(props).forEach(([key, value]) => {
      formData.append(key, value);
    });

    const url = API_ACTION_VALIDATE_REQUEST.replace(
      ":requestId",
      props.requestId.toString()
    );
    axios
      .put(url, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        toast.success(Messages.REQUESTE_VALIDATED);
        toggle(false);
      })
      .catch(handleAxiosError);
  };

  return (
    <Modal show={show} onHide={() => toggle(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Request validation</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={initialFormValues}
          onSubmit={onSubmithandler}
          validationSchema={formSchema}
        >
          {({ errors }) => (
            <Form>
              <InputFileComponent
                label="Document"
                name="document"
                errors={errors.document}
              />

              <div className={`row ${styles.userPictureContainer}`}>
                <div className={`col-6 ${styles.leftUserPicture}`}>
                  <img src={request.userPicture} alt="Left UserPicture" />
                </div>
                <div className={`col-6 ${styles.rightUserPicture}`}>
                  <img src={request.user.userPicture} alt="Right UserPicture" />
                </div>
              </div>

              <Button
                variant="dark"
                type="submit"
                className={styles.buttonValidate}
              >
                Validate
              </Button>
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
