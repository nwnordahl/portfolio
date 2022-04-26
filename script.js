const url = "https://api.github.com/users/nwnordahl";
const profileCard = document.querySelector("#profile-card");

async function getRepos() {
  const response = await fetch(url);
  const result = await response.json();

  console.log(result);

  profileCard.innerHTML = `
  <h1>${result.name}</h1>
  <p>${result.bio}</p>
  <img src="${result.avatar_url}" />`;
}

getRepos();
