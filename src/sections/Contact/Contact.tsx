import classNames from 'classnames';
import { LoaderCircleIcon, SendIcon } from 'lucide-react';
import { useContext, useState } from 'react';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Section, { type CustomSectionProps } from '../../components/Section';
import { DarkModeContext } from '../../contexts/DarkMode';
import useApiRequest from '../../hooks/useApiRequest';
import CheckIcon from './CheckIcon';
import classes from './Contact.module.css';
import { GitHubIcon, LinkedInIcon } from './icons';

type ContactRequestBody = {
  name: string;
  email: string;
  message: string;
};

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

const getSubmitButtonContent = (isLoading: boolean, isSuccess: boolean) => {
  if (isLoading) {
    return (
      <>
        <LoaderCircleIcon className={classes.sendingIcon} /> Sending...
      </>
    );
  }
  if (isSuccess) {
    return (
      <>
        <CheckIcon /> Sent!
      </>
    );
  }
  return (
    <>
      <SendIcon /> Send
    </>
  );
};

const Contact = ({ ...props }: CustomSectionProps) => {
  const { isDarkMode } = useContext(DarkModeContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const { apiRequest, isLoading, isSuccess } =
    useApiRequest<ContactRequestBody>('/api/contact', 'POST');
  // todo: handle error state

  const isDisabled = isLoading || isSuccess;

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
            void apiRequest({ name, email, message });
          }}
        >
          <p>
            Have a question or just want to say hi? I’d be happy to hear from
            you.
          </p>
          <Input
            className={classes.input}
            label="Name"
            name="name"
            value={name}
            onChange={setName}
            required
            disabled={isDisabled}
          />
          <Input
            className={classes.input}
            label="Email"
            name="email"
            value={email}
            onChange={setEmail}
            type="email"
            required
            disabled={isDisabled}
          />
          <Input
            className={classes.input}
            label="Message"
            name="message"
            value={message}
            onChange={setMessage}
            type="textarea"
            required
            placeholder="Hey Punit, ..."
            disabled={isDisabled}
          />
          <Button type="submit" disabled={isDisabled}>
            {getSubmitButtonContent(isLoading, isSuccess)}
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
