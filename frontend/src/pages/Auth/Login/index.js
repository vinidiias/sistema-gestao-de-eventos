import { useNavigate } from "react-router-dom";
import styles from "./index.module.css";
import LogoNextEvent from "../../../components/Layout/LogoNextEvent";
import AuthForm from "../../../components/Auth/AuthForm";
import Submit from "../../../components/Form/Submit";
import { FormProvider, useForm } from "react-hook-form";
import api from "../../../services/Api";
import { UserContext } from "../../../context";
import { useContext } from "react";
import RegisterModal from "../RegisterModal";

const Login = () => {
  const navigate = useNavigate();
  const methodsForm = useForm();
  const { setUser } = useContext(UserContext);

  const fields = [
    {
      label: "Email",
      name: "email",
      type: "email",
      placeholder: "Digite seu Nome",
    },
    {
      label: "Senha",
      name: "senha",
      type: "password",
      placeholder: "Digite sua Senha",
    },
  ];

  const handleSubmit = async (data) => {
    console.log(data)
    /*try {
      await api.post("/sessao", data)
      .then((resp) => {
        console.log(resp)

        setUser((prevState) => ({
          ...prevState,
          email: resp.data.user.email,
          id: resp.data.user.id,
          isLogged: true,
          role: resp.data.role,
        }));

        navigate("/eventos");

        alert("Bem vindo!");
      });
    } catch (error) {
      console.error(error);
    }*/
  };

  const test = (text) => {
    console.log(text)
  }

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
            <h3>Entre com sua conta!</h3>
          </div>
          <FormProvider {...methodsForm}>
            <form onSubmit={methodsForm.handleSubmit(handleSubmit)}>
              <AuthForm fields={fields} />
              <div className={styles.btns}>
                <Submit type="submit" text="Entrar" />
                <Submit
                  onClick={() => navigate("/register")}
                  type="button"
                  text="Registrar"
                />
              </div>
              <RegisterModal open={true}/>
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  );
};

export default Login;
