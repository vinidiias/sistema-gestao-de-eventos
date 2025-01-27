import styles from "../Login/index.module.css";
import LogoNextEvent from "../../../components/Layout/LogoNextEvent";
import AuthForm from "../../../components/Auth/AuthForm";
import Submit from "../../../components/Form/Submit";
import api from "../../../services/Api";
import { useNavigate } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
import { useContext } from "react";
import { UserContext } from "../../../context";

const Register = () => {
  const navigate = useNavigate();
  const methodsForm = useForm();
  const { setUser } = useContext(UserContext)

  const fields = [
    {
      label: "Email",
      name: "email",
      type: "email",
      placeholder: "Digite seu Email",
    },
    {
      label: "Nova Senha",
      name: "senha",
      type: "password",
      placeholder: "Digite sua Senha",
    },
  ];

  const handleSubmit = async (data) => {
    console.log(data);
    try {
      await api
        .post("/usuario", data)
        .then((resp) => {
          console.log(resp)
          setUser({
            email: resp.data.usuario.email,
            id: resp.data.usuario.idUsuario,
            isLogged: true,
          })

          navigate("/eventos");
          alert("Registrado com sucesso!");
        })

          
        .catch((error) => console.error(error));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.login_container}>
      <div className={styles.left_container}>
        <LogoNextEvent />
      </div>
      <div className={styles.right_container}>
        <div className={styles.logo_right}>
          <LogoNextEvent />
        </div>
        <div className={styles.form_container}>
          <div className={styles.titleLogin}>
            <h2>Bem vindo ao NextEvent</h2>
            <h3>Crie uma conta!</h3>
          </div>
          <FormProvider {...methodsForm}>
            <form onSubmit={methodsForm.handleSubmit(handleSubmit)}>
              <AuthForm fields={fields} />
              <div className={styles.btns}>
                <Submit type="submit" text="Registrar" />
                <Submit
                  onClick={() => navigate("/login")}
                  type="button"
                  text="Entrar"
                />
              </div>
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  );
};

export default Register;
