import Utils from "../../utils/Utils.js";
import PokemonProvider from "../../utils/PokemonProvider.js";

export default class PokemonDetail {
    pokemon = null
    ratingData = null
    rate = async (event) => {
        event.preventDefault()
        const rating = document.getElementById('rating').value
        await PokemonProvider.addPokemonRating(this.pokemon.id, this.ratingData.sum + parseInt(rating), this.ratingData.count + 1)
        location.reload()
    }
    async render () {
        this.pokemon = await PokemonProvider.getPokemon(Utils.parseRequestURL().id)
        this.ratingData = await PokemonProvider.getPokemonRating(this.pokemon.id)
        let view =  `
            <h2>${this.pokemon.name.french}</h2>
            <img src="${this.pokemon.pokeApiData.sprites.front_default}" alt="${this.pokemon.name.french}">
            <br>
            Type principal: ${this.pokemon.type[0]}
            ${this.pokemon.type[1] ? `<br>Type secondaire: ${this.pokemon.type[1]}` : ''}
            
            <ul>
                <li>HP: ${this.pokemon.base.HP}</li>
                <li>Attack: ${this.pokemon.base.Attack}</li>
                <li>Defense: ${this.pokemon.base.Defense}</li>
                <li>Sp. Attack: ${this.pokemon.base['Sp. Attack']}</li>
                <li>Sp. Defense: ${this.pokemon.base['Sp. Defense']}</li>
                <li>Speed: ${this.pokemon.base.Speed}</li>
            </ul>
            <h3>Rating</h3>
            <p>Rating: ${
                this.ratingData &&
                this.ratingData.count > 0
                ? (this.ratingData.sum / this.ratingData.count).toFixed(2) + ' / 5 (' + this.ratingData.count + ' votes)'
                : 'No rating yet'
        }</p>
            <form id="ratingForm"
                <label for="rating">Rating</label>
                <input type="number" id="rating" name="rating" min="1" max="5">
                <button type="submit">Submit</button>
            </form>
        `;
        return view
    }

    async afterRender() {
    }
    async afterRender () {
        document.getElementById('ratingForm').addEventListener('submit', this.rate)
    }
}