import './LoadOptions.css'
import { useNavigate } from 'react-router-dom';
import { useSidebar } from "../SideBar/SideBarContent/useSidebar";
import { useState, useEffect } from 'react';


export function LoadOptions() {
    const navigate = useNavigate();
    const { reload } = useSidebar();
    const id = window.location.href.split("/").pop();
    const [ loggedIn, setLoggedIn ] = useState<boolean>(false);

  useEffect(() => {
    const checkAuth = async () => {
        try {
            const res = await fetch("http://localhost:5000/api/secure", {
                credentials: "include",
            });

            if (!res.ok) {
                if (res.status === 401) {
                console.log("User is not logged in");
                setLoggedIn(false);
                return;
                }
                throw new Error(`Failed to check auth: ${res.statusText}`);
            }

            const data = await res.json();
            console.log("User is logged in:", data.user);
            setLoggedIn(true);
            } catch (err) {
            console.error("Checking auth failed", err);
        }
    };

    checkAuth();
    }, []);

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
                onClick={handleEdit}
                disabled={!loggedIn}>Edit</button>
            <button 
                className="option"
                onClick={handleDelete}
                disabled={!loggedIn}>Delete</button>
        </div>
    );
}