let portfolioData = {};

async function loadPortfolioData() {
  try {
    const response = await fetch("data/config.json");
    portfolioData = await response.json();
    loadTheme();
    populateContent();
  } catch (error) {
    console.error("Error loading portfolio data:", error);
  }
}

// Content population functions
function populateContent() {
  populateNavigation();
  populateHeroSection();
  populateAboutSection();
  populateSkillsSection();
  populateProjectsSection();
  populateEducationSection();
  populateExperienceSection();
  populateContactSection();
  populateFooter();
}

function populateNavigation() {
  const logoName = document.getElementById("logo-name");
  const navLinks = document.getElementById("nav-links");

  if (logoName) {
    logoName.textContent =
      portfolioData.personal.name.split(" ")[1] || portfolioData.personal.name;
  }

  if (navLinks && portfolioData.sections) {
    navLinks.innerHTML = portfolioData.sections
      .map(
        (section) =>
          `<a href="#${section.id}" class="nav-link">${section.title}</a>`
      )
      .join("");
  }
}

function populateHeroSection() {
  const heroTitle = document.getElementById("hero-title");
  const heroSubtitle = document.getElementById("hero-subtitle");
  const socialLinks = document.getElementById("hero-social");

  if (heroTitle) {
    heroTitle.innerHTML = `Hello, I'm <span class="text-teal-accent">${portfolioData.personal.name}</span>`;
  }

  if (heroSubtitle) {
    heroSubtitle.textContent = portfolioData.personal.description;
  }

  if (socialLinks && portfolioData.contact.social) {
    socialLinks.innerHTML = Object.entries(portfolioData.contact.social)
      .map(([platform, url]) => {
        const icons = {
          github:
            '<path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>',
          linkedin:
            '<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>',
          email:
            '<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>',
        };
        return `<a href="${url}" class="social-link">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    ${icons[platform] || icons.email}
                </svg>
            </a>`;
      })
      .join("");
  }
}

function populateAboutSection() {
  const aboutIntro = document.getElementById("about-intro");
  const aboutDetails = document.getElementById("about-details");
  const aboutPhilosophy = document.getElementById("about-philosophy");
  const quickFacts = document.getElementById("quick-facts");
  const features = document.getElementById("features");

  if (aboutIntro) aboutIntro.textContent = portfolioData.personal.about.intro;
  if (aboutDetails)
    aboutDetails.textContent = portfolioData.personal.about.details;
  if (aboutPhilosophy)
    aboutPhilosophy.textContent = portfolioData.personal.about.philosophy;

  if (quickFacts && portfolioData.personal.about.quickFacts) {
    quickFacts.innerHTML = portfolioData.personal.about.quickFacts
      .map(
        (fact) =>
          `<div style="display: flex; justify-content: space-between; align-items: center;">
                <span class="text-muted-foreground">${fact.label}:</span>
                <span class="font-medium">${fact.value}</span>
            </div>`
      )
      .join("");
  }

  if (features && portfolioData.features) {
    const iconMap = {
      code: '<polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>',
      star: '<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>',
      zap: '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>',
      users:
        '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
    };

    features.innerHTML = portfolioData.features
      .map(
        (feature) =>
          `<div class="card animate-on-scroll text-center">
                <div class="card-content p-6">
                    <div style="width: 3rem; height: 3rem; background-color: rgba(8, 145, 178, 0.1); border-radius: 0.75rem; display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem;">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--teal-accent)" stroke-width="2">
                            ${iconMap[feature.icon]}
                        </svg>
                    </div>
                    <h3 class="mb-3">${feature.title}</h3>
                    <p class="text-muted-foreground text-sm">${
                      feature.description
                    }</p>
                </div>
            </div>`
      )
      .join("");
  }
}

function populateSkillsSection() {
  const frontendSkills = document.getElementById("frontend-skills");
  const backendSkills = document.getElementById("backend-skills");
  const databaseSkills = document.getElementById("database-skills");
  const toolsSkills = document.getElementById("tools-skills");
  const additionalSkills = document.getElementById("additional-skills");

  function createSkillItem(skill) {
    return `
            <div class="skill-item" style="margin-bottom: 0.5rem;">
                <div class="skill-name">
                    <span class="skill-icon" style="margin-right: 0.5rem;">${skill.icon}</span>
                    <span style="font-size: 0.875rem;">${skill.name}</span>
                </div>
            </div>
        `;
  }

  if (frontendSkills) {
    frontendSkills.innerHTML = portfolioData.skills.frontend
      .map(createSkillItem)
      .join("");
  }

  if (backendSkills) {
    backendSkills.innerHTML = portfolioData.skills.backend
      .map(createSkillItem)
      .join("");
  }

  if (databaseSkills && portfolioData.skills.database) {
    databaseSkills.innerHTML = portfolioData.skills.database
      .map(createSkillItem)
      .join("");
  }

  if (toolsSkills) {
    toolsSkills.innerHTML = portfolioData.skills.tools
      .map(createSkillItem)
      .join("");
  }

  if (additionalSkills) {
    additionalSkills.innerHTML = portfolioData.skills.additional
      .map((skill) => `<span class="badge">${skill}</span>`)
      .join("");
  }
}

