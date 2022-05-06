// Global variables
const profileUrl = "https://api.github.com/users/nwnordahl";
const reposUrl = "https://api.github.com/users/nwnordahl/repos?per_page=100";

// Query selectors
const profileCard = document.querySelector("#profile-card");
const container = document.querySelector(".container");

// Helper functions
async function getProfileInformation() {
  const response = await fetch(profileUrl);
  return await response.json();

  profileCard.innerHTML = `
  <h1>${result.name}</h1>
  <p>${result.bio}</p>
  <img src="${result.avatar_url}" />`;
}

async function getRepos() {
  const response = await fetch(reposUrl);
  return await response.json();
}

function sortByMostRecentDate(dateArray) {
  const sortedDateArray = dateArray.sort((a, b) => {
    return new Date(b.pushed_at) - new Date(a.pushed_at);
  });
  return sortedDateArray;
}

function formatProjectTitle(title) {
  return title
    .split("-")
    .map((word) => {
      return word[0].toUpperCase() + word.slice(1);
    })
    .join(" ");
}

function isImageFound(imageUrl) {
  return fetch(imageUrl)
    .then((response) => true)
    .catch((error) => false);
}

// Fetch information
getProfileInformation().then((profileInformation) => {
  profileCard.innerHTML = `
  <h1>${profileInformation.name}</h1>
  <p>${profileInformation.bio}</p>
  <img src="${profileInformation.avatar_url}" />`;
});

getRepos()
  .then((repos) => sortByMostRecentDate(repos))
  .then((repos) => {
    for (let i = 0; i < repos.length; i++) {
      const { name, description, homepage, html_url, fork } = repos[i];
      const formattedTitle = formatProjectTitle(name);
      const imageUrl = `https://raw.githubusercontent.com/nwnordahl/${name}/main/img/screenshot.png`;

      if (homepage && !fork) {
        console.log(repos[i]);
        container.innerHTML += `
    <div id="project-card" class="card">
      <h1>${formattedTitle}</h1>
      <img src="${imageUrl}" />
      <p>${description || ""}</p>
      <div class="buttons">
        <a class="button margin-auto" href="${homepage}" target="_blank">
          Se app
        </a>
        <a class="button" href="${html_url}" target="_blank">
          Se kode
        </a>
      </div>
    </div>`;
      }
    }
  });
