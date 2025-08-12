let previousMessage = '';

type MessageOptions = {
  isDarkMode?: boolean;
};

export const getRandomMessage = ({
  isDarkMode,
}: MessageOptions = {}): string => {
  const messages = [
    'Hey! Click me again, I dare you.',
    "I'm not AI... or am I?",
    'This website is powered by magic.',
    "Clicking me won't make you rich.",
    "I'm just pixels on your screen, not a genie.",
    'I can do tricks, but not the ones you think.',
    'Punit is such a nerd.',
    'Punit built me specifically to impress you.',
    "Clicking me won't solve your problems, but it might make you smile.",
    'Hello, human. Hope you enjoyed clicking me.',
    'This counts as social interaction.',
    "I'm just a little guy.",
    "Don't make me blush.",
    'Need something?',
    "I'm not supposed to tell you this, but I'm actually sentient.",
    "My job is to glow and look cute. I'm doing my best!",
    "You're keeping me busy, huh?",
    "Careful, I'm ticklish.",
    "You're in a conversation with an orb. Reflect on that.",
    "Some of these lines were written at 3am. Don't judge.",
    'Low latency, high cuteness.',
    'Hover detected. Engaging charm routine.',
    'Have you tried interacting with some of those colourful words over there?',
    'Have you figured out how to change my colour yet?',
    'A long time ago, clicking on me would have crashed your browser.',
    "Punit spent way too long building me, but I'm so glad he did.",
  ];

  const wasAccentColorChanged =
    document.documentElement.style.getPropertyValue('--color-accent-1') !==
    'var(--color-purple-1)';
  if (wasAccentColorChanged) {
    messages.push(
      'You picked this colour? Excellent choice.',
      'Colour vibes: immaculate.',
      'Your taste? Flawless.',
    );
  }

  if (isDarkMode) {
    messages.push(
      "I look good in dark mode, don't I?",
      'Dark mode is the best mode.',
      'Have you seen what I look like in light mode?',
    );
  } else {
    messages.push(
      "I look good in light mode, don't I?",
      'Have you seen what I look like in dark mode?',
    );
  }

  let message = '';

  do {
    const randomIndex = Math.floor(Math.random() * messages.length);
    message = messages[randomIndex];
  } while (message === previousMessage);

  previousMessage = message;
  return message;
};
