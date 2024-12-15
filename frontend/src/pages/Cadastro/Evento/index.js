import { useState } from "react"
import FormCadastro from "../../../components/Cadastro/FormCadastro"
import styles from './index.module.css'
import Container from '../../../components/Layout/Container'

const CadastroEvento = () => {
    const [formData, setFormData] = useState({
        name: '',
        local: '',
        inicio: '',
        fim: '',
        value: '',
    })

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const fields = [
        {name:'name', label: 'Título', value: formData.name, onChange: handleChange},
        {name:'inicio', label: 'Data de Início', type: 'date', value: formData.inicio, onChange: handleChange},
        {name:'fim', label: 'Data de Término', type: 'date', value: formData.fim, onChange: handleChange},
        {name:'local', label: 'Local', value: formData.local, onChange: handleChange},
        {name:'value', label: 'Valor da Inscrição', type: 'number', value: formData.value, onChange: handleChange}
    ]

    return (
        <div className={styles.cadastro}>
            <h1>Cadastro de Evento</h1>
            <FormCadastro fields={fields} btnLabel="Cadastrar Evento" />
        </div>
    )
}

export default CadastroEvento