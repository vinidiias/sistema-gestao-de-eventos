import { useState } from "react"
import FormCadastro from "../../../components/Cadastro/FormCadastro"
import styles from './index.module.css'
import { TiArrowLeftThick } from "react-icons/ti";
import { useNavigate } from 'react-router-dom'

import api from "../../../services/Api";
import { FormProvider, useForm } from "react-hook-form";
import Submit from "../../../components/Form/Submit";

const CadastroEvento = () => {
    const navigate = useNavigate()
    const formMethods = useForm()

    const fields = [
      {
        fields: [
          { label: 'Título do Evento', name: 'nomeEvento', type: 'text', placeholder: 'Digite o nome do Evento' },
        ]
      }, 
      {
        fields: [
          { label: 'Data de Início', name: 'dataInicio', type: 'date' },
          { label: 'Data de Término', name: 'dataFim', type: 'date' },
          { label: 'Horário', name: 'horario', type: 'time'}
        ]
      },
      {
        fields: [
          { label: 'CEP', name: 'cep', type: 'text', placeholder: 'Digite o CEP do Evento' },

          { label: 'Bairro', name: 'bairro', type: 'text', placeholder: 'Digite o bairro do Evento' },
        ]
      },
      {
        fields: [
          { label: 'Rua', name: 'rua', type: 'text', placeholder: 'Digite a rua do Evento' },
          { label: 'Complemento', name: 'complemento', type: 'text' },
        ]
      },
      {
        fields: [
          { label: 'Cidade', name: 'cidade', type: 'text'}
        ]
      },
    ]

    async function handleCreateEvent(data) {
      console.log(data)

      try {

        await api.post('/evento', data)
        .then((resp) => {
          console.log(resp.data)
        })
        .catch((error) => console.error(error))
      } catch(err) {
        console.error(err)
      }
    }   

    return (
      <>
        <div className={styles.header}>
          <TiArrowLeftThick onClick={() => navigate('/eventos')} />
        </div>
        <div className={styles.cadastro}>
          <h1>Cadastro de Evento</h1>
          <FormProvider {...formMethods}>
            <form onSubmit={formMethods.handleSubmit(handleCreateEvent)}>
              <FormCadastro
                fields={fields}
              />
              <div style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
                <Submit text='Cadastrar Evento' />
              </div>
            </form>
          </FormProvider>
        </div>
      </>
    );
}

export default CadastroEvento