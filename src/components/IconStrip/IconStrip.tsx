import classNames from 'classnames';
import type { ReactNode } from 'react';
import classes from './IconStrip.module.css';

export type IconStripItem = {
  icon: ReactNode;
  label: string;
};

type IconStripProps = {
  items: IconStripItem[];
  className?: string;
};

const IconStrip = ({ items, className }: IconStripProps) => (
  <ul className={classNames(classes.iconStrip, className)}>
    {items.map(({ icon, label }) => (
      <li key={label} className={classes.iconStripItem}>
        {icon} <span>{label}</span>
      </li>
    ))}
  </ul>
);

export default IconStrip;
