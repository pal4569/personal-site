interface CreateHighlightProps {
  highlightTop: string;
}

export default function CreateHighlight({ highlightTop }: CreateHighlightProps) {

  return (
    <div 
      className="highlight" 
      style={{ top: highlightTop, position: "absolute" }} 
    />
  );
}
