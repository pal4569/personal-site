import './PassBox.css';

interface PassBoxProps {
  value: string;
  onChange: (value: string) => void;
}

export default function PassBox({ value, onChange }: PassBoxProps) {
  return (
    <input
      type="password"
      className="passbox"
      placeholder="Password"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
