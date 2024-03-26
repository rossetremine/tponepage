import PokemonProvider from "../../utils/PokemonProvider.js";

export default class PokemonAll {
    async render () {
        let pokemons = await PokemonProvider.fetchPokemons(800);
        console.log(pokemons)
        let view =  `
            <h2>Pokemon listing</h2>
            <div class="container">
                ${ pokemons.map(pokemon => 
                    `
                    <div class="box ${ pokemon.type[0] }">
                        <h3>${pokemon.name.french}</h3>
                    </div>
                    `
                ).join('\n ')}
            </div>
        `;
        return view
    }
}