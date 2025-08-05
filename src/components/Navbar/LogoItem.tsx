import classNames from 'classnames';
import { useState } from 'react';
import Logo from '../Logo';
import classes from './Navbar.module.css';

const LogoItem = () => {
  const [isLogoHovered, setIsLogoHovered] = useState(false);
  const [isLogoFocusVisible, setIsLogoFocusVisible] = useState(false);

  return (
    <a
      href="#cover"
      className={classNames(classes.link, classes.logo)}
      onClick={(event) => {
        event.preventDefault();
        const coverElement = document.querySelector('#cover');
        coverElement?.scrollIntoView({ behavior: 'smooth' });
      }}
      onMouseEnter={() => {
        setIsLogoHovered(true);
      }}
      onMouseLeave={() => {
        setIsLogoHovered(false);
      }}
      onFocus={(event) => {
        if (event.currentTarget.matches(':focus-visible')) {
          setIsLogoFocusVisible(true);
        }
      }}
      onBlur={() => {
        setIsLogoFocusVisible(false);
      }}
      aria-label="Scroll to top"
    >
      <Logo isHovered={isLogoHovered || isLogoFocusVisible} />
    </a>
  );
};

export default LogoItem;
