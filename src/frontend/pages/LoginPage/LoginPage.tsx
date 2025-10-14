import './LoginPage.css';
import UserBox from '../../components/UserBox/UserBox';
import PassBox from '../../components/PassBox/PassBox';
import PassMsg from '../../components/PassMsg/PassMsg';
import { useState } from 'react';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const [msg, setMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
        const res = await fetch('http://localhost:5000/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: "include",
            body: JSON.stringify({ username, password }),
        });

        if (res.ok) {
            setMsg('login successful');
            setShow(true);
            console.log('Login success');
        } 
        else {
            setMsg(`login failed`);
            setShow(true);
            console.error('Login failed');
        }
    }
    catch (err) {
        console.error('Fetch error:', err);
        setMsg('Network error');
        setShow(true);
    }
  };

  return (
    <div className="login-wrapper">
      <form className="login-container" onSubmit={handleSubmit}>
        <h1>Login</h1>
        <UserBox value={username} onChange={setUsername} />
        <PassBox value={password} onChange={setPassword} />
        <PassMsg show={show} msg={msg} />
        <button 
            type="submit" 
            className="login-btn">Submit</button>
      </form>
    </div>
  );
}
