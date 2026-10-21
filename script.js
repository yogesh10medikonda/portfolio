
document.addEventListener("DOMContentLoaded", () => {
  // 1. Dark / light theme toggle
  const themeBtn = document.getElementById("theme");

  function setTheme(theme) {
    document.body.classList.toggle("light", theme === "light");

    if (themeBtn) {
      themeBtn.textContent =
        theme === "light" ? "🌙 Dark mode" : "☀️ Light mode";
      themeBtn.setAttribute("aria-label", "Switch website theme");
    }

    try {
      localStorage.setItem("theme", theme);
    } catch (error) {
      // Theme still works if browser storage is unavailable.
    }
  }

  let savedTheme = "dark";

  try {
    savedTheme = localStorage.getItem("theme") || "dark";
  } catch (error) {
    // Use dark theme by default.
  }

  setTheme(savedTheme === "light" ? "light" : "dark");

  if (themeBtn) {
    themeBtn.addEventListener("click", () => {
      const nextTheme = document.body.classList.contains("light")
        ? "dark"
        : "light";

      setTheme(nextTheme);
    });
  }

  // 2. Mobile navigation
  const menuBtn = document.getElementById("menu-toggle");
  const nav = document.getElementById("nav-links");

  if (menuBtn && nav) {
    menuBtn.setAttribute("aria-expanded", "false");

    menuBtn.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("open");

      menuBtn.setAttribute("aria-expanded", String(isOpen));
      menuBtn.textContent = isOpen ? "✕ Close" : "☰ Menu";
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("open");
        menuBtn.setAttribute("aria-expanded", "false");
        menuBtn.textContent = "☰ Menu";
      });
    });
  }

  // 3. Interactive skills
  const skills = document.querySelectorAll(".skill");
  const skillInfo = document.getElementById("skill-info");

  skills.forEach((skill) => {
    // Add an icon if the button has a data-icon attribute.
    const icon = skill.dataset.icon;

    if (icon && !skill.querySelector("img")) {
      const img = document.createElement("img");

      img.src =
        `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${icon}/${icon}-original.svg`;

      img.alt = "";
      img.loading = "lazy";

      img.onerror = () => {
        img.remove();
      };

      skill.prepend(img);
    }

    skill.addEventListener("click", () => {
      skills.forEach((item) => {
        item.classList.remove("active");
        item.setAttribute("aria-pressed", "false");
      });

      skill.classList.add("active");
      skill.setAttribute("aria-pressed", "true");

      if (skillInfo) {
        const skillName = skill.dataset.name || skill.textContent.trim();
        const description =
          skill.dataset.info || "I am developing my practical skills in this technology.";

        skillInfo.textContent = `> ${skillName}: ${description}`;
      }
    });

    if (skill.tagName === "BUTTON") {
      skill.setAttribute("aria-pressed", "false");
    }
  });

  // 4. Contact form validation
  const form = document.getElementById("form");
  const status = document.getElementById("status");

  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const nameInput =
        document.getElementById("fname") ||
        document.getElementById("name");

      const emailInput =
        document.getElementById("femail") ||
        document.getElementById("email");

      const messageInput =
        document.getElementById("fmsg") ||
        document.getElementById("message");

      if (!nameInput || !emailInput || !messageInput) {
        if (status) {
          status.textContent =
            "The contact form fields could not be found. Please check their HTML IDs.";
        }
        return;
      }

      const name = nameInput.value.trim();
      const email = emailInput.value.trim();
      const message = messageInput.value.trim();

      if (name.length < 2) {
        if (status) status.textContent = "Please enter your name.";
        nameInput.focus();
        return;
      }

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailPattern.test(email)) {
        if (status) status.textContent = "Please enter a valid email address.";
        emailInput.focus();
        return;
      }

      if (message.length < 5) {
        if (status) status.textContent = "Please enter a message of at least 5 characters.";
        messageInput.focus();
        return;
      }

      // Open the visitor's email application with the message filled in.
      // This does not send an email automatically.
      if (status) {
        status.textContent = "Opening your email application...";
      }

      const recipient = "yogeshmedikonda10@gmail.com";
      const subject = `Portfolio message from ${name}`;
      const body =
        `${message}\n\nFrom: ${name}\nReply email: ${email}`;

      const mailto =
        `mailto:${recipient}?subject=${encodeURIComponent(subject)}` +
        `&body=${encodeURIComponent(body)}`;

      window.location.href = mailto;
    });
  }

  // 5. Automatically update the footer year
  const yearElement = document.getElementById("year");

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
});
