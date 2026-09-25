const header = document.querySelector("[data-header]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const navigation = document.querySelector("[data-nav]");
const navLinks = [...document.querySelectorAll(".primary-nav a")];
const sections = [...document.querySelectorAll("main section[id]")];

const closeMenu = () => {
  menuToggle.setAttribute("aria-expanded", "false");
  navigation.classList.remove("is-open");
  document.body.classList.remove("menu-open");
};

menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  navigation.classList.toggle("is-open", !isOpen);
  document.body.classList.toggle("menu-open", !isOpen);
});

navLinks.forEach((link) => link.addEventListener("click", closeMenu));

window.addEventListener("resize", () => {
  if (window.innerWidth > 900) closeMenu();
});

window.addEventListener("scroll", () => {
  header.classList.toggle("is-scrolled", window.scrollY > 16);
}, { passive: true });

const revealTargets = document.querySelectorAll(
  ".hero-copy, .terminal-card, .section-heading, .profile-copy, .signal-card, .project-panel, .timeline-item, .toolkit-grid article, .contact-grid"
);

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12 });

  revealTargets.forEach((target) => {
    target.dataset.reveal = "";
    revealObserver.observe(target);
  });

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) => {
        link.classList.toggle("is-active", link.getAttribute("href") === `#${entry.target.id}`);
      });
    });
  }, { rootMargin: "-36% 0px -56% 0px", threshold: 0 });

  sections.forEach((section) => sectionObserver.observe(section));
} else {
  revealTargets.forEach((target) => target.classList.add("is-visible"));
}
