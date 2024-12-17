import styles from './LogoNextEvent.module.css'
import { ImCalendar } from "react-icons/im";

const LogoNextEvent = ({ color }) => {
    return (
      <div style={{color: `${color}`}} className={styles.logo}>
        <h1>NextEvent</h1>
        <ImCalendar />
      </div>
    );
}

export default LogoNextEvent