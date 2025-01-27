import styles from './index.module.css'
import api from "../../../services/Api";
import { useFormContext } from 'react-hook-form';
import AuthForm from '../../../components/Auth/AuthForm';

// or
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 'auto',
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function RegisterModal({ open }) {
  const { watch } = useFormContext();

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
      placeholder: "Digite seu Nome",
    },
    {
        label: "Telefone",
        name: "telefone",
        type: "text",
        placeholder: "Digite seu Telefone",
      },
      {
        label: "CPF",
        name: "cpf",
        type: "text",
        placeholder: "Digite seu CPF",
      },
  ];

  const validate = (name, email, telefone, cpf) => {
    console.log(name, email, telefone, cpf);
    return (
      !name ||
      name === "" ||
      !email ||
      email === "" ||
      !telefone ||
      telefone === "" ||
      !cpf ||
      cpf === ""
    )
  };

  const submit = async () => {
    const nomeParticipante = watch("nomeParticipante");
    const email = watch("email");
    const telefone = watch("telefone");
    const cpf = watch("cpf");

    if (!validate(nomeParticipante, email, telefone, cpf)) {
      return alert("Informacoes invalidas");
    } else {
      try {
        await api
          .post("/participante", {
            nomeParticipante,
            email,
            telefone,
            cpf,
          })
          .then((resp) => console.log(resp))
          .catch((error) => console.error(error));

        alert("Cadastro concluido com sucesso!");
      } catch (error) {
        console.error(error);
      }
    }
  };
  return (
    <div className={styles.modal}>
        <h1>Preencha as Informacoes</h1>
        <AuthForm fields={fields} />
    </div>
  );
}
