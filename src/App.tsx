import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import SideBar from "./frontend/components/SideBar/SideBar";
import Landing from "./frontend/pages/Landing/Landing";
import BlogEditor from "./frontend/pages/BlogEditor/BlogEditor";
import LoadBlog from "./frontend/pages/LoadBlog/LoadBlog";
import { Outlet } from "react-router-dom";
import { SidebarProvider } from "./frontend/components/SideBar/SideBarContent/SidebarProvider";

const router = createBrowserRouter([
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
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
