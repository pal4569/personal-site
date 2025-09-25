import './LoadOptions.css'
import { useNavigate } from 'react-router-dom';


export function LoadOptions() {
    const navigate = useNavigate();
    const id = window.location.href.split("/").pop();
    function handleEdit() {
        navigate(`/create/${id}`)
    }
    return (
        <div className="load-options">
            <button 
                className="option"
                onClick={handleEdit}>Edit</button>
            <button className="option">Delete</button>
        </div>
    );
}