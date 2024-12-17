import styles from './index.module.css'
import { SlArrowDown } from "react-icons/sl";
import { LuMapPin } from "react-icons/lu";
import { FaRegCalendar } from "react-icons/fa";
import { FaRegClock } from "react-icons/fa6";
import LogoUnioeste from '../../assets/unioesteLogo.png'
import LogoLatinoWare from '../../assets/latinoware.png'
const Evento = () => {
    return (
      <div className={styles.evento_container}>
        <div className={styles.header}>
          <h1>
            Eventos
            <SlArrowDown />
          </h1>
        </div>
        <div className={styles.cards_container}>
          <div className={styles.card}>
            <div className={styles.info}>
              <img src={LogoUnioeste} alt="" />
              <div className={styles.content}>
                <h2>Semana Acadêmica</h2>
                <div className={styles.item}>
                  <LuMapPin />
                  <p>Itaipu Parquetec</p>
                </div>
                <div className={styles.item}>
                  <FaRegCalendar />
                  <p>24 novembro - 27 de novembro</p>
                </div>
                <div className={styles.item}>
                  <FaRegClock />
                  <p>7:30 am - 11:50 am</p>
                </div>
              </div>
            </div>
            <div className={styles.btns}>
              <div className={styles.widget}>
                <h3>Valor</h3>
                <p>R$ 15</p>
              </div>
              <div className={styles.widget}>
                <h3>Vagas</h3>
                <p>10</p>
              </div>
              <button>Participar</button>
            </div>
          </div>
          <div className={styles.card}>
            <div className={styles.info}>
              <img src={LogoLatinoWare} alt="" />
              <div className={styles.content}>
                <h2>Latinoware</h2>
                <div className={styles.item}>
                  <LuMapPin />
                  <p>Itaipu Parquetec</p>
                </div>
                <div className={styles.item}>
                  <FaRegCalendar />
                  <p>27 novembro - 29 de novembro</p>
                </div>
                <div className={styles.item}>
                  <FaRegClock />
                  <p>7:30 am - 11:50 am</p>
                </div>
              </div>
            </div>
            <div className={styles.btns}>
              <div className={styles.widget}>
                <h3>Valor</h3>
                <p>R$ 0</p>
              </div>
              <div className={styles.widget}>
                <h3>Vagas</h3>
                <p>10</p>
              </div>
              <button>Participar</button>
            </div>
          </div>
          <div className={styles.card}>
            <div className={styles.info}>
              <img src={LogoUnioeste} alt="" />
              <div className={styles.content}>
                <h2>Semana Acadêmica</h2>
                <div className={styles.item}>
                  <LuMapPin />
                  <p>Itaipu Parquetec</p>
                </div>
                <div className={styles.item}>
                  <FaRegCalendar />
                  <p>24 novembro - 27 de novembro</p>
                </div>
                <div className={styles.item}>
                  <FaRegClock />
                  <p>7:30 am - 11:50 am</p>
                </div>
              </div>
            </div>
            <div className={styles.btns}>
              <div className={styles.widget}>
                <h3>Valor</h3>
                <p>R$ 15</p>
              </div>
              <div className={styles.widget}>
                <h3>Vagas</h3>
                <p>10</p>
              </div>
              <button>Participar</button>
            </div>
          </div>
          <div className={styles.card}>
            <div className={styles.info}>
              <img src={LogoUnioeste} alt="" />
              <div className={styles.content}>
                <h2>Semana Acadêmica</h2>
                <div className={styles.item}>
                  <LuMapPin />
                  <p>Itaipu Parquetec</p>
                </div>
                <div className={styles.item}>
                  <FaRegCalendar />
                  <p>24 novembro - 27 de novembro</p>
                </div>
                <div className={styles.item}>
                  <FaRegClock />
                  <p>7:30 am - 11:50 am</p>
                </div>
              </div>
            </div>
            <div className={styles.btns}>
              <div className={styles.widget}>
                <h3>Valor</h3>
                <p>R$ 15</p>
              </div>
              <div className={styles.widget}>
                <h3>Vagas</h3>
                <p>10</p>
              </div>
              <button>Participar</button>
            </div>
          </div>
          <div className={styles.card}>
            <div className={styles.info}>
              <img src={LogoUnioeste} alt="" />
              <div className={styles.content}>
                <h2>Semana Acadêmica</h2>
                <div className={styles.item}>
                  <LuMapPin />
                  <p>Itaipu Parquetec</p>
                </div>
                <div className={styles.item}>
                  <FaRegCalendar />
                  <p>24 novembro - 27 de novembro</p>
                </div>
                <div className={styles.item}>
                  <FaRegClock />
                  <p>7:30 am - 11:50 am</p>
                </div>
              </div>
            </div>
            <div className={styles.btns}>
              <div className={styles.widget}>
                <h3>Valor</h3>
                <p>R$ 15</p>
              </div>
              <div className={styles.widget}>
                <h3>Vagas</h3>
                <p>10</p>
              </div>
              <button>Participar</button>
            </div>
          </div>
        </div>
      </div>
    );
}

export default Evento