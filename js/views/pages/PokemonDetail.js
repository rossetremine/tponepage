import Utils from "../../utils/Utils.js";
import PokemonProvider from "../../utils/PokemonProvider.js";

export default class PokemonDetail {
    async render () {
        const pokemon = await PokemonProvider.getPokemon(Utils.parseRequestURL().id)
        console.log(pokemon)
        let view =  `
            <h2>${pokemon.name.french}</h2>
            Type principal: ${pokemon.type[0]}
            ${pokemon.type[1] ? `<br>Type secondaire: ${pokemon.type[1]}` : ''}
            
            <ul>
                <li>HP: ${pokemon.base.HP}</li>
                <li>Attack: ${pokemon.base.Attack}</li>
                <li>Defense: ${pokemon.base.Defense}</li>
                <li>Sp. Attack: ${pokemon.base['Sp. Attack']}</li>
                <li>Sp. Defense: ${pokemon.base['Sp. Defense']}</li>
                <li>Speed: ${pokemon.base.Speed}</li>
</ul>
        `;
        return view
    }

    async afterRender() {
    }
}