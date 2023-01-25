let lastUsers = []

function readLastUser() {
    let user1 = localStorage.getItem("user1")
    if (user1 != null) lastUsers.push(user1)
    let user2 = localStorage.getItem("user2")
    if (user2 != null) lastUsers.push(user2)
    let user3 = localStorage.getItem("user3")
    if (user3 != null) lastUsers.push(user3)

    return lastUsers;
}
readLastUser()

async function getOldUser(pos) {
    localStorage.setItem("currentUser", "user" + (pos + 1))
    window.location.assign('./pages/profile/index.html');
}

async function getInformationUser(nome) {
    let userController = new UserControler();
    let response = await userController.getUser(nome);
    if (response == 'erro') {
        const p = document.querySelector('.pForm')
        p.classList.remove("esconde")
        input.classList.add("inputErro")
    };
    addRecentUser(response);
    window.location.assign('./pages/profile/index.html');
}

function updateCurrentUserName(currentUser) {
    localStorage.setItem("currentUser", currentUser)
}

function addRecentUser(user) {
    if (lastUsers[0] == null) {
        localStorage.setItem("user1", JSON.stringify(user));
        updateCurrentUserName('user1');
    }
    else if (lastUsers[1] == null) {
        localStorage.setItem("user2", JSON.stringify(user));
        updateCurrentUserName('user2');
    }
    else if (lastUsers[2] == null) {
        localStorage.setItem("user3", JSON.stringify(user));
        updateCurrentUserName('user3');
    }
    else {
        lastUsers[0] = lastUsers[1];
        lastUsers[1] = lastUsers[2];
        lastUsers[2] = user;
        localStorage.setItem("user1", JSON.stringify(lastUsers[0]))
        localStorage.setItem("user2", JSON.stringify(lastUsers[1]))
        localStorage.setItem("user3", JSON.stringify(lastUsers[2]))
        updateCurrentUserName('user3');
    }

}

class UserControler {
    async getUser(nome) {
        return fetch('https://api.github.com/users/' + nome).then(response => {
            if (response.status === 404) return 'erro';
            return response.json();
        });
    }
}

