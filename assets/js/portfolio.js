async function loadPortfolioData() {
  try {
    const response = await fetch("data.json");
    const data = await response.json();

    populatePersonalInfo(data.personal);
    populateSocialLinks(data.social);
    populateExpertise(data.expertise);
    populateExperience(data.experience);
    populateEducation(data.education);
    populateSkills(data.skills);
    populateLanguages(data.languages);
    populateStats(data.stats);
    populateProjects(data.projects);
  } catch (error) {
    console.error("Error loading portfolio data:", error);
  }
}

function populatePersonalInfo(personal) {
  document.querySelector(".header-subtitle").textContent = personal.subtitle;
  document.querySelector(".header-title").textContent = personal.name;
  document.querySelector(".header-mono").textContent = personal.title;
  document
    .querySelectorAll('[download="Abhinav Sharma resume.pdf"]')
    .forEach((link) => {
      link.href = personal.resumeLink;
    });
  document.querySelector(".brand-title").textContent = personal.name;
  document.querySelector(".brand-subtitle").textContent = personal.description;
  document.querySelectorAll('img[src*="avatar"]').forEach((img) => {
    img.src = personal.avatar;
  });
  document.querySelector(".about-card h5").textContent = personal.whoAmI;
  document.querySelector(".about-card p").textContent =
    personal.whoAmIDescription;

    const emailLinks = document.querySelectorAll(
    '[onclick*="sharmaabhinav23736@gmail.com"]',
  );
  emailLinks.forEach((link) => {
    link.textContent = personal.email;
    link.setAttribute("onclick", `copyToClipboard('${personal.email}')`);
  });

  const phoneLinks = document.querySelectorAll('[onclick*="+91 7011051307"]');
  phoneLinks.forEach((link) => {
    link.textContent = personal.phone;
    link.setAttribute("onclick", `copyToClipboard('${personal.phone}')`);
  });

  document
    .querySelectorAll('.info li span:contains("Address")')
    .forEach((item) => {
      if (item.textContent === "Address") {
        item.parentElement.childNodes[2].textContent = ` : ${personal.address}`;
      }
    });

  document.querySelector(".bg-dark.py-5 h2").textContent = personal.hireMeText;

  const hireMeBtn = document.querySelector(".bg-dark.py-5 .btn");
  if (hireMeBtn) {
    hireMeBtn.setAttribute(
      "onclick",
      `window.location.href='mailto:${personal.email}?subject=Job%20Opportunity&body=Hello,%20I%20am%20interested%20in%20discussing%20a%20job%20opportunity%20with%20you.'`,
    );
  }
}

function populateSocialLinks(social) {
  const headerSocials = document.querySelector(".header .social-icons");
  headerSocials.innerHTML = `
    <li class="social-item">
      <a class="social-link text-light" href="${social.twitter}" target="_blank">
        <i class="ti-twitter" aria-hidden="true"></i>
      </a>
    </li>
    <li class="social-item">
      <a class="social-link text-light" href="${social.linkedin}" target="_blank">
        <i class="ti-linkedin" aria-hidden="true"></i>
      </a>
    </li>
    <li class="social-item">
      <a class="social-link text-light" href="${social.github}" target="_blank">
        <i class="ti-github" aria-hidden="true"></i>
      </a>
    </li>
  `;

  const aboutSocials = document.querySelector(".about-card .social-icons");
  aboutSocials.innerHTML = `
    <li class="social-item">
      <a class="social-link" href="${social.twitter}" target="_blank">
        <i class="ti-twitter" aria-hidden="true"></i>
      </a>
    </li>
    <li class="social-item">
      <a class="social-link" href="${social.linkedin}" target="_blank">
        <i class="ti-linkedin" aria-hidden="true"></i>
      </a>
    </li>
    <li class="social-item">
      <a class="social-link" href="${social.github}" target="_blank">
        <i class="ti-github" aria-hidden="true"></i>
      </a>
    </li>
  `;

  const contactSocials = document.querySelector(
    ".contact-info-card .social-icons",
  );
  contactSocials.innerHTML = `
    <li class="social-item">
      <a class="social-link text-dark" href="${social.twitter}" target="_blank">
        <i class="ti-twitter" aria-hidden="true"></i>
      </a>
    </li>
    <li class="social-item">
      <a class="social-link text-dark" href="${social.linkedin}" target="_blank">
        <i class="ti-linkedin" aria-hidden="true"></i>
      </a>
    </li>
    <li class="social-item">
      <a class="social-link text-dark" href="${social.github}" target="_blank">
        <i class="ti-github" aria-hidden="true"></i>
      </a>
    </li>
  `;
}

