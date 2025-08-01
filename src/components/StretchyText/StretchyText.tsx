import './StretchyText.css';

interface StretchyTextProps {
  children: React.ReactNode;
}

const StretchyText = ({ children }: StretchyTextProps) => {
  if (typeof children !== 'string') {
    return children;
  }

  const chars = children.split('').map((char, index) => (
    <span key={`${char}-${index}`} className="StretchyText-char">
      {char}
    </span>
  ));

  return <span className="StretchyText">{chars}</span>;
};

export default StretchyText;
