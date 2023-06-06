import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import ArticleDetail from "./pages/articleDetail/ArticleDetail";
import RegisterPage from "./pages/register/RegisterPage";
import { Toaster } from 'react-hot-toast';
import LoginPage from "./pages/login/LoginPage";
import ProfilePage from "./pages/profile/ProfilePage";
import AdminLayout from "./pages/admin/AdminLayout";

function App() {
  return (
    <>
      <Routes>
      
        <Route path="/" element={<Home />} />
        <Route path="/blog/:slug" element={<ArticleDetail />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/admin" element={<AdminLayout />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
