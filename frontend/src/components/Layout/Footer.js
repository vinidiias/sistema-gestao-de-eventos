import styles from './Footer.module.css'
import { FaTwitter } from "react-icons/fa";
import { BiLogoInstagramAlt } from "react-icons/bi";
import { FaLinkedinIn } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";

const Footer = () => {
    return (
      <footer className={styles.footer}>
        <ul>
          <li>
            <FaGithub />
          </li>
          <li>
            <FaLinkedinIn />
          </li>
          <li>
            <BiLogoInstagramAlt />
          </li>
          <li>
            <FaTwitter />
          </li>
        </ul>
        <p className={styles.copy_right}>
          <span>NextEvent</span> &copy; 2024
        </p>
      </footer>
    );
}

export default Footer