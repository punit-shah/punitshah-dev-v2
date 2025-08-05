import useSound from '../../hooks/useSound';
import classes from './StretchyText.module.css';
import hover from './hover.mp3';

type StretchyTextProps = {
  children: React.ReactNode;
};

const StretchyText = ({ children }: StretchyTextProps) => {
  const [playHover] = useSound(hover);

  if (typeof children !== 'string') {
    return children;
  }

  const chars = children.split('').map((char, index) => (
    <span
      key={`${char}-${index}`}
      className={classes.char}
      onMouseEnter={() => playHover()}
    >
      {char}
    </span>
  ));

  return <span className={classes.container}>{chars}</span>;
};

export default StretchyText;
