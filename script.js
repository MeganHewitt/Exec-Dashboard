const themeSwitch = document.getElementById('themeSwitch');
const root = document.documentElement;

function applyTheme(theme) {
  if (theme === 'dark') {
    document.body.classList.add('dark');
    themeSwitch.classList.add('active');
    themeSwitch.setAttribute('aria-pressed', 'true');
  } else {
    document.body.classList.remove('dark');
    themeSwitch.classList.remove('active');
    themeSwitch.setAttribute('aria-pressed', 'false');
  }
}

function getStoredTheme() {
  return localStorage.getItem('preferred-theme');
}

function setStoredTheme(theme) {
  localStorage.setItem('preferred-theme', theme);
}

function detectSystemTheme() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

const savedTheme = getStoredTheme();
const initialTheme = savedTheme || detectSystemTheme();
applyTheme(initialTheme);

themeSwitch.addEventListener('click', () => {
  const nextTheme = document.body.classList.contains('dark') ? 'light' : 'dark';
  applyTheme(nextTheme);
  setStoredTheme(nextTheme);
});
