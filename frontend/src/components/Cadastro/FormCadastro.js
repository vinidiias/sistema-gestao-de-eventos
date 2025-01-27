import Input from "../Form/Input";
import styles from './FormCadastro.module.css'

const FormCadastro = ({ fields }) => {
  return (
    <>
      {fields.map((field, index) => {
        if (field.fields.length > 1) {
          return (
            <div className={styles.wrap} style={{ display: "flex", alignItems: "center", gap: "10px" }} key={index}>
              {field.fields.map((subFields, subIndex) => (
                <Input
                  key={subIndex}
                  text={subFields.label}
                  name={subFields.name}
                  type={subFields.type}
                  placeholder={subFields.placeholder || ""}
                />
              ))}
            </div>
          );
        } else {
          return (
            <Input
              key={index}
              text={field.fields[0].label}
              name={field.fields[0].name}
              type={field.fields[0].type}
              placeholder={field.fields[0].placeholder || ""}
            />
          );
        }
      })}
    </>
  );
};

export default FormCadastro;
