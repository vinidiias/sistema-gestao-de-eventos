import styles from './Input.module.css'

const Input = ({ text, type, name, placeholder, onHandler, autocomplete }) => {
    return <div className={styles.input}>
            <label className={styles.label} htmlFor={name}>{text}</label>
            <input className={styles.input} id={name} autoComplete={autocomplete} type={type} name={name} placeholder={placeholder} onChange={onHandler} />
            </div>
}

export default Input