import styles from "./Card.module.css";
import React, { createContext, useContext } from "react";
import { useEffect, useState } from "react";

const SubmitContext = createContext()

const Card = ({
  index,
  title,
  type,
  onSubmit,
  children,
}) => {

  const [isSubscribe, setIsSubscribe] = useState(false);

  useEffect(() => {
    setIsSubscribe(type === "subscribe");
  }, [type]);

  const submit = () => {
    onSubmit(index)
  }

  return (
    <div className={styles.card}>
      <div className={styles.title}>
        <h1>{title}</h1>
      </div>
      <SubmitContext.Provider value={{ submit }}>
        {children}
      </SubmitContext.Provider>
    </div>
  );
};

Card.Content = function Content({ children }) {
  return <div className={styles.info}>{children}</div>;
};

Card.ListItem = function ListItem({ children }) {
  return <div className={styles.list}>{children}</div>;
};

Card.Item = function Item({ logo, text }) {
  return (
    <div className={styles.item}>
      {logo}
      <p>{text}</p>
    </div>
  );
};

Card.Logo = function Logo({ logo }) {
  return <img src={logo} alt="Logo" />;
};

Card.Footer = function Footer({ children }) {
  return <div className={styles.btns}>{children}</div>;
};

Card.Widget = function Widget({ title, value }) {
  return (
    <div className={styles.widget}>
      <h3>{title}</h3>
      <p>{value}</p>
    </div>
  );
};

Card.Submit = function Button({ title }) {
  
  const { submit } = useContext(SubmitContext)

  return (
    <div className={styles.btn}>
      <button onClick={submit}>
        {/*{isSubscribe
          ? "Exibir Atividades"
          : `Participar ${categoria !== ` ${categoria}` ? "" : ""}`}*/}
        {title}
      </button>
    </div>
  );
};

export default Card;