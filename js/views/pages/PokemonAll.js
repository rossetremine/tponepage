import PokemonProvider from "../../utils/PokemonProvider.js";

export default class PokemonAll {
    async render () {
        let pokemons = (await PokemonProvider.fetchPokemons(10))
        console.log(pokemons)
        let view =  `
            <h2>Pokemon listing</h2>
            <div>
                ${ pokemons.map(pokemon => 
                    `
                    <h1>${pokemon.name.french}</h1>
                    `
                ).join('\n ')}
            </div>
        `;
        return view
    }
}