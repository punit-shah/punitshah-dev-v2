import { useEffect, useState } from 'react';
import classes from './Footer.module.css';
import getSignatureLine from './signatureLines';

const Footer = () => {
  const [signatureLine, setSignatureLine] = useState('');

  useEffect(() => {
    setSignatureLine(getSignatureLine());
  }, []);

  return (
    <footer className={classes.footer}>
      <p className={classes.footerText}>{signatureLine}</p>
    </footer>
  );
};

export default Footer;
