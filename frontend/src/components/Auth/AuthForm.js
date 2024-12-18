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

    const submit = () => {
      onSubmit(email, password)
    }

    return (
      <form onSubmit={submit}>
        {isRegister && (
          <Input
            text="Nome"
            type="text"
            placeholder="Digite seu nome"
            name="name"
            onHandler={(e) => setName(e.target.value)}
          />
        )}
        <Input
          text="Email"
          type="email"
          placeholder="Digite seu email"
          name="email"
          onHandler={(e) => setEmail(e.target.value)}
        />
        <Input
          text={isRegister ? "Nova Senha" : "Senha"}
          type="password"
          placeholder="Digite sua senha"
          name="password"
          onHandler={(e) => setPassword(e.target.value)}
        />
        <div className={styles.btns}>
          <Submit text={isRegister ? "Registrar" : "Entrar"} />
          <Submit onSubmit={() => navigate(`${!isRegister ? '/register' : '/login'}`)} text={!isRegister ? "Registrar" : "Entrar"} />
        </div>
      </form>
    );
}

export default AuthForm