function populateProjectsSection() {
  const projectsContainer = document.getElementById("projects-container");

  if (projectsContainer && portfolioData.projects) {
    const showImages = portfolioData.settings?.showProjectImages !== false;
    const placeholderImage =
      portfolioData.settings?.projectImagePlaceholder ||
      "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=600&h=400&fit=crop&auto=format&q=80";

    projectsContainer.innerHTML = portfolioData.projects
      .map((project) => {
        // Generate buttons only if links are not "#"
        const buttons = [];
        if (project.links.demo && project.links.demo !== "#") {
          buttons.push(
            `<a href="${project.links.demo}" class="btn btn-outline" style="flex: 1;">Live Demo</a>`
          );
        }
        if (project.links.github && project.links.github !== "#") {
          buttons.push(
            `<a href="${project.links.github}" class="btn btn-outline">GitHub</a>`
          );
        }

        return `<div class="card animate-on-scroll" style="display: flex; flex-direction: column;">
                ${
                  showImages
                    ? `<img src="${project.image || placeholderImage}" alt="${
                        project.title
                      }" class="project-image">`
                    : ""
                }
                <div class="card-header">
                    <h3 class="card-title">${project.title}</h3>
                </div>
                <div class="card-content" style="display: flex; flex-direction: column; flex: 1;">
                    <div style="flex: 1;">
                        <p class="text-muted-foreground text-sm mb-4">${
                          project.description
                        }</p>
                        <div class="flex flex-wrap gap-2 mb-4">
                            ${project.technologies
                              .map(
                                (tech) =>
                                  `<span class="badge badge-outline">${tech}</span>`
                              )
                              .join("")}
                        </div>
                    </div>
                    ${
                      buttons.length > 0
                        ? `<div class="flex gap-2" style="margin-top: auto;">
                        ${buttons.join("")}
                    </div>`
                        : ""
                    }
                </div>
            </div>`;
      })
      .join("");
  }
}

function populateEducationSection() {
  const educationContainer = document.getElementById("education-container");

  if (educationContainer && portfolioData.education) {
    educationContainer.innerHTML = portfolioData.education
      .map(
        (edu) =>
          `<div class="timeline-item animate-on-scroll">
                <div class="timeline-dot"></div>
                <div class="card">
                    <div class="card-content p-6">
                        <div class="flex justify-between items-start mb-4">
                            <div>
                                <h3 class="font-semibold text-lg">${
                                  edu.degree
                                }</h3>
                                <p class="text-teal-accent font-medium">${
                                  edu.institution
                                }</p>
                            </div>
                            <div class="text-right">
                                <p class="text-sm font-medium">${edu.period}</p>
                                <p class="text-xs text-muted-foreground">${
                                  edu.location
                                }</p>
                                ${
                                  edu.status
                                    ? `<span class="badge" style="margin-top: 0.5rem;">${edu.status}</span>`
                                    : ""
                                }
                                ${
                                  edu.gpa
                                    ? `<p class="text-xs text-muted-foreground">GPA: ${edu.gpa}</p>`
                                    : ""
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>`
      )
      .join("");
  }
}

function populateExperienceSection() {
  const experienceContainer = document.getElementById("experience-container");

  if (experienceContainer && portfolioData.experience) {
    experienceContainer.innerHTML = portfolioData.experience
      .map(
        (exp) =>
          `<div class="timeline-item animate-on-scroll">
                <div class="timeline-dot"></div>
                <div class="card">
                    <div class="card-content p-6">
                        <div class="flex justify-between items-start mb-4">
                            <div>
                                <h3 class="font-semibold text-lg">${
                                  exp.position
                                }</h3>
                                <p class="text-teal-accent font-medium">${
                                  exp.company
                                }</p>
                            </div>
                            <div class="text-right">
                                <p class="text-sm font-medium">${exp.period}</p>
                                <p class="text-xs text-muted-foreground">${
                                  exp.location
                                }</p>
                            </div>
                        </div>
                        <ul class="achievement-list">
                            ${exp.achievements
                              .map(
                                (achievement) =>
                                  `<li class="achievement-item">
                                    <span class="achievement-bullet">•</span>
                                    <span class="achievement-text">${achievement}</span>
                                </li>`
                              )
                              .join("")}
                        </ul>
                        <div class="flex flex-wrap gap-2">
                            ${exp.technologies
                              .map(
                                (tech) => `<span class="badge">${tech}</span>`
                              )
                              .join("")}
                        </div>
                    </div>
                </div>
            </div>`
      )
      .join("");
  }
}

function populateContactSection() {
  const contactInfo = document.getElementById("contact-info");
  const contactSocial = document.getElementById("contact-social");

  if (contactInfo && portfolioData.contact) {
    contactInfo.innerHTML = `
            <div class="contact-info-item">
                <div class="contact-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--teal-accent)" stroke-width="2">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                        <polyline points="22,6 12,13 2,6"/>
                    </svg>
                </div>
                <div class="contact-details">
                    <p class="font-medium">Email</p>
                    <p class="text-sm text-muted-foreground">${portfolioData.contact.email}</p>
                </div>
            </div>
            <div class="contact-info-item">
                <div class="contact-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--teal-accent)" stroke-width="2">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                    </svg>
                </div>
                <div class="contact-details">
                    <p class="font-medium">Phone</p>
                    <p class="text-sm text-muted-foreground">${portfolioData.contact.phone}</p>
                </div>
            </div>
            <div class="contact-info-item">
                <div class="contact-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--teal-accent)" stroke-width="2">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                        <circle cx="12" cy="10" r="3"/>
                    </svg>
                </div>
                <div class="contact-details">
                    <p class="font-medium">Location</p>
                    <p class="text-sm text-muted-foreground">${portfolioData.contact.location}</p>
                </div>
            </div>
        `;
  }

  if (contactSocial && portfolioData.contact.social) {
    const socialIcons = {
      github:
        '<path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>',
      linkedin:
        '<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>',
      email:
        '<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>',
    };

    contactSocial.innerHTML = Object.entries(portfolioData.contact.social)
      .map(
        ([platform, url]) =>
          `<a href="${url}" class="social-link">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    ${socialIcons[platform]}
                </svg>
            </a>`
      )
      .join("");
  }
}

function populateFooter() {
  const footerName = document.getElementById("footer-name");
  if (footerName) {
    footerName.textContent = `© 2025 ${portfolioData.personal.name}. All rights reserved.`;
  }
}

// Theme and UI functions
function toggleDarkMode() {
  document.body.classList.toggle("dark");
  const isDark = document.body.classList.contains("dark");

  const themeToggle = document.getElementById("theme-toggle");
  themeToggle.innerHTML = isDark
    ? '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>'
    : '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>';

  localStorage.setItem("dark-mode", isDark);
}

function loadTheme() {
  const savedTheme = localStorage.getItem("dark-mode");
  const themeToggle = document.getElementById("theme-toggle");

  if (savedTheme !== null) {
    if (savedTheme === "true") {
      document.body.classList.add("dark");
      if (themeToggle) {
        themeToggle.innerHTML =
          '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
      }
    } else {
      document.body.classList.remove("dark");
      if (themeToggle) {
        themeToggle.innerHTML =
          '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>';
      }
    }
  } else {
    const darkModeByDefault = portfolioData.settings?.darkModeByDefault ?? true;
    if (darkModeByDefault) {
      document.body.classList.add("dark");
      if (themeToggle) {
        themeToggle.innerHTML =
          '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
      }
    } else {
      document.body.classList.remove("dark");
      if (themeToggle) {
        themeToggle.innerHTML =
          '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>';
      }
    }
  }
}

// Event handlers and animations
function handleNavScroll() {
  const navbar = document.getElementById("navbar");
  const scrolled = window.scrollY > 50;

  if (scrolled) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function animateOnScroll() {
  const elements = document.querySelectorAll(".animate-on-scroll");

  elements.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top;
    const elementVisible = 150;

    if (elementTop < window.innerHeight - elementVisible) {
      element.style.opacity = "1";
      element.style.transform = "translateY(0)";
      element.style.transition = "all 0.6s ease";
    }
  });
}

function handleFormSubmit(event) {
  event.preventDefault();

  const form = document.getElementById("contact-form");
  const successMessage = document.getElementById("success-message");
  const formData = new FormData(form);

  // Submit to Formspree using fetch
  fetch(form.action, {
    method: "POST",
    body: formData,
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        form.style.display = "none";
        successMessage.style.display = "block";

        setTimeout(() => {
          form.style.display = "block";
          successMessage.style.display = "none";
          form.reset();
        }, 3000);
      } else {
        throw new Error("Form submission failed");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("There was an error sending your message. Please try again.");
    });
}

function animateSkillBars() {
  const progressBars = document.querySelectorAll(".skill-progress-bar");

  progressBars.forEach((bar) => {
    const width = bar.style.width;
    bar.style.width = "0%";

    setTimeout(() => {
      bar.style.width = width;
    }, 500);
  });
}

document.addEventListener("DOMContentLoaded", function () {
  loadPortfolioData();
  animateOnScroll();

  window.addEventListener("scroll", handleNavScroll);
  window.addEventListener("scroll", animateOnScroll);

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && entry.target.id === "skills") {
        animateSkillBars();
      }
    });
  });

  const skillsSection = document.getElementById("skills");
  if (skillsSection) {
    observer.observe(skillsSection);
  }
});

document.addEventListener("click", function (e) {
  if (e.target.matches('a[href^="#"]')) {
    e.preventDefault();
    const target = document.querySelector(e.target.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }
});
