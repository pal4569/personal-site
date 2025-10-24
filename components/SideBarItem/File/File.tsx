import { useNavigate } from 'react-router-dom';
import './File.css'
import type { FileProps } from '../SidebarItem';

export default function File({name, navigation, level} : FileProps) {
    const navigate = useNavigate();
    const shortName = name.length < 10 ? name : name.slice(0, 10) + '...';
    return (
        <div 
            className="file-container"
            style={{ marginLeft: `${((level - 1) * 0.6) + 0.5}rem` }}>
            <i className="fas fa-file-alt" />
            <div 
                className={`file ${location.pathname === navigation ? "active" : ""}`}
                onClick={() => navigation && navigate(navigation)}
                >{shortName}
            </div>
        </div>
    );
}