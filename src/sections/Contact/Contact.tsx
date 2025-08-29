import Form, {
  type FormField,
  type FormStatusMessages,
} from '../../components/Form';
import Section, { type CustomSectionProps } from '../../components/Section';
import classes from './Contact.module.css';
import { GitHubIcon, LinkedInIcon } from './icons';

const fields: FormField[] = [
  { label: 'Name', name: 'name', required: true },
  { label: 'Email', name: 'email', type: 'email', required: true },
  {
    label: 'Message',
    name: 'message',
    type: 'textarea',
    required: true,
    placeholder: 'Hey Punit, ...',
  },
];

const statusMessages: FormStatusMessages = {
  error: 'There was a problem sending your message - please try again.',
  success: "Thanks for the message! I'll get back to you as soon as I can.",
};

const links = [
  {
    href: 'https://www.linkedin.com/in/punit-shah/',
    label: 'LinkedIn',
    icon: <LinkedInIcon />,
  },
  {
    href: 'https://github.com/punit-shah',
    label: 'GitHub',
    icon: <GitHubIcon />,
  },
];

const Contact = ({ ...props }: CustomSectionProps) => (
  <Section title="Contact" id="contact" {...props}>
    <div className={classes.container}>
      <Form
        fields={fields}
        apiEndpoint="/api/contact"
        statusMessages={statusMessages}
        className={classes.form}
      >
        <p>
          Have a question or just want to say hi? I’d be happy to hear from you.
        </p>
      </Form>

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

export default Contact;
