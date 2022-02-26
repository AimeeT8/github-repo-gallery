const overview = document.querySelector(".overview");
const username = "AimeeT8";
const displayList = document.querySelector(".repo-list");

const getData = async function() {
const res = await fetch(`https://api.github.com/users/${username}`);
const data = await res.json();
//console.log(data);

displayInfo(data);

};
getData();

const displayInfo = function(data) {
    const div = document.createElement("div");
    div.classList.add(".user-info");
    div.innerHTML = `<figure>
    <img alt="user avatar" src= ${data.avatar_url}/>
  </figure>
  <div>
    <p><strong>Name:</strong> ${data.name}</p>
    <p><strong>Bio:</strong> ${data.bio}</p>
    <p><strong>Location:</strong> ${data.location}</p>
    <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
  </div> `;

  overview.append(div);
  getRepos();
  };

  const getRepos = async function() {
    const fetchRepos = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const repoData = await fetchRepos.json();
    displayRepos(repoData);
  };
  

  const displayRepos = function (repos) {
    for (const repo of repos) {
    const repoItem = document.createElement("li");
    repoItem.classList.add("repo");
    repoItem.innerHTML = `<h3>${repo.name}</h3>`;
    displayList.append(repoItem);

    }
  };


