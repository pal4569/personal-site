import './LoginPage.css';
import UserBox from '../../components/UserBox/UserBox';
import PassBox from '../../components/PassBox/PassBox';
import PassMsg from '../../components/PassMsg/PassMsg';
import { useState } from 'react';

export default function LoginPage() {
    const [show, setShow] = useState(true);
    const [msg, setMsg] = useState("");

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter') {
            setShow(true);
            setMsg("incorrect username or password");
        }
        else {
            setShow(false);
        }
    };

    return (
        <div className="login-wrapper">
            <div 
                className="login-container"
                onKeyDown={handleKeyDown}>
                <h1>Login</h1>
                <UserBox />
                <PassBox />
                <PassMsg
                    show={show}
                    msg={msg} />
            </div>
        </div>
    );
}