const pokeList = document.getElementById('pokeList');
const nextPageButton = document.getElementById('nextPage')
const previousPageButton = document.getElementById('previousPage')
const pokemonLimit = 151;
const limit = 20;
let offset = 0;
let countPages = 0;
const newLimit = pokemonLimit % limit;

function pokemonToHtml(pokemon) {
    return `
        <li class="pokemon ${pokemon.typeP}" onclick="openPokemonDetails('${pokemon.url}')">    
            <span class="number">#${pokemon.numero}</span>
            <span class="name">${pokemon.name}</span>
            <div class="details">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>
                <img src="${pokemon.sprite}"
                    alt="${pokemon.name}">
            </div>
        </li>
        `
}

function loadPokemons(offset, limit) {
    pokeApi.getPokemon(offset, limit).then((pokemonList = []) => {
        pokeList.innerHTML = pokemonList.map(pokemonToHtml).join("");
    })
}

function retiraBotao (botao) {
    botao.style.opacity = 0;
    botao.style.visibility = "hidden";
}

function adicionaBotao (botao) {
    botao.style.opacity = 1;
    botao.style.visibility = "visible";
}

loadPokemons(offset, limit);

nextPageButton.addEventListener('click', () => {
    countPages = 20 + offset + limit;
    if (countPages >= pokemonLimit) {
        if (offset === 0) {
            adicionaBotao(previousPageButton)
        }
        offset = offset + limit;
        retiraBotao(nextPageButton);
        loadPokemons(offset, newLimit);
    } else if (offset === 0) {
        offset = offset + limit;
        adicionaBotao(previousPageButton);
        loadPokemons(offset, limit);
    } else {
        offset = offset + limit;
        loadPokemons(offset, limit);
    }
})

previousPageButton.addEventListener('click', () => {
    countPages = 20 + offset;
    if (countPages  >= pokemonLimit) {
        if (offset === 20) {
            retiraBotao(previousPageButton);
            offset = 0;
            loadPokemons(offset, limit);
        } else {
        offset = offset - limit;
        loadPokemons(offset, limit);
        }
        adicionaBotao(nextPageButton);
    } else if (offset === 20) {
        retiraBotao(previousPageButton);
        offset = 0;
        loadPokemons(offset, limit);
    } else {
        offset = offset - limit;
        loadPokemons(offset, limit);
    }
})
