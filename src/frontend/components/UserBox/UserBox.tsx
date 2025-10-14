import './UserBox.css';

interface UserBoxProps {
  value: string;
  onChange: (value: string) => void;
}

export default function UserBox({ value, onChange }: UserBoxProps) {
    return (
        <input
        type="text"
        className="userbox"
        placeholder="Username"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        />
    )
}