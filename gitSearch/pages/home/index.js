const input = document.querySelector('.input')
const button = document.querySelector('.button')

button.addEventListener('click', async (event) => {
    event.preventDefault();
    await getInformationUser(input.value);
    button.innerHTML = '<img src="../../assets/img/spinner.png" alt="">'
});

function disabled() {
    const input = document.querySelector('.input')
    const button = document.querySelector('.button')
    input.addEventListener('keypress', function() {
        if (input.value !== 0) {
            button.disabled = false
            button.classList.add("buttonAtivo")
        }
        else {
            button.disabled = true
            button.classList.add('buttonInativo')
            
        }
    })
}
disabled()


function criarAdcRecentemente(object, pos) {
    let divPrincipal = document.querySelector('.achados')

    let aImg = document.createElement('a')
    aImg.innerText = "Acessar este perfil"

    let img = document.createElement('img')
    img.classList.add('buttonImg')
    img.src = object.avatar_url

    img.addEventListener('click', function () {
        getOldUser(pos);
    })

    img.addEventListener("mouseover", (event) => {
        event.preventDefault()
        aImg.classList.remove("esconde")
        divPrincipal.appendChild(aImg)
    })

    aImg.addEventListener("mouseout", (event) => {
        event.preventDefault()
        aImg.classList.add("esconde")
        divPrincipal.removeChild(aImg)
    })

    divPrincipal.appendChild(img)
    return divPrincipal
}

function renderAdcRecentemente(array) {
    let pos = -1;
    array.forEach(element => {
        pos += 1;
        let divPrincipal = document.querySelector('.achados')
        let jsonParsed = JSON.parse(element)
        divPrincipal = criarAdcRecentemente(jsonParsed, pos)
    });
}

renderAdcRecentemente(lastUsers)