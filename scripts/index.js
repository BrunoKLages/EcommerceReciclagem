
const buttonSearch = document.querySelector("#page-home main a")
const modal = document.querySelector("#modal")
const close = document.querySelector("#modal .header a")

//ao ouvir evento de cliqeu no pequisar, mostra tela
buttonSearch.addEventListener("click", () => {
    modal.classList.remove("hide")
})

//ao ouvir evento de cliqeu no botao de fechar, fecha a tela
close.addEventListener("click", () => {
    modal.classList.add("hide")
})