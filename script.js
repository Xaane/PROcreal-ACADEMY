const navToggle = document.querySelector(".nav-toggle");
const nav = document.querySelector("[data-nav]");

const setNavigationState = (open) => {
  if (!navToggle || !nav) return;

  nav.classList.toggle("is-open", open);
  navToggle.setAttribute("aria-expanded", String(open));
  document.body.classList.toggle("menu-open", open);

  navToggle.querySelectorAll(".nav-toggle-bar").forEach((bar, index) => {
    bar.style.transform = open
      ? index === 1
        ? "scaleX(0)"
        : `translateY(${index === 0 ? 7 : -7}px) rotate(${index === 0 ? 45 : -45}deg)`
      : "";
  });
};

const toggleNavigation = () => {
  if (!navToggle || !nav) return;
  const isOpen = nav.classList.contains("is-open");
  setNavigationState(!isOpen);
};

if (navToggle && nav) {
  navToggle.addEventListener("click", toggleNavigation);

  nav.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      if (nav.classList.contains("is-open")) {
        setNavigationState(false);
      }
    });
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 960 && nav.classList.contains("is-open")) {
      setNavigationState(false);
    }
  });
}

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const targetId = link.getAttribute("href").slice(1);
    if (!targetId) return;

    const target = document.getElementById(targetId);
    if (target) {
      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

const filterGroup = document.querySelector("[data-filter-group]");
const courseCards = document.querySelectorAll(".courses-grid .card");

if (filterGroup && courseCards.length) {
  filterGroup.addEventListener("click", (event) => {
    const button = event.target.closest(".filter-btn");
    if (!button) return;

    filterGroup.querySelectorAll(".filter-btn").forEach((btn) => {
      btn.classList.toggle("is-active", btn === button);
    });

    const filter = button.dataset.filter ?? "all";
    courseCards.forEach((card) => {
      const { category = "", status = "" } = card.dataset;
      const shouldShow =
        filter === "all" ||
        (filter === "progress" && status === "progress") ||
        (filter === "upcoming" && status === "upcoming") ||
        (filter === "design" && category === "design") ||
        (filter === "calculation" && category === "calculation");

      card.classList.toggle("is-hidden", !shouldShow);
    });
  });
}
