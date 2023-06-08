import { Outlet } from "react-router-dom";
import Header from "./components/header/Header";

const AdminLayout = () => {
  return (
    <div className="flex flex-col h-screen lg:flex-row">
      <Header />
      <main className="flex p-4 lg:p-6 w-full">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
