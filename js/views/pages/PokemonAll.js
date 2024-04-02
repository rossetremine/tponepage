import PokemonProvider from "../../utils/PokemonProvider.js";


export default class PokemonAll {




    async render() {
        let pokemons = await PokemonProvider.fetchPokemons(50);
        let view = `
            <div class="top">
                <h2>Pokedex</h2>
                <input type="text" class="input" placeholder="Rechercher un pokemon..." id="myinput">
            </div>
            
            <div class='container'>
                ${pokemons.map(pokemon =>
                    `
                    <div class="box ${pokemon.type[0]}">
                        <button class="favoriteButton" data-pokemon-id="${pokemon.id}">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="gold" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-star"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                        </button>
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
            Loading...
        `;
        return view;
    }

    async afterRender() {

        const favoriteButtons = document.querySelectorAll('.favoriteButton');
        
        function favoriteButton(button){
            let favs = JSON.parse(localStorage.getItem('favs')) || [];
            let svg = button.querySelector('svg');
            if (favs.includes(button.dataset.pokemonId)) {
                svg.style.fill = 'gold';
            }
            else {
                svg.style.fill = 'none';
            }
        }
        
        function handleFavorite(pokemonId){
            console.log("pokemonId : ", pokemonId);
            let favs = JSON.parse(localStorage.getItem('favs')) || [];
            if (favs.includes(pokemonId)) {
                favs = favs.filter(fav => fav !== pokemonId);
            }
            else {
                favs.push(pokemonId);
            }
            localStorage.setItem('favs', JSON.stringify(favs));
            console.log(localStorage.getItem('favs'));

            const button = document.querySelector(`.favoriteButton[data-pokemon-id="${pokemonId}"]`);
            favoriteButton(button);
        }

        favoriteButtons.forEach(button => {
            const pokemonId = button.dataset.pokemonId;
            favoriteButton(button);   
            button.addEventListener('click', () => {
                handleFavorite(pokemonId);
            });
        });

        let myInput = document.getElementById("myinput");

        myInput.addEventListener("keyup", function() {
            let value = this.value.toLowerCase();
            console.log(value);
            let containerHeadings = document.querySelectorAll(".box h3");
            containerHeadings.forEach(function(heading) {
                if (heading.textContent.toLowerCase().indexOf(value) > -1) {
                    heading.parentNode.style.display = "flex";
                } else {
                    heading.parentNode.style.display = "none";
                }
            });
        });


        // load following page on 80% scroll
        window.onscroll = function(ev) {
            if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight * 0.9) {
                const pokemonsBox = document.querySelector('.container');
                const newPokemons = PokemonProvider.fetchPokemons(50, document.querySelector('.container').children.length);
                newPokemons.then(pokemons => {
                    pokemons.forEach(pokemon => {
                        const box = document.createElement('div');
                        box.className = `box ${pokemon.type[0]}`;
                        box.innerHTML = `
                            <button class="favoriteButton" data-pokemon-id="${pokemon.id}">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="gold" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-star"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                            </button>
                            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png" alt="${pokemon.name.french}">
                            <h4 class="numero">N° ${pokemon.id}</h4>
                            <h3 class="nom">${pokemon.name.french}</h3>
                            <ul class="types">
                                ${pokemon.type.map(type => `<li class='${type}' >${type}</li>`).join('\n ')}
                            </ul>
                            <input type="button" class="details" value="Détails" onclick="window.location.href = '#/pokemons/${pokemon.id}'">
                        `;
                        pokemonsBox.appendChild(box);
                        favoriteButton(box.querySelector('.favoriteButton'));
                        box.querySelector('.favoriteButton').addEventListener('click', () => {
                            handleFavorite(pokemon.id);
                        });
                    });
                });
            }
        };
    }


}