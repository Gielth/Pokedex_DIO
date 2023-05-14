const pokemonSection = document.getElementById("detailsInDepth");

function pokemonInDepthDetailsToHTML(pokemon) {
    return `
    <div class="inDepthDetails ${pokemon.typeP}">
    <h1 class="name">${pokemon.name}</h1>
    <div class="adjustment">
        <span class="number">${pokemon.numero}</span>
        <div class="types">
            ${pokemon.types.map((type) => `<span class="type ${type}">${type}</span>`).join('')}
        </div>
    </div>
    <img class="detailsSprite"
        src="${pokemon.sprite}"
        alt="${pokemon.name}">
    <div class="pokeDetails">
        <ol class="baseStats">
                <li>HP:__ ${pokemon.stats[0]}</li>
                <li>Atk:_ ${pokemon.stats[1]}</li>
                <li>Def:_ ${pokemon.stats[2]}</li>
                <li>Sp.A: ${pokemon.stats[3]}</li>
                <li>Sp.D: ${pokemon.stats[4]}</li>
                <li>Spd:_ ${pokemon.stats[5]}</li>
        </ol>
        <ul class="abilities"><li>.</li></ul>    
    </div>
    <button id="fecharJanela" onclick="fechaJanela()" type="button" class="fecharJanela">Close</button>
    </div>
    `
}

function openPokemonDetails(url) {
    pokeApi.getPokemonDetails(url)
        .then((pokemon) => {
            const pokemonDetails = pokemonInDepthDetailsToHTML(pokemon);
            pokemonSection.innerHTML = pokemonDetails;
        }).then(() => {
            pokemonSection.style.opacity = 1;
            pokemonSection.style.visibility = "visible";
        })
}


function fechaJanela () {
    pokemonSection.style.opacity = 0;
    pokemonSection.style.visibility = "hidden";
}