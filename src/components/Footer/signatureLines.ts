const signatureLines = [
  'Transmission complete. Thanks for scrolling.',
  'End of line. -Punit',
  'Scroll journey complete 🚀',
  'Crafted with ❤️ by Punit',
  'Handcrafted pixels & code by Punit ❤️',
  'The end. Or maybe the beginning?',
  "That's all, folks! 👋",
  '🎉 Congrats, you made it to the end!',
  'This website runs on good vibes ✨',
  'Just a footer, sitting pretty.',
];

const getSignatureLine = () =>
  signatureLines[Math.floor(Math.random() * signatureLines.length)];

export default getSignatureLine;
