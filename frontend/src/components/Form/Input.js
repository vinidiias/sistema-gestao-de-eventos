import styles from './Input.module.css'

const Input = ({ text, type, name, placeholder, onHandler }) => {
    return <>
            <label className={styles.label} htmlFor={name}>{text}</label>
            <input className={styles.input} type={type} name={name} placeholder={placeholder} onChange={onHandler} />
            </>
}

export default Input