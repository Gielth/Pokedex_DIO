
const pokeApi = {}

function pokemonDetailsToModeloPokemon (pokeDetails) {
    const pokemon = new Pokemon()
    pokemon.numero = pokeDetails.id
    pokemon.name = pokeDetails.name
    pokemon.sprite = pokeDetails.sprites.other.dream_world.front_default

    const types = pokeDetails.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.typeP = type
    pokemon.abilities = pokeDetails.abilities.map((abilitySlot) => abilitySlot.ability.name)
    pokemon.stats = pokeDetails.stats.map((statsSlot) => statsSlot.base_stat)
    pokemon.url = `https://pokeapi.co/api/v2/pokemon/${pokeDetails.id}`

    return pokemon
}

pokeApi.getPokemonDetails = (pokemon) => {
    return fetch(pokemon)
            .then((response) => response.json())
            .then(pokemonDetailsToModeloPokemon)
            .then((detailsRequests) => (detailsRequests))
            .then((detailsPokemon) => (detailsPokemon))
}


pokeApi.getPokemonsDetails = (pokemons) => {
    return fetch(pokemons.url)
            .then((response) => response.json())
            .then(pokemonDetailsToModeloPokemon)
}

pokeApi.getPokemon = (offset, limit) => {
    const url = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`;
    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonsDetails))
        .then((detailsRequests) => Promise.all(detailsRequests))
        .then((detailsPokemon) => (detailsPokemon))
}

