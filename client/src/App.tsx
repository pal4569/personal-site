import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import SideBar from "./components/SideBar/SideBar";
import Landing from "./pages/Landing/Landing";
import BlogEditor from "./pages/BlogEditor/BlogEditor";
import LoadBlog from "./pages/LoadBlog/LoadBlog";
import { Outlet } from "react-router-dom";
import { SidebarProvider } from "./components/SideBar/SideBarContent/SidebarProvider";
import VideoPlayer from "./pages/VideoPlayer/VideoPlayer";
import LoginPage from "./pages/LoginPage/LoginPage";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: (
        <SidebarProvider>
          <div className="layout">
            <SideBar />
            <main className="main-content">
              <Outlet />
            </main>
          </div>
        </SidebarProvider>
      ),
      children: [
        { index: true, element: <Landing /> },
        { path: "blogs/new", element: <BlogEditor /> },
        { path: "blogs/edit/:id", element: <BlogEditor /> },
        { path: "create/:id", element: <BlogEditor /> },
        { path: "blogs/:id", element: <LoadBlog /> },
        { path: "videos/:id", element: <VideoPlayer /> },
        { path: "login", element: <LoginPage /> },
      ],
    },
  ],
  {
    basename: import.meta.env.MODE === "production" ? "/personal-site" : "/",
  }
);

export default function App() {
  return <RouterProvider router={router} />;
}
