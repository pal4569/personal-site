import { useNavigate } from 'react-router-dom';
import './Video.css'
import type { VideoProps } from '../SidebarItem';

export default function Video({name, navigation, level} : VideoProps) {
    const navigate = useNavigate();
    return (
        <div 
            className="video-container"
            style={{ marginLeft: `${((level - 1) * 0.6) + 0.5}rem` }}>
            <i className="fas fa-video" />
            <div 
                className={`video ${location.pathname === navigation ? "active" : ""}`}
                onClick={() => navigation && navigate(navigation)}
                >{name}
            </div>
        </div>
    );
}