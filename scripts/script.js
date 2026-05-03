let projectsData = [];

const grid = document.getElementById("projectGrid");
const searchInput = document.getElementById("searchInput");
const typeFilter = document.getElementById("typeFilter");


fetch("assets/projects.json")
  .then(res => res.json())
  .then(data => {
    projectsData = data;
    displayProjects(projectsData);
  })



function displayProjects(projects) {
  grid.innerHTML = "";

  projects.forEach(project => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
      <img src="assets/${project.image}" alt="${project.name}">
      <div class="card-content">
        <h3>${project.name}</h3>
        <p>Type: ${project.type}</p>
        <div class="buttons">
          <a href="${project.link}" target="_blank">View Project</a>
          <a href="${project.repo}" target="_blank">View Repo</a>
        </div>
      </div>
    `;

    grid.appendChild(card);
  });
}


function filterProjects() {
  const searchText = searchInput.value.toLowerCase().trim();
  const selectedType = typeFilter.value;


  if (searchText === "" && selectedType === "all") {
    displayProjects(projectsData);
    return;
  }

  const filtered = projectsData.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchText);
    const matchesType =
      selectedType === "all" || project.type === selectedType;

    return matchesSearch && matchesType;
  });

  displayProjects(filtered);
}


searchInput.addEventListener("input", filterProjects);
typeFilter.addEventListener("change", filterProjects);