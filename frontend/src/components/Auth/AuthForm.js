import Input from "../Form/Input";

const AuthForm = ({ fields, onSubmit }) => {
  return (
    <>
      {fields.map((field, index) => {
        return field.name === "telefone" ? (
          <div style={{ display: "flex", gap: "1em" }} key={indexedDB}>
            <Input
              text={field.label}
              name={field.name}
              type={field.type}
              placeholder={field.placeholder}
            />
            <Input
              text="CPF"
              name="cpf"
              type="text"
              placeholder="Digite seu CPF"
            />
          </div>
        ) : (
          <Input
            key={index}
            text={field.label}
            name={field.name}
            type={field.type}
            placeholder={field.placeholder}
          />
        );
      })}
    </>
  );
};

export default AuthForm;
