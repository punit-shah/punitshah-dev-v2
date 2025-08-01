import ColorSwitcher from '../../components/ColorSwitcher';
import Section from '../../components/Section';
import StretchyText from '../../components/StretchyText';
import './Cover.css';

const Cover = () => (
  <Section className="Cover">
    <div className="Cover-intro">
      <h1 className="Cover-hey">
        Hey, I'm <span className="Cover-name">Punit</span>
      </h1>
      <p className="Cover-description">
        Frontend engineer focused on
        <br />
        <ColorSwitcher>function</ColorSwitcher> and{' '}
        <StretchyText>feel</StretchyText>.
      </p>
    </div>
  </Section>
);

export default Cover;
