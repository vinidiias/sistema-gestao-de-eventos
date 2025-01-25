import { useEffect, useState } from "react"
import Input from "../Form/Input"
import Submit from "../Form/Submit"
import styles from './FormCadastro.module.css'

const FormCadastro = ({ fields, onSubmit, btnLabel }) => {

  const [screenWidth, setScreenWidth] = useState(window.innerWidth)
  console.log(screenWidth)
  useEffect(() => {
    const changeWidth = () => setScreenWidth(window.innerWidth)

    // Adicionar listener ao redimensionamento
    window.addEventListener("resize", changeWidth);

    // Remover listener quando o componente for desmontado
    return () => {
      window.removeEventListener("resize", changeWidth);
    };

  }, [])

  const submit = (e) => {
    e.preventDefault()

    onSubmit()
  }

  const inputs = [];
  for (let i = 0; i < fields.length; i++) {
    const field = fields[i];
  
    if (field.name === "inicio") {
      const nextField = fields[i + 1];
      if (nextField && nextField.name === "fim") {
        inputs.push(
          <div key={i} className={styles.date}>
            <Input
              name={field.name}
              type={field.type || "text"}
              placeholder={field.placeholder || ""}
              onHandler={field.onChange}
              text={field.label}
            />
            {window.innerWidth  <= 300 ? '' : '-'}
            <Input
              name={nextField.name}
              type={nextField.type || "text"}
              placeholder={nextField.placeholder || ""}
              onHandler={nextField.onChange}
              text={nextField.label}
            />
          </div>
        );
        i++; // Pule o próximo índice
        continue;
      }
    }
    // Renderize normalmente
    inputs.push(
      <Input
        key={i}
        name={field.name}
        type={field.type || "text"}
        placeholder={field.placeholder || ""}
        onHandler={field.onChange}
        text={field.label}
      />
    );
  }
  
  return (
    <form className={styles.form} onSubmit={submit}>
      {inputs}
      <Submit text={btnLabel} />
    </form>
  );
}

export default FormCadastro