import styles from './NavBar.module.css'
import LogoNextEvent from './LogoNextEvent'

const NavBar = () => {
    return (
        <nav className={styles.navbar}>
            <LogoNextEvent />
        </nav>
    )
}

export default NavBar