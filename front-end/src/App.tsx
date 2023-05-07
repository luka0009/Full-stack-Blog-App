import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import ArticleDetail from "./pages/articleDetail/ArticleDetail";
import RegisterPage from "./pages/register/RegisterPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog/:id" element={<ArticleDetail />} />
        <Route path="register" element={<RegisterPage />} />
      </Routes>
    </>
  );
}

export default App;
