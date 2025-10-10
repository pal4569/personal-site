import './CreatePreview.css';

interface PreviewProps {
  lines: string[];
}

export default function CreatePreview({ lines }: PreviewProps) {
    return (
        <div className="preview">
                {lines.map((line, i) => {
                const match = line.match(/^(#{1,6})\s+(.*)/);
                if (match) {
                    const level = match[1].length;
                    const content = match[2];
                    return (
                    <div key={i} className={`header${level}`}>
                        {content}
                    </div>
                    );
                }

                else if (line.startsWith("- ")) {                    const content = line.split("- ")[1];
                    return (
                    <div key={i} className={`bullet`}>
                        {content}
                    </div>
                    )
                }

                if (line.trim() === "") {
                    return <div key={i} className="i-hate-css-so-much" />;
                }
                return <div key={i}>{line}</div>;
                })}
            </div>
    );
}