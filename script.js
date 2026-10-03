// Dark / light mode
const body = document.body;
const themeBtn = document.getElementById('theme');

if (localStorage.getItem('theme') === 'light') {
  body.classList.add('light');
  themeBtn.textContent = 'Dark mode';
}

themeBtn.addEventListener('click', () => {
  const isLight = body.classList.toggle('light');
  themeBtn.textContent = isLight ? 'Dark mode' : 'Light mode';
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
});

// Skill boxes: show a line about the selected skill
const skills = document.querySelectorAll('.skill');
const info = document.getElementById('skill-info');

skills.forEach((btn) => {
  btn.addEventListener('click', () => {
    skills.forEach((s) => s.classList.remove('active'));
    btn.classList.add('active');
    info.textContent = btn.textContent + ': ' + btn.dataset.info;
  });
});

// Contact form validation
const form = document.getElementById('form');
const status = document.getElementById('status');

function setError(id, message) {
  document.getElementById(id + '-err').textContent = message;
  const field = document.getElementById(id);
  if (field) field.classList.toggle('bad', Boolean(message));
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  status.textContent = '';

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const gender = form.querySelector('input[name="gender"]:checked');
  let ok = true;

  if (name.length < 2) {
    setError('name', 'Enter your name.');
    ok = false;
  } else {
    setError('name', '');
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    setError('email', 'Enter a valid email address.');
    ok = false;
  } else {
    setError('email', '');
  }

  if (!gender) {
    setError('gender', 'Select one option.');
    ok = false;
  } else {
    setError('gender', '');
  }

  if (!ok) return;

  status.textContent = 'Thank you, ' + name + '. Your details were submitted.';
  form.reset();
});