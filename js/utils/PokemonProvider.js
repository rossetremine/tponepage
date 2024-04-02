import {ENDPOINT} from '../config.js'

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
           const response = await fetch(`${ENDPOINT}/pokemons?_limit=${limit}`, options)
           const json = await response.json();
        //    for (let i = 0; i < json.length; i++) {
        //        let pokeApiData = await this.fetchPokeApi(i + 1);
        //        json[i].pokeApiData = pokeApiData
        //    }
           return json
       } catch (err) {
           console.log('Error getting documents', err)
       }
    }
    static getPokemonRating = async (id) => {
        const response = await fetch(`${ENDPOINT}/ratings?id=${id}`)
        const json = await response.json()
        if (json.length === 0) {
            return { sum: 0, count: 0 }
        }
        return json[0]
    }

    static addPokemonRating = async (id, sum, count) => {
        const options = {
            method: (count === 1 ? 'POST' : 'PUT'),
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: id,
                sum: sum,
                count: count
            })
        }
        let response
        if (count === 1) {
            delete options.body.id
            response = await fetch(`${ENDPOINT}/ratings`, options)
        }
        else {
            response = await fetch(`${ENDPOINT}/ratings/${id}`, options)
        }
        return await response.json()
    }
    static getPokemon = async (id) => {
        const options = {
           method: 'GET',
           headers: {
               'Content-Type': 'application/json'
           }
       };
       try {
           const response = await fetch(`${ENDPOINT}/pokemons/` + id, options)
           const json = await response.json();

            // let pokeApiData = await this.fetchPokeApi(id);
            // json.pokeApiData = pokeApiData

           return json
       } catch (err) {
           console.log('Error getting documents', err)
       }
    }
}