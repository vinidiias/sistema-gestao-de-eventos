
import styles from './index.module.css'
import Card from '../../components/Card/Card';
import Submit from '../../components/Form/Submit';
import withFetching from '../../hocs/withFetching';
import api from '../../services/Api.js'
import { UserContext } from '../../context'
import { convert_date_to_portugueseDate } from '../../util/convert_date_to_date_portuguese.js';
import { format_address_complet } from '../../util/format_adress_complet.js'
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import { SlArrowDown } from "react-icons/sl";
import { IoChevronBackOutline } from "react-icons/io5";
import { LuMapPin } from "react-icons/lu";
import { FaRegCalendar } from "react-icons/fa";
import { FaRegClock } from "react-icons/fa6";

const Evento = ({ title, txtBtn, type, data }) => {
    const [events, setEvents] = useState(data ? data : [])
    const navigate = useNavigate()
    const { user } = useContext(UserContext)

    console.log(user)

   /* useEffect(() => {
      if(type === 'open') setEvents(eventosAbertos)
      else setEvents(eventosInscritos)
    },[type, eventosAbertos, eventosInscritos])*/

    const handleSubmit = async ( index ) => {
      try {
        await api.post(`/participanteevento/${index}/${user.id}`)
        .then((resp) => console.log(resp))
        .catch((error) => console.error(error))
      } catch(error) {
        console.error(error)
      }
      /*const newEvents = events.filter(event => (event.id !== index))
      console.log('submit')
      setEvents(newEvents)*/
    }

    return (
      <div className={styles.evento_container}>
        {type ? (
          <>
            <div className={styles.title}>
              <h1>
                {title}
                <SlArrowDown />
              </h1>
            </div>
            <div className={styles.header}>
              <div className={styles.back}>
                <Submit
                  type="button"
                  text={
                    <>
                      <IoChevronBackOutline />
                      Voltar
                    </>
                  }
                  onClick={() => navigate('/eventos')}
                />
              </div>
              <input type="text" placeholder='Pesquisar Eventos' />
              <Submit
                text={txtBtn}
                onClick={() => navigate("/admin/eventos/cadastro/evento")}
              />
            </div>
            <hr style={{width: '100%'}} />
            <div className={styles.cards_container}>
              {events.map((evento, index) => {
                const date = convert_date_to_portugueseDate(
                  evento.datainicio,
                  evento.datafim
                );

                const address = format_address_complet(
                  evento.rua,
                  evento.bairro,
                  evento.complemento,
                  evento.cep,
                  evento.cidade
                );
                return (
                    <Card
                      index={evento.idevento}
                      key={evento.idevento}
                      title={evento.nomeevento}
                      categoria={evento.categoria}
                      type={type}
                      onSubmit={handleSubmit}
                    >
                      <Card.Content>
                        <Card.ListItem>
                          <Card.Item logo={<LuMapPin />} text={address} />
                          <Card.Item logo={<FaRegCalendar />} text={date} />
                          <Card.Item
                            logo={<FaRegClock />}
                            text={evento.horario}
                          />
                        </Card.ListItem>
                      </Card.Content>
                      <Card.Footer>
                        <Card.Submit title="Participar" />
                      </Card.Footer>
                    </Card>
                );
              })}
            </div>
          </>
        ) : (
          <div className={styles.btnsEventos}>
            <Submit
              text="Eventos Abertos"
              onClick={() => navigate("/eventos/abertos")}
            />
            <Submit
              text="Eventos Inscritos"
              onClick={() => navigate("/eventos/inscritos")}
            />
          </div>
        )}
      </div>
    );
}

const EventWithFetching = (props) => {
  const EventoFetching =  withFetching(Evento, )
  const url = 'http://localhost:5000/evento'

  return <EventoFetching url={url} {...props} />
}


export default EventWithFetching