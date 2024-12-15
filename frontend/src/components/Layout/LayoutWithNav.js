import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";
import Container from "./Container";

const LayoutWithLayout = () => (
  <>
    <NavBar />
    <Container customClass="height">
      <Outlet />
    </Container>
    <Footer />
  </>
);

export default LayoutWithLayout