import styles from './index.module.css'
import { SlArrowDown } from "react-icons/sl";

import LogoUnioeste from '../../assets/unioesteLogo.png'
import LogoLatinoWare from '../../assets/latinoware.png'
import Card from '../../components/Card/Card';
import Submit from '../../components/Form/Submit';
import { useNavigate } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';

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
      if(type === 'open') setEvents(eventosAbertos)
      else setEvents(eventosInscritos)
    },[type, eventosAbertos, eventosInscritos])

    const handleSubmit = ( index ) => {
      const newEvents = events.filter(event => (event.id !== index))
      
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
                  onClick={() => navigate("/eventos/cadastro/evento")}
                />
              )}
            </div>
            <div className={styles.cards_container}>
              {events.map((evento, index) => (
                <Card
                  index={index}
                  key={index}
                  img={evento.img}
                  title={evento.title}
                  address={evento.address}
                  date={evento.date}
                  hours={evento.hours}
                  valor={evento.valor}
                  vagas={evento.vagas}
                  categoria={evento.categoria}
                  type={type}
                  handleSubmit={handleSubmit}
                />
              ))}
            </div>
          </>
        ) : (
          <div className={styles.btnsEventos}>
            <Submit text="Eventos Abertos" onClick={() => navigate('/eventos/abertos')} />
            <Submit text="Eventos Inscritos" onClick={() => navigate('/eventos/inscritos')} />
          </div>
        )}
      </div>
    );
}

export default Evento