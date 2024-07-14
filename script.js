// script.js

document.addEventListener('DOMContentLoaded', function () {
    const apiKey = '2173cc2620004da492133deba42d240c';
    const newsContainer = document.getElementById('news-list');

    // Função para buscar notícias da API
    async function getNews() {
        try {
            const response = await fetch(`https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=${apiKey}`);
            const data = await response.json();

            // Limpa o conteúdo anterior
            newsContainer.innerHTML = '';

            // Itera sobre os artigos e exibe na página
            data.articles.forEach(article => {
                const newsItem = document.createElement('div');
                newsItem.classList.add('news-item');

                const title = document.createElement('h2');
                title.classList.add('news-title');
                title.textContent = article.title;

                const description = document.createElement('p');
                description.classList.add('news-description');
                description.textContent = article.description;

                const link = document.createElement('a');
                link.classList.add('news-link');
                link.textContent = 'Leia mais';
                link.href = article.url;
                link.target = '_blank'; // Abre o link em uma nova aba

                newsItem.appendChild(title);
                newsItem.appendChild(description);
                newsItem.appendChild(link);

                newsContainer.appendChild(newsItem);
            });

        } catch (error) {
            console.error('Erro ao buscar notícias:', error);
        }
    }

    // Chama a função para buscar notícias quando a página carregar
    getNews();
});
const anoAtual = new Date().getFullYear();
document.getElementById('ano-atual').textContent = anoAtual;