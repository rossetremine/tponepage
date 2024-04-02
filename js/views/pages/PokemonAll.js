import PokemonProvider from "../../utils/PokemonProvider.js";

export default class PokemonAll {
    async render () {
        let pokemons = await PokemonProvider.fetchPokemons(400);
        let view =  `
            <h2>Pokedex</h2>
            <div class='container'>
                ${ pokemons.map(pokemon => 
                    `
                    <div class="box ${ pokemon.type[0] }">
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
        return view
    }
    async afterRender() {
    }
}