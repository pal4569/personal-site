import { useState } from 'react';
import './Folder.css';
import type { FolderProps } from '../SidebarItem';
import File from '../File/File'


export default function Folder({ name, children, level }: FolderProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="folder-wrapper">
      {/* folder row */}
        <div 
          className="folder-container" 
          onClick={() => setExpanded(!expanded)}
          style={{ marginLeft: `${level * 0.5}rem` }}>
          <i className={`fas ${expanded ? "fa-folder-open" : "fa-folder"}`} />
          <div className="folder">{name}</div>
      </div>

      {/* children, only render when expanded */}
      <div className="children-wrapper">
        {expanded && (
          <div className="children-container">
            {children.map((element) => {
              if (element.type === "file") {
                return (
                  <File
                    key={element.name}
                    type={'file'}
                    name={element.name}
                    navigation={element.navigation!}
                    level={level}
                  />
                );
              } else {
                return (
                  <Folder
                    key={element.name}
                    {...element}
                    level={level}
                  />
                );
              }
            })}
          </div>
      )}
      </div>
    </div>
  );
}
