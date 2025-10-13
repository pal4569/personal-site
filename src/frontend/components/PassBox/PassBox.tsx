import { useState, useRef, useEffect } from 'react';
import './PassBox.css';

export default function PassBox() {
  const [actualValue, setActualValue] = useState('');
  const divRef = useRef<HTMLDivElement | null>(null);

  const handleInput = () => {
    const el = divRef.current;
    if (!el) return;

    const text = el.textContent ?? '';

    if (text.length < actualValue.length) {
      setActualValue(actualValue.slice(0, text.length));
    } else {
      const newChars = text.slice(actualValue.length);
      setActualValue(prev => prev + newChars);
    }

    el.textContent = '•'.repeat(text.length);

    const range = document.createRange();
    const sel = window.getSelection();
    if (sel && el) {
      range.selectNodeContents(el);
      range.collapse(false);
      sel.removeAllRanges();
      sel.addRange(range);
    }
  };

  useEffect(() => {
    if (divRef.current) divRef.current.textContent = '';
  }, []);

  return (
    <div
      ref={divRef}
      className="passbox"
      contentEditable
      onInput={handleInput}
      suppressContentEditableWarning={true}
      spellCheck={false}
    />
  );
}
