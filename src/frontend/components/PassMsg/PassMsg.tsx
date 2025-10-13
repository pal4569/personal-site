import './PassMsg.css';

interface MassMsgProps {
    show: boolean;
    msg: string;
}

export default function PassMsg({show, msg} : MassMsgProps) {
    return (
        <p className="msg">{show && msg}</p>
    );
}