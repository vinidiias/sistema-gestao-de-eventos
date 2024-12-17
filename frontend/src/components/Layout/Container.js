import { useLocation } from 'react-router-dom'
import styles from './Container.module.css'

const Container = ({ customClass, children }) => {
    const url = useLocation()
    if(url.pathname === '/eventos') customClass = 'auto'
    
    return (
        <div className={`${styles.container} ${styles[customClass]}`}>
            {children}
        </div>
    )
}

export default Container