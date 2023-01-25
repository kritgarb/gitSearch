let currentUser;
let userRepositories;

async function getRepositories(nome) {
    return fetch("https://api.github.com/users/" + nome + "/repos").then(response => {
        if (response.status === 404) return;
        return response.json();
    });
}

async function getUserInformation() {
    let currentUserName = localStorage.getItem("currentUser");
    let jsonParsed = localStorage.getItem(currentUserName);
    currentUser = JSON.parse(jsonParsed)
    userRepositories = await getRepositories(currentUser.login)

    
    renderHeader(currentUser)
    renderCard(userRepositories)
}
getUserInformation()


function criarHeader(user) {
    let divHeader = document.querySelector('.header-div')

    let divInfoHeader = document.createElement('div')
    divInfoHeader.classList.add('info-header')

    let avatar = document.createElement('img')
    avatar.src = user.avatar_url

    let divInfoText = document.createElement('div')
    divInfoText.classList.add('info')

    let name = document.createElement('h1')
    name.append(user.name)

    let stack = document.createElement('p')
    stack.append(user.bio)

    let divButtonsHeader = document.createElement('div')
    divButtonsHeader.classList.add('buttons-header')

    let buttonEmail = document.createElement('button')
    buttonEmail.classList.add('button-header-1')
    buttonEmail.innerText = 'Email'
    buttonEmail.addEventListener('click', function(){
        console.log('Não tem email');
    })


    let buttonSair = document.createElement('button')
    buttonSair.classList.add('button-header-2')
    buttonSair.innerText = 'Trocar de usuário'
    buttonSair.addEventListener('click', function (){
        window.location.href = '../../index.html';
    })


    divButtonsHeader.append(buttonEmail, buttonSair)
    divInfoText.append(name, stack)
    divInfoHeader.append(avatar, divInfoText)
    divHeader.append(divInfoHeader, divButtonsHeader)

    return divHeader
}

function renderHeader(user) {
    let divHeader = document.querySelector('.header-div')
    divHeader = criarHeader(user)
}


function criarCards(object) {
    let divPrincipal = document.querySelector('.repo-cards')

    let divCard = document.createElement('div')
    divCard.classList.add('card')

    let h2 = document.createElement('h2')
    h2.append(object.name)

    let p = document.createElement('p')
    p.append(object.description ?? "Sem descrição")

    let divButtons = document.createElement('div')
    divButtons.classList.add('footer-card')

    let button1 = document.createElement('button')
    button1.innerText = 'Repositório'
    button1.addEventListener('click', function(){
        window.location.href = object.html_url
    })

    let button2 = document.createElement('button')
    button2.innerText = 'Demo'
    button2.addEventListener('click', function (){
        window.location.href = object.owner.html_url;
    })

    divButtons.append(button1, button2)
    divCard.append(h2, p, divButtons)
    divPrincipal.append(divCard)

    return divPrincipal
}

function renderCard(repos) {
    repos.forEach(element => {
        let divPrincipal = document.querySelector('.repo-cards')
        divPrincipal = criarCards(element)
    });
}
