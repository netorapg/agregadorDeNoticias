// script.js

document.addEventListener('DOMContentLoaded', function () {
    const newsContainer = document.getElementById('news-list');
    const proxyUrl = 'http://localhost:3000/proxy?url=';
    const targetUrl = 'https://g1.globo.com/rss/g1/';

    // Função para buscar notícias do G1
    async function getNews() {
        try {
            const response = await fetch(proxyUrl + encodeURIComponent(targetUrl));
            const data = await response.text();

            // Log do conteúdo da resposta
            console.log('Conteúdo da resposta:', data);

            // Verifica se o conteúdo é XML
            if (data.startsWith('<?xml')) {
                // Parseia o XML
                const parser = new DOMParser();
                const xml = parser.parseFromString(data, "text/xml");

                // Verifica se o XML foi parseado corretamente
                if (xml.documentElement.nodeName === "parsererror") {
                    throw new Error('Erro ao parsear o XML');
                }

                // Limpa o conteúdo anterior
                newsContainer.innerHTML = '';

                // Itera sobre os itens do feed e exibe na página
                const items = xml.querySelectorAll('item');
                items.forEach(item => {
                    const newsItem = document.createElement('div');
                    newsItem.classList.add('news-item');

                    const title = document.createElement('h2');
                    title.classList.add('news-title');
                    title.textContent = item.querySelector('title').textContent;

                    let descriptionContent = item.querySelector('description').textContent;
                    let tempDiv = document.createElement('div');
                    tempDiv.innerHTML = descriptionContent;

                    // Extrai a imagem, se existir
                    const imgTag = tempDiv.querySelector('img');
                    if (imgTag) {
                        const img = document.createElement('img');
                        img.src = imgTag.src;
                        img.classList.add('news-image');
                        newsItem.appendChild(img);
                    }

                    // Extrai o texto da descrição
                    let descriptionText = tempDiv.textContent || tempDiv.innerText || '';

                    const description = document.createElement('p');
                    description.classList.add('news-description');
                    description.textContent = descriptionText;

                    const link = document.createElement('a');
                    link.classList.add('news-link');
                    link.textContent = 'Leia mais';
                    link.href = item.querySelector('link').textContent;
                    link.target = '_blank'; // Abre o link em uma nova aba

                    newsItem.appendChild(title);
                    newsItem.appendChild(description);
                    newsItem.appendChild(link);

                    newsContainer.appendChild(newsItem);
                });
            } else {
                throw new Error('A resposta não é XML');
            }
        } catch (error) {
            console.error('Erro ao buscar notícias:', error);
        }
    }

    // Chama a função para buscar notícias quando a página carregar
    getNews();
});

const anoAtual = new Date().getFullYear();
document.getElementById('ano-atual').textContent = anoAtual;
