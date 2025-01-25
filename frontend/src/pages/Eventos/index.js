import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import styles from './index.module.css'
import { SlArrowDown } from "react-icons/sl";
import { LuMapPin } from "react-icons/lu";
import { FaRegCalendar } from "react-icons/fa";
import { FaRegClock } from "react-icons/fa6";
import LogoUnioeste from '../../assets/unioesteLogo.png'
import LogoLatinoWare from '../../assets/latinoware.png'
import Card from '../../components/Card/Card';
import Submit from '../../components/Form/Submit';
import withFetching from '../../hocs/withFetching';
import api from '../../services/Api.js'

const Evento = ({ title, txtBtn, type }) => {

    const [events, setEvents] = useState([])

    const navigate = useNavigate()

    const eventosInscritos = useMemo(() => [
      {
        id: 0,
        img: LogoLatinoWare,
        title: 'Latinoware',
        address: 'Itaipu Parquetec',
        date: '27 de novembro - 29 de novembro',
        hours: '7:30 am - 18:50 am',
        valor: '0',
        vagas: '200',
        categoria: 'Evento'
      },
      {
        id: 1,
        img: LogoUnioeste,
        title: 'Semana Acadêmica',
        address: 'Itaipu Parquetec',
        date: '24 de novembro - 27 de novembro',
        hours: '7:30 am - 11:50 am',
        valor: '15',
        vagas: '10',
        categoria: 'Evento'
      },
      {
        id: 2,
        img: LogoUnioeste,
        title: 'Semana Acadêmica',
        address: 'Itaipu Parquetec',
        date: '24 de novembro - 27 de novembro',
        hours: '7:30 am - 11:50 am',
        valor: '15',
        vagas: '10',
        categoria: 'Evento'
      },
    ], [])

    const eventosAbertos = useMemo(() => [
      {
        id: 0,
        img: LogoLatinoWare,
        title: 'Latinoware',
        address: 'Itaipu Parquetec',
        date: '27 de novembro - 29 de novembro',
        hours: '7:30 am - 18:50 am',
        valor: '0',
        vagas: '200',
        categoria: 'Evento'
      },
      {
        id: 1,
        img: LogoUnioeste,
        title: 'Semana Acadêmica',
        address: 'Itaipu Parquetec',
        date: '24 de novembro - 27 de novembro',
        hours: '7:30 am - 11:50 am',
        valor: '15',
        vagas: '10',
        categoria: 'Evento'
      },
      {
        id: 2,
        img: LogoUnioeste,
        title: 'Semana Acadêmica',
        address: 'Itaipu Parquetec',
        date: '24 de novembro - 27 de novembro',
        hours: '7:30 am - 11:50 am',
        valor: '15',
        vagas: '10',
        categoria: 'Evento'
      },
    ], [])

    useEffect(() => {
      const fetch = async () => {
        await api.get('http://localhost:5000/evento')
        .then((resp) => console.log(resp))
        .catch((error) => console.log(error))
      }

      fetch()
    }, [])

    useEffect(() => {
      if(type === 'open') setEvents(eventosAbertos)
      else setEvents(eventosInscritos)
    },[type, eventosAbertos, eventosInscritos])

    const handleSubmit = ( index ) => {
      const newEvents = events.filter(event => (event.id !== index))
      console.log('submit')
      setEvents(newEvents)
    }

    return (
      <div className={styles.evento_container}>
        {type ? (
          <>
            <div className={styles.header}>
              <h1>
                {title}
                <SlArrowDown />
              </h1>
              {txtBtn && (
                <Submit
                  text={txtBtn}
                  onClick={() => navigate("/admin/eventos/cadastro/evento")}
                />
              )}
            </div>
            <div className={styles.cards_container}>
              {events.map((evento, index) => (
                <Card
                  index={index}
                  key={index}
                  title={evento.title}
                  categoria={evento.categoria}
                  type={type}
                  onSubmit={handleSubmit}
                >
                  <Card.Content>
                    <Card.Logo logo={evento.img} />
                    <Card.ListItem>
                      <Card.Item logo={<LuMapPin />} text={evento.address} />
                      <Card.Item logo={<FaRegCalendar />} text={evento.date} />
                      <Card.Item logo={<FaRegClock />} text={evento.hours} />
                    </Card.ListItem>
                  </Card.Content>
                  <Card.Footer>
                    <Card.Widget title="Valor" value={evento.valor} />
                    <Card.Submit title="Participar" />
                  </Card.Footer>
                </Card>
              ))}
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
  const path = useLocation()

  const EventoFetching =  withFetching(Evento, path.pathname)

  return <EventoFetching {...props} />
}


export default EventWithFetching