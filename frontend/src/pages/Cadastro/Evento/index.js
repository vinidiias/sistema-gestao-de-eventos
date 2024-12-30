import { useState } from "react"
import FormCadastro from "../../../components/Cadastro/FormCadastro"
import styles from './index.module.css'
import { TiArrowLeftThick } from "react-icons/ti";
import { useNavigate } from 'react-router-dom'

import api from "../../../services/Api";

const CadastroEvento = () => {
    const navigate = useNavigate()
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

    async function createEvent() {
      /*try {
        const EventCreated = await api.post('/evento', formData)

        if(EventCreated) {
          alert('Evento criado!')
          console.log(EventCreated)
        }
      } catch(err) {
        console.error(err)
      }*/
     console.log(formData)
    }   

    return (
      <>
        <div className={styles.header}>
          <TiArrowLeftThick onClick={() => navigate('/eventos')} />
        </div>
        <div className={styles.cadastro}>
          <h1>Cadastro de Evento</h1>
          <FormCadastro 
            onSubmit={createEvent}
            fields={fields} btnLabel="Cadastrar Evento"
          />
        </div>
      </>
    );
}

export default CadastroEvento