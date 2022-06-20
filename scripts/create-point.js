function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
        .then(res => res.json())
        .then(states => {
            for (const state of states) {
                ufSelect.innerHTML += `<option value="${state.id}"> ${state.nome} </option` //adiciona os estados como opção
            }
        })

}

populateUFs()

function getCities(event) {
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("input[name=state]")
    
    const ufValue = event.target.value

    stateInput.value = event.target.options[event.target.selectedIndex].text

    console.log(event.target)

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    fetch(url)
        .then(res => res.json())
        .then(cities => {
            for (const city of cities) {
                citySelect.innerHTML += `<option value="${city.id}"> ${city.nome} </option`
            }
            citySelect.disabled = false
        })
        
}

document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)

// arrow function é uma função anonima, não importa o nome dela
//query selector seleciona baseado nos filtros passados como argumento
//addEnvetListener (mudança, o que fazer)