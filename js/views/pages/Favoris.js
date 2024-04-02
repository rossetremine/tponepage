import PokemonProvider from "../../utils/PokemonProvider.js";

export default class Favoris {
    async render () {
        let favs = JSON.parse(localStorage.getItem('favs')) || [];
        let pokemons = await PokemonProvider.fetchPokemons(400);
        let view =  `
            <h2>Favoris</h2>
            <div class='container'>
            ${ pokemons.map(pokemon => {
                if (favs.includes(pokemon.id)) {
                return `
                <div class="box ${ pokemon.type[0] }">
                    <button class="favoriteButton" data-pokemon-id="${pokemon.id}">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="gold" stroke="gold" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-star"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                    </button>
                    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png" alt="${pokemon.name.french}">
                    <h4 class="numero">N° ${pokemon.id}</h4>
                    <h3 class="nom">${pokemon.name.french}</h3>
                    <ul class="types">
                    ${pokemon.type.map(type => `<li class='${type}' >${type}</li>`).join('\n ')}
                    </ul>
                    <input type="button" class="details" value="Détails" onclick="window.location.href = '#/pokemons/${pokemon.id}'">
                </div>
                `;
                }
            }).join('\n ')}
            </div>
        `;
        return view
    }

    async afterRender() {
        const favoriteButtons = document.querySelectorAll('.favoriteButton');
        
        function unfav(button){
            let favs = JSON.parse(localStorage.getItem('favs')) || [];
            let pokemonId = button.dataset.pokemonId;
            favs = favs.filter(fav => fav !== pokemonId);
            localStorage.setItem('favs', JSON.stringify(favs));

            button.parentElement.remove();
        }

        favoriteButtons.forEach(button => {
            button.addEventListener('click', () => {
                unfav(button);
            });
        });
    }
}