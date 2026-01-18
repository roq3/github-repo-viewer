async function fetchRepos() {
    try {
        const response = await fetch('/api/repos');
        if (!response.ok) {
            throw new Error(translations[document.getElementById('language-switcher').value].errorFetching + `${response.status} ${response.statusText}`);
        }
        const repos = await response.json();
        const reposDiv = document.getElementById('repos');

        if (repos.length === 0) {
            reposDiv.innerHTML = `<p>${translations[document.getElementById('language-switcher').value].noRepos}</p>`;
            return;
        }

        repos.forEach(repo => {
            const repoDiv = document.createElement('div');
            repoDiv.className = 'repo';
            repoDiv.innerHTML = `
                <h3><a href="${repo.html_url}" target="_blank">${repo.name}</a></h3>
                <p data-description="${repo.description || 'Brak opisu'}">${translations[document.getElementById('language-switcher').value].description}: ${repo.description || translations[document.getElementById('language-switcher').value].noRepos}</p>
                <p data-language="${repo.language || 'Nieznany'}">${translations[document.getElementById('language-switcher').value].language}: ${repo.language || 'Nieznany'}</p>
                <p data-stars="${repo.stargazers_count}">${translations[document.getElementById('language-switcher').value].stars}: ⭐ ${repo.stargazers_count}</p>
            `;
            reposDiv.appendChild(repoDiv);
        });
    } catch (error) {
        console.error(translations[document.getElementById('language-switcher').value].errorFetching, error);
        document.getElementById('repos').innerHTML = `<p>${translations[document.getElementById('language-switcher').value].errorFetching} ${error.message}</p>`;
    }
}

fetchRepos();