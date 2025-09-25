import { BrowserRouter, Routes, Route } from "react-router-dom";

import SideBar from "./frontend/components/SideBar/SideBar";
import Landing from "./frontend/pages/Landing/Landing";
import BlogEditor from "./frontend/pages/BlogEditor/BlogEditor";
import LoadBlog from "./frontend/pages/LoadBlog/LoadBlog";

export default function App() {
  return (
    <BrowserRouter>
      <div className="layout">
        <SideBar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/create/:id" element={<BlogEditor />} />
            <Route path="/load/:id" element={<LoadBlog />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
