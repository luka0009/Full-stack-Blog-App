import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import ArticleDetail from "./pages/articleDetail/ArticleDetail";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog/:id" element={<ArticleDetail />} />
      </Routes>
    </>
  );
}

export default App;
