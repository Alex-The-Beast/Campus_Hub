import { Outlet } from "react-router-dom";
import Footer from "../component/organism/Footer";
import Navbar from "../component/organism/Navbar";

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};
export default MainLayout;