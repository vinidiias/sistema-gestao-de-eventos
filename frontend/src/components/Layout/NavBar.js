import styles from './NavBar.module.css'
import LogoNextEvent from './LogoNextEvent'
import { Link, useNavigate } from 'react-router-dom'

const NavBar = () => {
    
    const navigate = useNavigate()

    return (
      <nav className={styles.navbar}>
        <LogoNextEvent
            onClick={() => navigate('/eventos')}
        />
        <ul>
          <li>
              <Link to="/eventos">Eventos</Link>
          </li>
          <li>
              <Link to="/contact">Contato</Link>
          </li>
          <li>
              <Link to="/empresa">Empresa</Link>
          </li>
        </ul>
      </nav>
    );
}

export default NavBar