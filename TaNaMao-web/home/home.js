
function Cadastrar(singin){
    window.location.href = '../index.html';
}

document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:8080/employ/all') // URL do seu endpoint
        .then(response => response.json())
        .then(usuarios => {
            exibirUsuarios(usuarios);
        })
        .catch(error => console.error('Erro ao buscar usuários:', error));
});

function exibirUsuarios(usuarios) {
    const listaUsuarios = document.getElementById('list-employs');

    usuarios.forEach(usuario => {
        const employBox = document.createElement('div');
        employBox.className = 'employs_box';

        employBox.innerHTML = `
            <div class="employ_img">
                <!-- Se houver uma imagem para cada usuário, inclua uma tag <img> aqui -->
            </div>
            <article class="employ_description">
                <h2 class="name_employ">${usuario.nome}</h2>
                <h3 class="section_employ">${usuario.setor || 'Setor'}</h3>
                <p>${usuario.descricao || 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae placeat corporis deserunt dignissimos voluptatibus tempore aperiam fugit dolores, nihil quos debitis maiores, nemo at molestias ducimus! Adipisci placeat enim deleniti.'}</p>
                <button class="employ_contact">Contato</button>
            </article>
        `;

        listaUsuarios.appendChild(employBox);
    });
}


//API

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('searchBtn').addEventListener('click', async () => {
        // Verifica se a API de Geolocalização está disponível
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(async (position) => {
                
                let lat = position.coords.latitude.toString().replace(',', '.');
                let lng = position.coords.longitude.toString().replace(',', '.');
                
                const type = document.getElementById('searchType').value; // Tipo do estabelecimento
                const radius = 5000; // Raio de busca em metros
                console.log(lat)
                console.log(lng)
                console.log(type)

                try {
                    const response = await fetch(`http://localhost:8080/api/places?lat=${lat}&lng=${lng}&radius=${radius}&type=${type}`);
                    const data = await response.json();
                
                    console.log('Resposta completa da API:', data); // Exibe toda a resposta no console
                    console.log('Resultados encontrados:', data.results); // Exibe a propriedade "results"
                    renderPlaces(data.results);
                } catch (error) {
                    console.error('Erro ao buscar estabelecimentos:', error);
                }
            }, (error) => {
                console.error('Erro ao obter localização:', error);
                alert('Não foi possível obter sua localização. Por favor, permita o acesso ou digite manualmente.');
            });
        } else {
            alert('Geolocalização não é suportada pelo seu navegador.');
        }

        
    });

   
    

    function renderPlaces(places) {
        const container = document.getElementById('list-employs');
        
        if (!container) {
            console.error('Erro: container "list-employs" não encontrado.');
            return;
        }
    
        container.innerHTML = ''; // Limpa resultados antigos
        console.log('Container encontrado e limpo.');
    
        if (!places || places.length === 0) {
            container.innerHTML = '<p>Nenhum estabelecimento encontrado.</p>';
            console.log('Nenhum lugar encontrado.');
            return;
        }
    
        console.log(`Número de estabelecimentos a renderizar: ${places.length}`);
    
        places.forEach((place, index) => {
            console.log(`Renderizando estabelecimento ${index + 1}:`, place);
    
            const div = document.createElement('div');
            div.className = 'employs_box';
            div.innerHTML = `
                <div class="employ_img">
                    <img src="${place.icon}" alt="${place.name}" />
                </div>
                <article class="employ_description">
                    <h2 class="name_employ">${place.name}</h2>
                    <h3 class="section_employ">${place.types?.join(', ')}</h3>
                    <p>${place.vicinity || 'Endereço não disponível'}</p>
                    <button class="employ_contact">Contato</button>
                </article>
            `;
    
            container.appendChild(div);
            console.log(`Estabelecimento ${index + 1} renderizado.`);
        });
    }


});



