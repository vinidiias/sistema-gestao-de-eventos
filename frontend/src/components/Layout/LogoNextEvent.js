import styles from './LogoNextEvent.module.css'
import { ImCalendar } from "react-icons/im";

const LogoNextEvent = ({ color, onClick }) => {
    return (
      <div onClick={onClick} style={{color: `${color}`, cursor: `${onClick ? 'pointer' : ''}`}} className={styles.logo}>
        <h1>NextEvent</h1>
        <ImCalendar />
      </div>
    );
}

export default LogoNextEvent