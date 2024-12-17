import styles from './index.module.css'
import { SlArrowDown } from "react-icons/sl";

import LogoUnioeste from '../../assets/unioesteLogo.png'
import LogoLatinoWare from '../../assets/latinoware.png'
import Card from '../../components/Card/Card';
const Evento = () => {

    const eventos = [
      {
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
        img: LogoUnioeste,
        title: 'Semana Acadêmica',
        address: 'Itaipu Parquetec',
        date: '24 de novembro - 27 de novembro',
        hours: '7:30 am - 11:50 am',
        valor: '15',
        vagas: '10',
        categoria: 'Evento'
      }
    ]

    return (
      <div className={styles.evento_container}>
        <div className={styles.header}>
          <h1>
            Eventos
            <SlArrowDown />
          </h1>
        </div>
        <div className={styles.cards_container}>
          {eventos.map((evento, index) => (
            <Card 
              key={index}
              img={evento.img}
              title={evento.title}
              address={evento.address}
              date={evento.date}
              hours={evento.hours}
              valor={evento.valor}
              vagas={evento.vagas}
              categoria={evento.categoria}
            />
          ))}
        </div>
      </div>
    );
}

export default Evento