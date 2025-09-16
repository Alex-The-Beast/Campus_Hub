import { Outlet } from "react-router-dom";
import Footer from "../component/organism/Footer";
import Navbar from "../component/organism/Navbar";

const MainLayout = () => {
  return (
    <div className="">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};
export default MainLayout;