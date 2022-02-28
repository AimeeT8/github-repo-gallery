const overview = document.querySelector(".overview");
const username = "AimeeT8";
const repoList = document.querySelector(".repo-list");
const repoSection = document.querySelector(".repos");
const repoData = document.querySelector(".repo-data");
const backButton = document.querySelector(".view-repos");
const filterInput = document.querySelector(".filter-repos");


const getData = async function() {
const res = await fetch(`https://api.github.com/users/${username}`);
const data = await res.json();
//console.log(data);

displayInfo(data);

};
getData();

const displayInfo = function(data) {
    const div = document.createElement("div");
    div.classList.add("user-info");
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
    filterInput.classList.remove("hide");
    for (const repo of repos) {
    const repoItem = document.createElement("li");
    repoItem.classList.add("repo");
    repoItem.innerHTML = `<h3>${repo.name}</h3>`;
    repoList.append(repoItem);

    }
  };

  repoList.addEventListener("click", function (e) {
    //conditional statement to check if the event target matches the <h3> element
    if (e.target.matches("h3")) {
      let repoName = e.target.innerText;
      getRepo(repoName);

    }
  });

  const getRepo = async function(repoName) {
    const getName = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
    const repoInfo = await getName.json();
    //console.log(repoInfo);
    const fetchLanguages = await fetch(repoInfo.languages_url);
    const languageData = await fetchLanguages.json();
    //console.log(languageData);
    const languages = [];
    for (const language in languageData) {
      languages.push(language);
    //  console.log(languages);
    }
    displayRepoInfo(repoInfo, languages);

  };

  const displayRepoInfo = function(repoInfo, languages) {
    repoData.innerHTML = "";
    repoData.classList.remove("hide");
    repoSection.classList.add("hide");
    backButton.classList.remove("hide");
    const divInfo = document.createElement("div");
    divInfo.innerHTML = `<h3>Name: ${repoInfo.name}</h3>
    <p>Description: ${repoInfo.description}</p>
    <p>Default Branch: ${repoInfo.default_branch}</p>
    <p>Languages: ${languages.join(", ")}</p>
    <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>`;
    repoData.append(divInfo);
  };


  backButton.addEventListener("click", function() {

    repoSection.classList.remove("hide");
    repoData.classList.add("hide");
    backButton.classList.add("hide");
   
  });

  filterInput.addEventListener("input", function(e) {

    const searchValue = e.target.value;
    //console.log(searchValue);
    const repos = document.querySelectorAll(".repo");
    const lowerSearchValue = searchValue.toLowerCase();

    for (const repo of repos) {
      const repoLowerText = repo.innerText.toLowerCase();
      if (repoLowerText.includes(lowerSearchValue)) {
        repo.classList.remove("hide");
      } else {
        repo.classList.add("hide");
      }

    }

  });





