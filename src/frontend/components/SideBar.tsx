import './SideBar.css'
import sidebar_left from './../assets/sidebar_left.png'
import sidebar_right from './../assets/sidebar_right.png'
import { useState } from 'react';
import { motion } from 'framer-motion';
import '@fortawesome/fontawesome-free/css/all.min.css';

export default function SideBar() {
  const [sidebarToggle, setSidebarToggle] = useState(false);

  return (
    <motion.aside
      className="sidebar-container"
      initial={{ x: -200 }}
      animate={{ x: sidebarToggle ? 0 : -200 }}
      transition={{ duration: 0.5 }}
    >
      <div className="rectangle">
        <div className="folder-container">
          <i className="fas fa-folder" />
          <div className="folder">Home</div>
        </div>
        <div className="folder-container">
          <i className="fas fa-folder" />
          <div className="folder">Blogs</div>
        </div>
      </div>
      <div className="rectline" />
      <div
        className="sidebar-button"
        onClick={() => setSidebarToggle(!sidebarToggle)}
      >
        <img
          src={sidebarToggle ? sidebar_right : sidebar_left}
          alt="toggle sidebar"
        />
      </div>
    </motion.aside>
  );
}


