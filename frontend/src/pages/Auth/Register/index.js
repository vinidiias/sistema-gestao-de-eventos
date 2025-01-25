import { useNavigate } from "react-router-dom";
import styles from "../Login/index.module.css";
import LogoNextEvent from "../../../components/Layout/LogoNextEvent";
import AuthForm from "../../../components/Auth/AuthForm";
import Submit from "../../../components/Form/Submit";
import { FormProvider, useForm } from 'react-hook-form'

const Register = () => {
  const navigate = useNavigate();
  const methodsForm = useForm()

  const fields = [
    {
      label: "Nome",
      name: "nomeParticipante",
      type: "text",
      placeholder: "Digite seu Nome",
    },
    {
        label: "Email",
        name: "email",
        type: "email",
        placeholder: "Digite seu Email",
      },
    {
        label: "Telefone",
        name: "telefone",
        type: "text",
        placeholder: "Digite seu Telefone",
      },
      {
        label: "Nova Senha",
        name: "senha",
        type: "password",
        placeholder: "Digite sua Senha",
      },
      {
        label: "Confirme Senha",
        name: "confirmacaoSenha",
        type: "password",
        placeholder: "Digite novamente sua Senha",
      },
  ];

    const handleSubmit = (data) => {
        
        navigate('/eventos')
        alert('Registrado com sucesso!')
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