function populateExpertise(expertise) {
  const expertiseContainer = document.querySelector(
    ".col-lg-4.about-card:nth-child(3)",
  );
  const expertiseRows = expertise
    .map(
      (exp) => `
    <div class="row">
      <div class="col-1 text-danger pt-1">
        <i class="${exp.icon}"></i>
      </div>
      <div class="col-10 ml-auto mr-3">
        <h6>${exp.title}</h6>
        <p class="subtitle">${exp.description}</p>
        <hr />
      </div>
    </div>
  `,
    )
    .join("");

  const header =
    expertiseContainer.querySelector("h3").outerHTML +
    expertiseContainer.querySelector(".line").outerHTML;
  expertiseContainer.innerHTML = header + expertiseRows;
}

function populateExperience(experience) {
  const experienceCard = document.querySelector(".card-body");
  experienceCard.innerHTML =
    experience
      .map(
        (exp, index) => `
    ${index > 0 ? "<hr />" : ""}
    <h6 class="title text-danger">${exp.company}</h6>
    <p>${exp.position}</p>
    <p class="subtitle">${exp.description}</p>
  `,
      )
      .join("") + "<hr />";
}

function populateEducation(education) {
  const educationCard = document
    .querySelectorAll(".card")[1]
    .querySelector(".card-body");
  educationCard.innerHTML =
    "<hr />" +
    education
      .map(
        (edu) => `
    <h6 class="title text-danger">${edu.year}</h6>
    <p>${edu.degree}</p>
    <p class="subtitle">${edu.institution}</p>
    <hr />
  `,
      )
      .join("");
}

function populateSkills(skills) {
  const skillsCard = document
    .querySelectorAll(".card")[2]
    .querySelector(".card-body");
  skillsCard.innerHTML = skills
    .map(
      (skill) => `
    <h6>${skill.name}</h6>
    <div class="progress mb-3">
      <div class="progress-bar bg-danger" role="progressbar" 
           style="width: ${skill.percentage}%" 
           aria-valuenow="${skill.percentage}" 
           aria-valuemin="0" 
           aria-valuemax="100"></div>
    </div>
  `,
    )
    .join("");
}

function populateLanguages(languages) {
  const languagesCard = document
    .querySelectorAll(".card")[3]
    .querySelector(".card-body");
  languagesCard.innerHTML = languages
    .map(
      (lang) => `
    <h6>${lang.name}</h6>
    <div class="progress mb-3">
      <div class="progress-bar bg-danger" role="progressbar" 
           style="width: ${lang.percentage}%" 
           aria-valuenow="${lang.percentage}" 
           aria-valuemin="0" 
           aria-valuemax="100"></div>
    </div>
  `,
    )
    .join("");
}

function populateStats(stats) {
  const statsSection = document.querySelector(".bg-dark.text-center .row");
  statsSection.innerHTML = stats
    .map(
      (stat) => `
    <div class="col-md-6 col-lg-3">
      <div class="row">
        <div class="col-5 text-right text-light border-right py-3">
          <div class="m-auto"><i class="${stat.icon}"></i></div>
        </div>
        <div class="col-7 text-left py-3">
          <h1 class="text-danger font-weight-bold font40">${stat.value}</h1>
          <p class="text-light mb-1">${stat.label}</p>
        </div>
      </div>
    </div>
  `,
    )
    .join("");
}

function populateProjects(projects) {
  const projectsSection = document.querySelector("#service .row");
  projectsSection.innerHTML = projects
    .map(
      (project) => `
    <div class="col-md-4 col-sm-6">
      <div class="card mb-5">
        <div class="card-header has-icon">
          <i class="${project.icon}" aria-hidden="true"></i>
        </div>
        <div class="card-body px-4 py-3">
          <h5 class="mb-3 card-title text-dark">${project.title}</h5>
          <p class="subtitle">${project.description}</p>
          ${
            project.link
              ? `
            <p>
              <button class="btn bg-primary w-lg text-white" 
                      onclick="window.location.href='${project.link}';">
                View
              </button>
            </p>
          `
              : ""
          }
        </div>
      </div>
    </div>
  `,
    )
    .join("");
}

document.addEventListener("DOMContentLoaded", loadPortfolioData);
