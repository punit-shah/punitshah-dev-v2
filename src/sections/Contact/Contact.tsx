import { useState } from 'react';
import Input from '../../components/Input';
import Section, { type CustomSectionProps } from '../../components/Section';
import classes from './Contact.module.css';

const Contact = ({ ...props }: CustomSectionProps) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  return (
    <Section
      containerClassName={classes.container}
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
          <Input label="Name" name="name" value={name} onChange={setName} />
          <Input label="Email" name="email" value={email} onChange={setEmail} />
          <Input
            label="Message"
            name="message"
            value={message}
            onChange={setMessage}
            type="textarea"
          />
          {/* <Button type="submit">Send</Button> */}
        </form>
      </div>
    </Section>
  );
};

export default Contact;
