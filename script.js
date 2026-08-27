const quoteTextElement = document.getElementById('quote-text');
const quoteAuthorElement = document.getElementById('quote-author');
const fetchQuoteBtn = document.getElementById('fetch-quote-btn');

const ghAvatar = document.getElementById('gh-avatar');
const ghName = document.getElementById('gh-name');
const ghRepos = document.getElementById('gh-repos');
const ghLink = document.getElementById('gh-link');
const ghRepoList = document.getElementById('gh-repo-list'); 

async function fetchGitHubProfile() {
    try {

        const profileResponse = await fetch('https://api.github.com/users/sammie46');
        if (!profileResponse.ok) throw new Error('Грешка при профила');
        const profileData = await profileResponse.json();

        ghAvatar.src = profileData.avatar_url;
        ghAvatar.style.display = 'block';
        ghName.textContent = profileData.name || profileData.login;
        ghRepos.textContent = `Общо публични репозитории: ${profileData.public_repos}`;
        ghLink.href = profileData.html_url;
        ghLink.style.display = 'inline-block';
        
        const reposResponse = await fetch('https://api.github.com/users/sammie46/repos?sort=updated');
        if (!reposResponse.ok) throw new Error('Грешка при изтегляне на проектите');
        const reposData = await reposResponse.json();

        ghRepoList.innerHTML = '<h3>Моите проекти:</h3>';
        
        const topRepos = reposData.slice(0, 5);
        topRepos.forEach(repo => {

            const repoDiv = document.createElement('div');
            repoDiv.className = 'repo-item';
            repoDiv.innerHTML = `
                <h4><a href="${repo.html_url}" target="_blank">${repo.name}</a></h4>
                <p>${repo.description ? repo.description : 'Няма добавено описание към този проект.'}</p>
            `;
            ghRepoList.appendChild(repoDiv);
        });

    } catch (error) {
        console.error(error);
        ghName.textContent = "Неуспешно зареждане на профила.";
        ghRepoList.innerHTML = "<p>Грешка при зареждане на проектите.</p>";
    }
}

fetchGitHubProfile();

async function getQuote() {
    console.log("Бутонът е натиснат!");
}
fetchQuoteBtn.addEventListener('click', getQuote);