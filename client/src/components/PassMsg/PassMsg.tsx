import './PassMsg.css';

interface MassMsgProps {
    show: boolean;
    msg: string;
}

export default function PassMsg({show, msg} : MassMsgProps) {
    return (
        <p
            className="msg"
            style={{
            color: msg === "login successful" ? "#8ec07c" : "#fb4934",
            }}
        >
        {show && msg}
        </p>
    );
}