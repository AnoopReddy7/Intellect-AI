const API_KEY = "86ce4e171a014c11b715e2f3f46463e7";
const url = "https://newsapi.org/v2/everything?q=";
const updateInterval = 60000; // Auto-update interval in milliseconds (e.g., 60000ms = 1 minute)

window.addEventListener("load", () => {
    fetchNews("India's Artificial Intelligence");
    setInterval(() => fetchNews("India's Artificial Intelligence"), updateInterval);
});

function reload() {
    window.location.reload();
}

async function fetchNews(query) {
    try {
        const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
        if (!res.ok) {
            throw new Error(`Error: ${res.status}`);
        }
        const data = await res.json();
        console.log(data); // Check the API response
        bindData(data.articles);
    } catch (error) {
        console.error("Error fetching news:", error);
    }
}

function bindData(articles) {
    const cardsContainer = document.getElementById("cards-container");
    const newsCardTemplate = document.getElementById("template-news-card");

    // Sort articles by publication date (newest first)
    articles.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));

    cardsContainer.innerHTML = "";

    articles.forEach((article) => {
        if (!article.urlToImage) return;
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone, article);
        cardsContainer.appendChild(cardClone);
    });
}

function fillDataInCard(cardClone, article) {
    const newsImg = cardClone.querySelector("#news-img");
    const newsTitle = cardClone.querySelector("#news-title");
    const newsSource = cardClone.querySelector("#news-source");
    const newsDesc = cardClone.querySelector("#news-desc");

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta",
    });

    newsSource.innerHTML = `${article.source.name} · ${date}`;

    cardClone.firstElementChild.addEventListener("click", () => {
        window.open(article.url, "_blank");
    });
}

function onNavItemClick(query, elementId) {
    fetchNews(query);
    clearInterval(window.newsUpdateInterval); // Clear the previous interval
    window.newsUpdateInterval = setInterval(() => fetchNews(query), updateInterval); // Set a new interval for the selected category

    // Highlight the active link
    document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active-link'));
    document.getElementById(elementId).classList.add('active-link');
}
