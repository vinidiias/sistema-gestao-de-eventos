import { useNavigate } from "react-router-dom";
import styles from "./index.module.css";
import LogoNextEvent from "../../../components/Layout/LogoNextEvent";
import AuthForm from "../../../components/Auth/AuthForm";
import Submit from "../../../components/Form/Submit";
import { FormProvider, useForm } from "react-hook-form";
const Login = () => {
  const navigate = useNavigate();
  const methodsForm = useForm()

  const fields = [
    {
      label: "Email",
      name: "email",
      type: "email",
      placeholder: "Digite seu Nome",
    },
    {
      label: "Senha",
      name: "password",
      type: "password",
      placeholder: "Digite sua Senha",
    },
  ];

  const handleSubmit = (data) => {
    console.log(data)

   // navigate('/eventos')
    alert('Logado com sucesso!')
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
            </form>
          </FormProvider>
          
        </div>
      </div>
    </div>
  );
};

export default Login;
