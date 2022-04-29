const url = "https://api.github.com/users/nwnordahl";
const profileCard = document.querySelector("#profile-card");
const container = document.querySelector(".container");

async function getProfileInformation() {
  const response = await fetch(url);
  return await response.json();

  profileCard.innerHTML = `
  <h1>${result.name}</h1>
  <p>${result.bio}</p>
  <img src="${result.avatar_url}" />`;
}

async function getRepos() {
  const response = await fetch(
    "https://api.github.com/users/nwnordahl/repos?per_page=100"
  );
  return await response.json();
}

getProfileInformation().then((profileInformation) => {
  profileCard.innerHTML = `
  <h1>${profileInformation.name}</h1>
  <p>${profileInformation.bio}</p>
  <img src="${profileInformation.avatar_url}" />`;
});

getRepos().then((repos) => {
  for (let i = 0; i < repos.length; i++) {
    const { name, description, homepage, html_url, fork } = repos[i];

    if (homepage && !fork) {
      console.log(repos[i]);
      container.innerHTML += `
    <div id="project-card" class="card">
      <h1>${name}</h1>
      <img src="#" />
      <p>${description}</p>
      <div class="buttons">
        <a class="button" href="${homepage}" target="_blank">
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
