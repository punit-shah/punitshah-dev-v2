const isSystemDarkMode = window.matchMedia(
  '(prefers-color-scheme: dark)',
).matches;

if (isSystemDarkMode) {
  document.documentElement.dataset.darkMode = '';
} else {
  delete document.documentElement.dataset.darkMode;
}
