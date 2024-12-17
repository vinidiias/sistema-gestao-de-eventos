import styles from './Card.module.css'
import { LuMapPin } from "react-icons/lu";
import { FaRegCalendar } from "react-icons/fa";
import { FaRegClock } from "react-icons/fa6";

const Card = ({ img, title, address, date, hours, valor, vagas, categoria }) => {
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
          <div className={styles.widget}>
            <h3>Valor</h3>
            <p>R$ {valor}</p>
          </div>
          <div className={styles.widget}>
            <h3>Vagas</h3>
            <p>{vagas}</p>
          </div>
          <button>Participar{categoria !== ` ${categoria}` ? '' : ''}</button>
        </div>
      </div>
    );
}

export default Card