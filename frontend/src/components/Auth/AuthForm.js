import Input from '../Form/Input';
import Submit from '../Form/Submit';
import styles from './AuthForm.module.css'
import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';

const AuthForm = ({ onSubmit }) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()
    
    const url = useLocation()
    const isRegister = url.pathname === "/register"

    const submitLogin = (e) => {
      e.preventDefault()
      onSubmit(email, password)
    }

    const submitRegister = (e) => {
      e.preventDefault()
      onSubmit(name, email, password)
    }

    const redirect = (e) => {
      e.preventDefault()
      navigate(`${!isRegister ? '/register' : '/login'}`)
    }

    return (
      <form onSubmit={isRegister ? submitRegister : submitLogin} >
        {isRegister && (
          <Input
            text="Nome"
            type="text"
            autocomplete="name"
            placeholder="Digite seu nome"
            name="name"
            onHandler={(e) => setName(e.target.value)}
          />
        )}
        <Input
          text="Email"
          type="email"
          autocomplete="email"
          placeholder="Digite seu email"
          name="email"
          onHandler={(e) => setEmail(e.target.value)}
        />
        <Input
          text={isRegister ? "Nova Senha" : "Senha"}
          type="password"
          autocomplete="current-password"
          placeholder="Digite sua senha"
          name="password"
          onHandler={(e) => setPassword(e.target.value)}
        />
        <div className={styles.btns}>
          <Submit type="submit" text={isRegister ? "Registrar" : "Entrar"} />
          <Submit onClick={redirect} type="button" text={!isRegister ? "Registrar" : "Entrar"} />
        </div>
      </form>
    );
}

export default AuthForm