import styles from './Submit.module.css'

const Submit = ({ text, onSubmit, onClick, type, customClass  }) => {
    return <button className={`${styles.btn} ${styles[customClass]}`} type={type} onSubmit={onSubmit} onClick={onClick}>{text}</button>
}

export default Submit