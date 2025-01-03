import styles from './Card.module.css'
import { LuMapPin } from "react-icons/lu";
import { FaRegCalendar } from "react-icons/fa";
import { FaRegClock } from "react-icons/fa6";
import { useEffect, useState } from 'react';

const Card = ({ index, img, title, address, date, hours, valor, vagas, categoria, type, handleSubmit }) => {
    const [isSubscribe, setIsSubscribe] = useState(false)

    useEffect(() => {
      setIsSubscribe(type === 'subscribe')
    }, [type]) 

    const submit = () => {
      handleSubmit(index)
    }

    return (
      <div className={styles.card}>
        <div className={styles.info}>
          <img src={img} alt="" />
          <div className={styles.content}>
            <h2>{title}</h2>
            <div className={styles.item}>
              <LuMapPin />
              <p>{address}</p>
            </div>
            <div className={styles.item}>
              <FaRegCalendar />
              <p>{date}</p>
            </div>
            <div className={styles.item}>
              <FaRegClock />
              <p>{hours}</p>
            </div>
          </div>
        </div>
        <div className={styles.btns}>
          {!isSubscribe && (
            <>
              <div className={styles.widget}>
                <h3>Valor</h3>
                <p>R$ {valor}</p>
              </div>
              <div className={styles.widget}>
                <h3>Vagas</h3>
                <p>{vagas}</p>
              </div>
            </>
          )}
          <button onClick={submit}>
            {isSubscribe
              ? "Exibir Atividades"
              : `Participar ${categoria !== ` ${categoria}` ? "" : ""}`}
          </button>
        </div>
      </div>
    );
}

export default Card