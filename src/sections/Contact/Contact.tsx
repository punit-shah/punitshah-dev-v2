import classNames from 'classnames';
import { useContext, useEffect, useState } from 'react';
import FormButton from '../../components/FormButton';
import FormMessage from '../../components/FormMessage';
import Input from '../../components/Input';
import Section, { type CustomSectionProps } from '../../components/Section';
import { DarkModeContext } from '../../contexts/DarkMode';
import useApiRequest from '../../hooks/useApiRequest';
import useSound from '../../hooks/useSound';
import classes from './Contact.module.css';
import { GitHubIcon, LinkedInIcon } from './icons';
import success from './success.mp3';

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

const Contact = ({ ...props }: CustomSectionProps) => {
  const { isDarkMode } = useContext(DarkModeContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const { apiRequest, isLoading, isError, isSuccess } =
    useApiRequest<ContactRequestBody>('/api/contact', 'POST');
  const [playSuccess] = useSound(success);

  useEffect(() => {
    if (isSuccess) {
      playSuccess();
    }
  }, [isSuccess, playSuccess]);

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
            disabled={isLoading || isSuccess}
          />
          <Input
            className={classes.input}
            label="Email"
            name="email"
            value={email}
            onChange={setEmail}
            type="email"
            required
            disabled={isLoading || isSuccess}
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
            disabled={isLoading || isSuccess}
          />
          <FormButton isLoading={isLoading} isSuccess={isSuccess} />

          <FormMessage
            type={isError ? 'error' : isSuccess ? 'success' : 'hidden'}
          >
            {isError &&
              'There was a problem sending your message - please try again.'}
            {isSuccess &&
              "Thanks for the message! I'll get back to you as soon as I can."}
          </FormMessage>
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
