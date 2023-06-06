import { Outlet } from "react-router-dom";
import Header from "./components/header/Header";

const AdminLayout = () => {
  return (
    <div className="flex flex-col h-screen lg:flex-row">
      <Header />
      <main className="bg-[#F9F9F9] flex p-4 lg:p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
