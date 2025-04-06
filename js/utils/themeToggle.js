// themeToggle.js

export function initThemeToggle() {
  const root = document.documentElement;
  const toggleButton = document.getElementById('themeToggle');

  // Apply stored theme or system preference
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    root.setAttribute('data-theme', savedTheme);
  } else {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)')
      .matches;
    root.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
  }

  // Set initial button icon
  updateButtonIcon(toggleButton, root.getAttribute('data-theme'));

  // Toggle theme on button click
  toggleButton.addEventListener('click', () => {
    const current = root.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    updateButtonIcon(toggleButton, next);
  });
}

function updateButtonIcon(button, theme) {
  button.textContent = theme === 'dark' ? '🌙' : '☀️';
}
