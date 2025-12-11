window.onload = function(){
    let count = 0;

    // Typing animation for home page
    const typingElement = document.getElementById('typing-text');
    if (typingElement) {
        const name = "Anu Peddada";
        let index = 0;
        
        function typeName() {
            if (index < name.length) {
                typingElement.textContent = name.substring(0, index + 1);
                index++;
                setTimeout(typeName, 150);
            }
        }
        
        // Start typing animation after a short delay
        setTimeout(typeName, 500);
    }

    // Like counter functionality
    const counterButton = document.getElementById('counter-inc');
    if (counterButton) {
        counterButton.addEventListener('click', function() {
            count++;
            const counterValue = document.getElementById('counter-value');
            if (counterValue) {
                counterValue.textContent = count;
            }
        });
    }
    // Fetch and render GitHub repos for the projects page
    if (document.getElementById('github-repos')) {
        fetchAndRenderRepos('anu-peddada');
    }
};

// Fetch GitHub repos (public) and render into #github-repos
async function fetchAndRenderRepos(username) {
    const container = document.getElementById('github-repos');
    const loading = document.getElementById('repos-loading');
    const errorEl = document.getElementById('repos-error');
    const apiUrl = `https://api.github.com/users/${username}/repos?per_page=10&sort=updated`;

    function renderList(repos) {
        container.innerHTML = '';
        if (!repos || repos.length === 0) {
            container.innerHTML = '<p>No repositories found.</p>';
            return;
        }
        repos.slice(0, 6).forEach(repo => {
            const card = document.createElement('div');
            card.className = 'repo-card';

            const title = document.createElement('h4');
            const link = document.createElement('a');
            link.href = repo.html_url;
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
            link.textContent = repo.name;
            link.style.textDecoration = 'none';
            link.style.color = 'inherit';
            title.appendChild(link);

            const desc = document.createElement('p');
            desc.textContent = repo.description || '';

            const meta = document.createElement('div');
            meta.className = 'repo-meta';
            const lang = document.createElement('span');
            lang.textContent = repo.language || '';
            const stars = document.createElement('span');
            stars.textContent = '★ ' + (repo.stargazers_count || 0);
            meta.appendChild(lang);
            meta.appendChild(stars);

            card.appendChild(title);
            card.appendChild(desc);
            card.appendChild(meta);

            // Clicking the repo card navigates to the repo
            card.addEventListener('click', () => window.open(repo.html_url, '_blank'));

            container.appendChild(card);
        });
    }

    try {
        const res = await fetch(apiUrl);
        if (!res.ok) throw new Error('GitHub API error');
        const data = await res.json();
        renderList(data);
    } catch (e) {
        console.warn('Failed to fetch GitHub repos, falling back to local data.', e);
        errorEl.style.display = 'block';
        try {
            const fallback = await fetch('data/repos-fallback.json');
            const list = await fallback.json();
            renderList(list);
        } catch (e2) {
            container.innerHTML = '<p>Unable to load repositories.</p>';
        }
    }
}
