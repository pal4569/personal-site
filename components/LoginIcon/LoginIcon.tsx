import { useNavigate } from 'react-router-dom';
import './LoginIcon.css';
import { useState, useEffect } from 'react';

export default function LoginIcon() {
    const navigate = useNavigate();
    const [ loggedIn, setLoggedIn ] = useState<boolean>(false);
    function handleClick() {
        navigate("/login");
    }

    async function handleSignout() {
        try {
            const res = await fetch("http://localhost:5000/api/signout", {
                method: "POST",
                credentials: "include",
            });

            if (!res.ok) {
                throw new Error(`Logout failed: ${res.statusText}`);
            }

            console.log("User successfully logged out.");
            setLoggedIn(false);
            } 
            catch (err) {
            console.error("Failed logging out", err);
            }
    }

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
    return (
        <div className="loginIcon-container">
        <i 
            className="fa-solid fa-user"
            onClick={handleClick}>

        </i>
        {loggedIn && <p 
            className="signout-button"
            onClick={handleSignout}>Sign out</p>}
        </div>
        
    );
}