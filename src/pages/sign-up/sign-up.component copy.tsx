import { FunctionComponent, useState, createRef } from "react";
import axios from "axios";
import "./sign-up.style.css";
import { useFormik } from "formik";
import * as Yup from "yup";

interface FormProps {
  idenityType: string;
  identityCode: string;
  firstname: string;
  lastname: string;
  sexe: string;
  nationality: string;
  familySituation: string;
  email: string;
  emailConfirmation: string;
  numberPhone: string;
  address: string;
  fatherName: string;
  motherName: string;
  password: string;
}

export const SignUpComponent: FunctionComponent = () => {
  const onSubmitAction = (props: FormProps): void => {};

  const signupFormik = useFormik<FormProps>({
    initialValues: {
      firstname: "",
      idenityType: "",
      identityCode: "",
      lastname: "",
      sexe: "",
      address: "",
      email: "",
      emailConfirmation: "",
      familySituation: "",
      fatherName: "",
      motherName: "",
      nationality: "",
      numberPhone: "",
      password: "",
    },
    onSubmit: onSubmitAction,
  });

  const [error, setError] = useState<string>();
  const passwordRef = createRef<HTMLInputElement>();
  const numIdentiteRef = createRef<HTMLInputElement>();
  const pieceIdentiteRef = createRef<HTMLSelectElement>();
  const prenomRef = createRef<HTMLInputElement>();
  const dateNaissanceRef = createRef<HTMLInputElement>();
  const nationaliteRef = createRef<HTMLSelectElement>();
  const situationFamRef = createRef<HTMLSelectElement>();
  const emailRef = createRef<HTMLInputElement>();

  const numTeleRef = createRef<HTMLInputElement>();
  const adresseResidenceRef = createRef<HTMLInputElement>();
  const nomPereRef = createRef<HTMLInputElement>();
  const nomMereRef = createRef<HTMLInputElement>();
  const sexeRef = createRef<HTMLSelectElement>();
  const nomRef = createRef<HTMLInputElement>();

  const checkFields = (): boolean => {
    const numIdentite = numIdentiteRef.current?.value || "";
    const nom = nomRef.current?.value || "";
    const password = passwordRef.current?.value || "";
    const numTele = numTeleRef.current?.value || "";

    if (numIdentite.length < 6) {
      setError("Le numéro d'identité doit comporter au moins 6 caractères");
      return false;
    }
    if (nom.length < 3) {
      setError("Entrer a valide nom ");
      return false;
    }
    if (password.length < 8) {
      setError("Le Mot de passe  doit comporter au moins 8 caractères");
      return false;
    }
    if (numTele.length < 10) {
      setError("le Numero de Telephone n'est pas valide");
      return false;
    }
    setError(undefined);
    return true;
  };

  const onSubmitHandler = () => {
    const formIsValid = checkFields();
    const numIdentite = numIdentiteRef.current?.value || "";
    const nom = nomRef.current?.value || "";
    const pieceDidentite = pieceIdentiteRef.current?.value || "";
    const prenom = prenomRef.current?.value || "";
    const dateNaissance = dateNaissanceRef.current?.value || "";
    const nationalite = nationaliteRef.current?.value || "";
    const situationFam = situationFamRef.current?.value || "";
    const email = emailRef.current?.value || "";
    const numTele = numTeleRef.current?.value || "";
    const adresseResidence = adresseResidenceRef.current?.value || "";
    const nomPere = nomPereRef.current?.value || "";
    const nomMere = nomMereRef.current?.value || "";
    const sexe = sexeRef.current?.value || "";
    const password = passwordRef.current?.value || "";
    if (formIsValid) {
      axios
        .post(process.env.REACT_APP_WS_HOST + "/auth/register", {
          password,
          pieceDidentite,
          numIdentite,
          prenom,
          nom,
          sexe,
          dateNaissance,
          nationalite,
          situationFam,
          email,
          numTele,
          adresseResidence,
          nomPere,
          nomMere,
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          setError(err.response.data);
        });
    }
  };

  return (
    <>
      <div></div>

      {error}
      <div className="container">
        <div className="title">Registration</div>
        <div className="content">
          <div className="form">
            <div className="user-details">
              <div className="input-box">
                <span className="details">Piece Didentité</span>
                <select ref={pieceIdentiteRef}>
                  <option>CIN </option>
                  <option>PASSEPORT </option>
                </select>
              </div>
              <div className="input-box">
                <span className="details">Numero Identité</span>
                <input
                  type="text"
                  placeholder="Enter your username"
                  required
                  ref={numIdentiteRef}
                  value="AE180899"
                />
              </div>
              <div className="input-box">
                <span className="details">Prenom</span>
                <input
                  type="text"
                  placeholder="Enter your email"
                  required
                  ref={prenomRef}
                  value="nabil"
                />
              </div>
              <div className="input-box">
                <span className="details">Nom</span>
                <input
                  type="text"
                  placeholder="Enter your number"
                  required
                  ref={nomRef}
                  value="nabil"
                />
              </div>
              <div className="input-box">
                <span className="details">Sexe</span>
                <select ref={sexeRef}>
                  <option>HOMME</option>
                  <option>FEMME</option>
                </select>
              </div>
              <div className="input-box">
                <span className="details">Date de Naissance </span>
                <input
                  type="date"
                  placeholder="Confirm your password"
                  required
                  ref={dateNaissanceRef}
                />
              </div>

              <div className="input-box">
                <span className="details">Nationalité </span>
                <select ref={nationaliteRef}>
                  <option>ALGERIENNE</option>
                </select>
              </div>
              <div className="input-box">
                <span className="details">Situation Familliale </span>
                <select ref={situationFamRef}>
                  <option>VEUF</option>
                  <option>CELEBATAIRE</option>
                  <option>MARIE</option>
                  <option>DIVIRCE</option>
                </select>
              </div>

              <div className="input-box">
                <span className="details">Email</span>
                <input
                  type="Email"
                  placeholder="Enter your number"
                  required
                  ref={emailRef}
                  value="a.c@d.d"
                />
              </div>
              <div className="input-box">
                <span className="details">Confirmation Email</span>
                <input
                  type="text"
                  placeholder="Enter your number"
                  required
                  value="a.c@d.d"
                />
              </div>

              <div className="input-box">
                <span className="details">Numero de Telephone </span>
                <input
                  type="text"
                  placeholder="Enter your number"
                  required
                  ref={numTeleRef}
                  value="nabilhhhhhhhhhhhlllll"
                />
              </div>

              <div className="input-box">
                <span className="details">Adresse de Residence</span>
                <input
                  type="text"
                  placeholder="Enter your number"
                  required
                  ref={adresseResidenceRef}
                  value="nabil"
                />
              </div>

              <div className="input-box">
                <span className="details">Nom Pere</span>
                <input
                  type="text"
                  placeholder="Enter your number"
                  required
                  ref={nomPereRef}
                  value="nabil"
                />
              </div>

              <div className="input-box">
                <span className="details">Nom Mere</span>
                <input
                  type="text"
                  placeholder="Enter your number"
                  required
                  ref={nomMereRef}
                  value="nabil"
                />
              </div>

              <div className="input-box">
                <span className="details">Password</span>
                <input
                  type="password"
                  placeholder="Enter your number"
                  required
                  ref={passwordRef}
                  value="jesuisUnMotdePasse"
                />
              </div>
            </div>

            <div className="button">
              <input type="submit" value="Register" onClick={onSubmitHandler} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
