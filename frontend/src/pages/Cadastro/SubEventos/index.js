import { useState } from "react";
import { useParams } from "react-router-dom";

import FormCadastro from "../../../components/Cadastro/FormCadastro";
import styles from '../Evento/index.module.css'

const CadastroAcoes = ({ categorie }) => {

    const [formData, setFormData] = useState({
        name: '',
        inicio: '',
        fim: '',
        responsavel: '',
        value: '',
        vagas: '',
        categorie: '',
    })

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    } 

    const fields = [
        {name:'name', label: 'Título', value: formData.name, onChange: handleChange},
        {name:'inicio', label: 'Data de Início', type: 'date', value: formData.inicio, onChange: handleChange},
        {name:'fim', label: 'Data de Término', type: 'date', value: formData.fim, onChange: handleChange},
        {name:'responsavel', label: 'Responsável', value: formData.responsavel, onChange: handleChange},
        {name:'categorie', label: 'Categoria', value: formData.categorie, onChange: handleChange, categorias: ['Palestra', 'Curso', 'Seminário']},
        {name:'value', label: 'Valor da Inscrição', type: 'number', value: formData.value, onChange: handleChange},
        {name:'vagas', label: 'Quantidade de Vagas', type: 'number', value: formData.vagas, onChange: handleChange},
    ]

    return (
      <div className={styles.cadastro}>
        <h1>Cadastro de {categorie}</h1>
        <FormCadastro fields={fields} btnLabel={`Cadastrar ${categorie}`} />
      </div>
    );
}

export default CadastroAcoes