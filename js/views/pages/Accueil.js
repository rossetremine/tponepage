import PokemonProvider from "../../utils/PokemonProvider.js";



export default class Accueil {
    async render () {
        let pokemons = await PokemonProvider.fetchPokemons(10);
        console.log(pokemons)
        let view =  `
            <h2>Accueil</h2>
            <div class='container'>
                ${ pokemons.map(pokemon => 
                    `
                    <div class="box ${ pokemon.type[0] }">
                        <h3>${pokemon.name.french}</h3>

                        <img src="${pokemon.pokeApiData.sprites.front_default}" alt="${pokemon.name.french}">

                        <h4>Types</h4>
                        <ul>
                            ${pokemon.type.map(type => `<li>${type}</li>`).join('\n ')}
                        </ul>
                    </div>
                    `
                ).join('\n ')}
            </div>
        `;
        return view
    }
}