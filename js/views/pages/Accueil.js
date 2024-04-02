import PokemonProvider from "../../utils/PokemonProvider.js";

export default class Accueil {

    async render() {
        let pokemons = await PokemonProvider.fetchPokemons(10);
        let view = `
            <div class="top">
                <h2>Accueil</h2>
            </div>
            

            <h4 class="titre">Un pokémon aléatoire</h4>
            
            <div class="random-pokemon">
                <div id="randomPokemonContainer"></div>
                <button id="randomPokemonButton"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-refresh-ccw"><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/><path d="M16 16h5v5"/></svg></button>
            </div>

            <div class="separator"></div>

            <h4 class="titre">Les 10 premiers pokémons</h4>

            <div class='container'>
                ${pokemons.map(pokemon =>
                    `
                    <div class="box ${pokemon.type[0]}">
                        <button class="favoriteButton" data-pokemon-id="${pokemon.id}">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="gold" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-star"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                        </button>
                        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png" alt="${pokemon.name.french}">
                        <h4 class="numero">N° ${pokemon.id}</h4>
                        <h3 class="nom">${pokemon.name.french}</h3>
                        <ul class="types">
                            ${pokemon.type.map(type => `<li class='${type}' >${type}</li>`).join('\n ')}
                        </ul>
                        <input type="button" class="details" value="Détails" onclick="window.location.href = '#/pokemons/${pokemon.id}'">
                    </div>
                    `
                ).join('\n ')}
            </div>
        `;
        return view;
    }

    async afterRender() {
        const favoriteButtons = document.querySelectorAll('.favoriteButton');
        favoriteButtons.forEach(button => {
            const pokemonId = button.dataset.pokemonId;
            this.favoriteButton(button);   
            button.addEventListener('click', () => {
                this.handleFavorite(pokemonId);
            });
        });

        const randomPokemonButton = document.getElementById('randomPokemonButton');
        const randomPokemonContainer = document.getElementById('randomPokemonContainer');

        async function randomPokemon(){
            const randomPokemon = await PokemonProvider.fetchRandomPokemon();
            const randomPokemonHTML = `
                <div class="box ${randomPokemon.type[0]}">
                    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${randomPokemon.id}.png" alt="${randomPokemon.name.french}">
                    <h4 class="numero">N° ${randomPokemon.id}</h4>
                    <h3 class="nom">${randomPokemon.name.french}</h3>
                    <ul class="types">
                        ${randomPokemon.type.map(type => `<li class='${type}' >${type}</li>`).join('\n ')}
                    </ul>
                    <input type="button" class="details" value="Détails" onclick="window.location.href = '#/pokemons/${randomPokemon.id}'">
                </div>
            `;
            randomPokemonContainer.innerHTML = randomPokemonHTML;
        }

        randomPokemon();

        randomPokemonButton.addEventListener('click', () => {
            randomPokemon();
            randomPokemonButton.classList.add('rotate');
            setTimeout(() => {
                randomPokemonButton.classList.remove('rotate');
            }, 500);

        });
    }

    favoriteButton(button) {
        let favs = JSON.parse(localStorage.getItem('favs')) || [];
        let svg = button.querySelector('svg');
        if (favs.includes(button.dataset.pokemonId)) {
            svg.style.fill = 'gold';
        }
        else {
            svg.style.fill = 'none';
        }
    }

    handleFavorite(pokemonId) {
        let favs = JSON.parse(localStorage.getItem('favs')) || [];
        if (favs.includes(pokemonId)) {
            favs = favs.filter(fav => fav !== pokemonId);
        }
        else {
            favs.push(pokemonId);
        }
        localStorage.setItem('favs', JSON.stringify(favs));
        console.log(localStorage.getItem('favs'));

        const button = document.querySelector(`.favoriteButton[data-pokemon-id="${pokemonId}"]`);
        this.favoriteButton(button);
    }
}

