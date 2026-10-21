// Dark / light mode
const themeBtn = document.getElementById('theme');
try {
  if (localStorage.getItem('theme') === 'light') {
    document.body.classList.add('light');
    themeBtn.textContent = 'Dark mode';
  }
} catch (e) {}
themeBtn.addEventListener('click', () => {
  const light = document.body.classList.toggle('light');
  themeBtn.textContent = light ? 'Dark mode' : 'Light mode';
  try { localStorage.setItem('theme', light ? 'light' : 'dark'); } catch (e) {}
});

// Skills: add icons, show a line about the selected skill
const skills = document.querySelectorAll('.skill');
const info = document.getElementById('skill-info');
skills.forEach((btn) => {
  const icon = btn.dataset.icon;
  if (icon) {
    const img = document.createElement('img');
    img.src = 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/' + icon + '/' + icon + '-original.svg';
    img.alt = '';
    btn.prepend(img);
  }
  btn.addEventListener('click', () => {
    skills.forEach((s) => s.classList.remove('active'));
    btn.classList.add('active');
    info.textContent = '> ' + btn.textContent.trim() + ': ' + btn.dataset.info;
  });
});

// Contact form: validate, then open the visitor's email app with the message filled in
const form = document.getElementById('form');
const status = document.getElementById('status');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('fname').value.trim();
  const email = document.getElementById('femail').value.trim();
  const msg = document.getElementById('fmsg').value.trim();
  if (name.length < 2) { status.textContent = 'Enter your name.'; return; }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { status.textContent = 'Enter a valid email address.'; return; }
  if (msg.length < 5) { status.textContent = 'Write a short message.'; return; }
  status.textContent = 'Opening your email app...';
  window.location.href = 'mailto:yogeshmedikonda10@gmail.com?subject=' +
    encodeURIComponent('Portfolio message from ' + name) +
    '&body=' + encodeURIComponent(msg + '\n\n' + name + ' (' + email + ')');
});