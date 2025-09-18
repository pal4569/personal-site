import { useNavigate } from 'react-router-dom';
import './File.css'
import type { FileProps } from '../SidebarItem';

export default function File({name, navigation, level} : FileProps) {
    const navigate = useNavigate();
    return (
        <div 
            className="file-container"
            style={{ marginLeft: `${level * 0.5}rem` }}>
            <i className="fas fa-file-alt" />
            <div 
                className="file"
                style={{ color: location.pathname === navigation ? "#8ec07c" : "#ebdbb2" }}
                onClick={() => navigation && navigate(navigation)}
                >{name}
            </div>
        </div>
    );
}