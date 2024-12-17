import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";
import Container from "./Container";

const LayoutWithoutLayout = () => (
  <Container customClass="height">
    <Outlet />
  </Container>
);



export default LayoutWithoutLayout