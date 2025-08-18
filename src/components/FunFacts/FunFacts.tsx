import classes from './FunFacts.module.css';

const FunFacts = () => {
  return (
    <div className={classes.funFacts}>
      <h3 className={classes.title}>Beyond the code</h3>

      <ul className={classes.funFactsList}>
        <li>
          🧗‍♂️ Either climbing walls or dramatically falling off them (proof lives{' '}
          <a
            href="https://www.instagram.com/punclimbs/"
            target="_blank"
            rel="noopener noreferrer"
          >
            here
          </a>
          ).
        </li>
        <li>
          🤘 If there's a heavy gig in London, you'll probably find me in the
          mosh pit making questionable life choices.
        </li>
        <li>
          ☕️ Coffee snobbery is my love language - a carefully brewed V60 at
          home, or a flat white in the wild.
        </li>
        <li>
          🎮 I unwind by wandering around Hyrule and{' '}
          <button
            type="button"
            className={classes.korokButton}
            onClick={() => {
              // todo: "Ya-ha-ha!"
            }}
          >
            collecting Korok seeds
          </button>
          .
        </li>
      </ul>
    </div>
  );
};

export default FunFacts;
