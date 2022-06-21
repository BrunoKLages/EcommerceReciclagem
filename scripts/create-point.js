function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf]")                          // query selector seleciona baseado nos filtros passados como argumento

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")                // abre a url com todos os estados do Brasil (IBGE API UF)
        .then(res => res.json())                                                        // depois, pega o resultado e transforma em json, por arrow function
        .then(states => {
            for (const state of states) {                                                       // então, percorre os states passados como argumentos
                ufSelect.innerHTML += `<option value="${state.id}"> ${state.nome} </option`     // cria option no html para cada state encontrado
            }
        })

}                                                                                        // arrow function é uma função anonima, não importa o nome dela

populateUFs()

function getCities(event) {
    const citySelect = document.querySelector("select[name=city]")                  //seleciona campo onde cidades serão mostradas
    const stateInput = document.querySelector("input[name=state]")                  //seleciona campo onde o estado foi selecionado

    const ufValue = event.target.value                                              //pega id de qual estado foi selecionado, value criado na linha 8

    const indexOfSelectedState = event.target.selectedIndex                    //qual o index do estado selecionado na array de options
    stateInput.value = event.target.options[indexOfSelectedState].text         //pega seu texto e substitui o id, para facilitar no futuro , usar na hidden input

    //console.log(event.target)                                                     //mostra todas as cidades

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios` // abre a url com todos os municipios da UF passada

    citySelect.innerHTML = "<option value> Selecione a Cidade </option"
    citySelect.disabled = false

    fetch(url)
        .then(res => res.json())
        .then(cities => {
            for (const city of cities) {
                citySelect.innerHTML += `<option value="${city.nome}"> ${city.nome} </option`
            }
            citySelect.disabled = false                                             //desbloquea acesso da input ao usuario
        })

}

document
    .querySelector("select[name=uf]")           //seleciona campo com UF para ouvir
    .addEventListener("change", getCities)      //addEnvetListener (criterio de mudança, puxe as cidades se mudar )

//itens de coleta

const itemsToCollect = document.querySelectorAll(".items-grid li")

for (const item of itemsToCollect) {
    item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=items]")

let selectedItems = []

function handleSelectedItem(event) {
    const itemLi = event.target

    itemLi.classList.toggle("selected")

    const itemId = itemLi.dataset.id

    const alreadySelected = selectedItems.findIndex(item => item == itemId)  // ((item) => {return item == itemId})

    if (alreadySelected >= 0) {
        const filteredItems = selectedItems.filter(item => item != itemId)
        selectedItems = filteredItems
    }

    else {
        selectedItems.push(itemId)
    }

    console.log(selectedItems)

    collectedItems.value = selectedItems

}

