import PokemonProvider from "../../utils/PokemonProvider.js";

export default class PokemonAll {
    async render () {
        PokemonProvider.fetchPokemons(10).then(data => {
            console.log(data)
        })
        let view =  `
            <h2>Pokemon listing</h2>
        `;
        return view
    }
}