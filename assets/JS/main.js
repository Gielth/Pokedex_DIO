
const offset = 0;
const limit = 10;
const url = 'https://pokeapi.co/api/v2/pokemon/?offset=' + offset + '&limit=' + limit;

function pokemonToHtml (pokemons) {
    return 
        "<li class='pokemon'>
        <span class='number'>#001</span>
        <span class='name'>Bulbasaur</span>
        <div class='details'>
            <ol class='types'>
                <li class='type'>Grass</li>
                <li class='type'>Poison</li>
            </ol>
            <img src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg' alt='Bulbasaur'>
        </div>
        </li>"
}


fetch(url)
    .then((response) => response.json())
    .then((jsonBody) => jsonBody.results)
    .then((pokemonList) => {

        for (let i = 0; i < pokemonList.length; i++) {
            const pokemon = pokemonList[i];
            console.log(pokemonToHtml(pokemon));
        }




    })
    .catch((error) => console.error(error));




