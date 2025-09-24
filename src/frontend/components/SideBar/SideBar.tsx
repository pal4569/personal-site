import './SideBar.css'
import { useState } from 'react';
import { motion } from 'framer-motion';
import '@fortawesome/fontawesome-free/css/all.min.css';
import File from '../SideBarItem/File/File';
import Folder from '../SideBarItem/Folder/Folder';
import type { ItemProps } from '../SideBarItem/SidebarItem';
import { useSideBarContent } from './SideBarContent/useSideBarContent';

export default function SideBar() {
  const [sidebarToggle, setSidebarToggle] = useState(false);

  const layout: ItemProps[] = useSideBarContent();

  return (
    <motion.aside
      className="sidebar-container"
      initial={{ x: -200 }}
      animate={{ x: sidebarToggle ? 0 : -200 }}
      transition={{ duration: 0.5 }}
    >
      <div className="rectangle">
        {layout.map((element, i) => {
          if (element.type === "file") {
            return (
              <File 
                key={i}
                type={'file'}
                name={element.name} 
                navigation={element.navigation}
                level={element.level}
              />
            )
          } 
          else if (element.type === "folder") {
            return (
              <Folder 
                key={i}
                type={'folder'}
                name={element.name}
                children={element.children}
                level={element.level}
              />
            );
          } 
          else {
            throw new Error("Unrecognized sidebar type");
          }
        })}
      </div>
      <div className="rectline" />
      <div
        className="sidebar-button"
        onClick={() => setSidebarToggle(!sidebarToggle)}
      >
        <i className={`fas ${sidebarToggle ? "fa-chevron-left" : "fa-chevron-right"}`} />
      </div>
    </motion.aside>
  );
}
