import { ENDPOINT } from '../config.js'

export default class PokemonProvider {


    static fetchPokeApi  = async (id) => {
        let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        let data = await response.json();
        return data
    }

    static fetchPokemons = async (limit = 10) => {
        const options = {
           method: 'GET',
           headers: {
               'Content-Type': 'application/json'
           }
       };
       try {
           const response = await fetch(`${ENDPOINT}?_limit=${limit}`, options)
           const json = await response.json();
           for (let i = 0; i < json.length; i++) {
               let pokeApiData = await this.fetchPokeApi(i + 1);
               json[i].pokeApiData = pokeApiData
           }
           return json
       } catch (err) {
           console.log('Error getting documents', err)
       }
    }

    static getPokemon = async (id) => {
        const options = {
           method: 'GET',
           headers: {
               'Content-Type': 'application/json'
           }
       };
       try {
           const response = await fetch(`${ENDPOINT}/` + id, options)
           const json = await response.json();

            let pokeApiData = await this.fetchPokeApi(id);
            json.pokeApiData = pokeApiData

           return json
       } catch (err) {
           console.log('Error getting documents', err)
       }
    }
}