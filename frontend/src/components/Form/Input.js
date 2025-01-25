import { useFormContext } from 'react-hook-form'
import styles from './Input.module.css'

const Input = ({ text, type, name, placeholder, onHandler, autocomplete }) => {
    const { register } = useFormContext()

    return <div className={styles.input}>
            <label className={styles.label} htmlFor={name}>{text}</label>
            <input className={styles.input} id={name} autoComplete={autocomplete} type={type} name={name} placeholder={placeholder} {...register(name)} />
            </div>
}

export default Input