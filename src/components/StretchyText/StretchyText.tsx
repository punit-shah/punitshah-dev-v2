import classes from './StretchyText.module.css';

interface StretchyTextProps {
  children: React.ReactNode;
}

const StretchyText = ({ children }: StretchyTextProps) => {
  if (typeof children !== 'string') {
    return children;
  }

  const chars = children.split('').map((char, index) => (
    <span key={`${char}-${index}`} className={classes.char}>
      {char}
    </span>
  ));

  return <span className={classes.container}>{chars}</span>;
};

export default StretchyText;
