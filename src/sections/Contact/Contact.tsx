import classNames from 'classnames';
import { SendIcon } from 'lucide-react';
import { useContext, useState } from 'react';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Section, { type CustomSectionProps } from '../../components/Section';
import { DarkModeContext } from '../../contexts/DarkMode';
import classes from './Contact.module.css';
import { GitHubIcon, LinkedInIcon } from './icons';

const links = [
  {
    href: 'https://www.linkedin.com/in/punitshah/',
    label: 'LinkedIn',
    icon: <LinkedInIcon />,
  },
  {
    href: 'https://github.com/punit-shah',
    label: 'GitHub',
    icon: <GitHubIcon />,
  },
];

const Contact = ({ ...props }: CustomSectionProps) => {
  const { isDarkMode } = useContext(DarkModeContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  return (
    <Section
      containerClassName={classNames([
        classes.container,
        { [classes.dark]: isDarkMode },
      ])}
      title="Contact"
      id="contact"
      {...props}
    >
      <div className={classes.content}>
        <form
          className={classes.form}
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <p>
            Have a question or just want to say hi? I’d be happy to hear from
            you.
          </p>
          <Input
            label="Name"
            name="name"
            value={name}
            onChange={setName}
            required
          />
          <Input
            label="Email"
            name="email"
            value={email}
            onChange={setEmail}
            type="email"
            required
          />
          <Input
            label="Message"
            name="message"
            value={message}
            onChange={setMessage}
            type="textarea"
            required
            placeholder="Hey Punit, ..."
          />
          <Button type="submit">
            <SendIcon /> Send
          </Button>
        </form>

        <div className={classes.socials}>
          <p>Or find me on:</p>
          <ul className={classes.socialsList}>
            {links.map(({ href, label, icon }) => (
              <li key={href} className={classes.socialItem}>
                <a
                  className={classes.link}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {icon}
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
};

export default Contact;
