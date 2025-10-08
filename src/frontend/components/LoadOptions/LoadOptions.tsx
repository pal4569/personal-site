import './LoadOptions.css'
import { useNavigate } from 'react-router-dom';
import { useSidebar } from "../SideBar/SideBarContent/useSidebar";


export function LoadOptions() {
    const navigate = useNavigate();
    const { reload } = useSidebar();
    const id = window.location.href.split("/").pop();

    function handleEdit() {
        navigate(`/blogs/edit/${id}`)
    }
    async function handleDelete() {
        const confirmDelete = window.confirm("Are you sure you want to delete this blog?");
        if (!confirmDelete) return;

        try {
            const response = await fetch(`http://localhost:5000/api/blogs/${id}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                throw new Error("Failed to delete blog");
            }

            reload();
            navigate("/");
        } catch (err) {
            console.error(err);
            alert("Error deleting blog.");
        }
    }
    return (
        <div className="load-options">
            <button 
                className="option"
                onClick={handleEdit}>Edit</button>
            <button 
                className="option"
                onClick={handleDelete}>Delete</button>
        </div>
    );
}