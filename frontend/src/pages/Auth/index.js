import styles from './index.module.css';
import AuthForm from '../../components/Auth/AuthForm';
import { useLocation } from 'react-router-dom';
import LogoNextEvent from '../../components/Layout/LogoNextEvent';

const Auth = () => {
    const url = useLocation()
    const isRegister = url.pathname === '/register'

    return (
        <div className={styles.login_container}>
            <div className={styles.left_container}>
                <LogoNextEvent />
            </div>
            <div className={styles.right_container}>
                <div className={styles.form_container}>
                    <div className={styles.titleLogin}>
                        <h2>Bem vindo ao NextEvent</h2>
                        <h3>{isRegister ? 'Registre' : 'Entre com'} sua conta!</h3>
                    </div>
                    <AuthForm />
                </div>
            </div>
        </div>
    )
}

export default Auth