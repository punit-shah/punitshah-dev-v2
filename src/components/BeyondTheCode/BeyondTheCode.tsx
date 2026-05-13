import { AnimatePresence } from 'motion/react';
import { useState } from 'react';
import classes from './BeyondTheCode.module.css';
import KorokOrb from './KorokOrb';

const BeyondTheCode = () => {
  const [isKorokOrbVisible, setIsKorokOrbVisible] = useState(false);

  return (
    <div className={classes.container}>
      <div className={classes.funFacts}>
        <h3 className={classes.title}>Beyond the code</h3>

        <ul className={classes.funFactsList}>
          <li>
            🧗‍♂️ I climb a fair bit, mostly indoors - big fan of jumpy, dynamic,
            coordination moves! ig:{' '}
            <a
              href="https://www.instagram.com/punclimbs"
              target="_blank"
              rel="noopener noreferrer"
            >
              @punclimbs
            </a>
          </li>
          <li>
            🤘 If there's a metalcore gig in London, you'll probably find me in
            the mosh pit. Fave bands right now: Spiritbox, Motionless in White,
            Dayseeker.
          </li>
          <li>
            ☕️ Weirdly passionate about coffee. Brew of choice: a V60 pour-over
            with the most interesting beans I can find.
          </li>
          <li>
            🎮 I unwind by wandering around Hyrule and{' '}
            <button
              type="button"
              className={classes.korokButton}
              onClick={() => {
                setIsKorokOrbVisible(true);
              }}
            >
              collecting Korok seeds
            </button>
            .
          </li>
        </ul>
      </div>

      <AnimatePresence>
        {isKorokOrbVisible && (
          <KorokOrb onComplete={() => setIsKorokOrbVisible(false)} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default BeyondTheCode;
