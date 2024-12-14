import styles from './Submit.module.css'

const Submit = ({ text, onSubmit  }) => {
    return <button className={styles.btn} onClick={onSubmit}>{text}</button>
}

export default Submit