const quoteTextElement = document.getElementById('quote-text');
const quoteAuthorElement = document.getElementById('quote-author');
const fetchQuoteBtn = document.getElementById('fetch-quote-btn');

const ghAvatar = document.getElementById('gh-avatar');
const ghName = document.getElementById('gh-name');
const ghRepos = document.getElementById('gh-repos');
const ghLink = document.getElementById('gh-link');

async function fetchGitHubProfile() {
    try {
        const response = await fetch('https://api.github.com/users/sammie46');
        
        if (!response.ok) {
            throw new Error('Грешка при връзката с GitHub API');
        }

        const data = await response.json();

        ghAvatar.src = data.avatar_url;
        ghAvatar.style.display = 'block'; 

        ghName.textContent = data.name || data.login;
        ghRepos.textContent = `Публични репозитории: ${data.public_repos}`;

        ghLink.href = data.html_url;
        ghLink.style.display = 'inline-block'; 
        
    } catch (error) {
        console.error(error);
        ghName.textContent = "Неуспешно зареждане на профила.";
        ghRepos.textContent = "Моля, опитайте по-късно.";
    }
}

fetchGitHubProfile();


async function getQuote() {
    console.log("Бутонът е натиснат! Остава да добавим и тук fetch.");
}
fetchQuoteBtn.addEventListener('click', getQuote);