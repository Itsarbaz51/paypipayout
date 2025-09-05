import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const PublicLayout = () => {
  return (
    <div className=" flex flex-col">
      <Navbar />
      <main className="flex-1 py-24">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default PublicLayout;
