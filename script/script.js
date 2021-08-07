class FixedTermInvestment {
    constructor(days, totalDeposit, rate) {
        this.days = parseInt(days);
        this.totalDeposit = parseFloat(totalDeposit);
        this.rate = parseFloat(rate);
    }

    getProfit() {
        return this.totalDeposit * (this.rate * this.days / 365);
    }

    isTimeValid() {
        return this.days >= 30 && this.days <= 365;
    }
}

const listFriends = document.getElementById('listFriends');

function btnPress(btnId, action){
    let button = document.getElementById(btnId)
    button.addEventListener("click", action)
}

btnPress("groupButton", groupButton);
btnPress("soloButton", soloButton);
btnPress("btn-remove", removeElementLi);
btnPress("getSolo", getSolo);
btnPress("removeSolo", removeSolo);
btnPress("addFriend", addFriend);

function soloButton() {
    const totalDeposit = document.getElementById("totalDeposit").value;
    const days = document.getElementById("days").value;
    const rate = 0.35;
    const fixedTermInvestment = new FixedTermInvestment(days, totalDeposit, rate);

    if (fixedTermInvestment.isTimeValid()) {
        const profit = fixedTermInvestment.getProfit();
        const li = document.createElement('li');
        li.textContent = 'Tu ganancia en ' + days + ' dias será de $' + profit.toFixed(2) + '.';
        solo.appendChild(li);
        localStorage.setItem('soloTotalDeposit', totalDeposit);
        localStorage.setItem('soloDays', days);
        document.getElementById('days').value = '';
        document.getElementById('totalDeposit').value = '';
    } else {
        invalid();
    }
}

function getSolo() {
    document.getElementById("totalDeposit").value = localStorage.getItem('soloTotalDeposit');
    document.getElementById("days").value = localStorage.getItem('soloDays');
}

function removeSolo() {
    const li = document.getElementById('solo');
    while (li.firstChild) {
        li.removeChild(li.firstChild);
    }
}

function groupButton() {
    const days = document.getElementById("groupDays").value;
    const rate = 0.35;
    const fixedTermInvestment = new FixedTermInvestment(days, totalDeposit, rate);

    if (fixedTermInvestment.isTimeValid()) {
        removeElementLi();
        const profit = fixedTermInvestment.getProfit();
        for (let i = 0; i < friends.length; i++) {
            let friendProfit = (friends[i].deposit / totalDeposit) * profit;
            const li = document.createElement('li');
            li.textContent = 'La ganancia de ' + friends[i].name + ' en ' + days + ' dias será de $' + friendProfit.toFixed(2) + '.'
            listFriends.appendChild(li);
        };
        friends = [];
    } else {
        invalid();
    }
}

let friends = [];
let totalDeposit = 0;

function addFriend() {
    const friend = document.getElementById("friend").value;
    const deposit = document.getElementById("deposit").value;
    parseDeposit = parseFloat(deposit);

    if (friend != '' && deposit != '') {
        if (friends.length === 0) {
            removeElementLi();
        }
        const li = document.createElement('li');
        li.textContent = friend + ' puso $' + parseDeposit + '.';
        listFriends.appendChild(li);
        friends.push({name: friend, deposit: parseDeposit});
        totalDeposit += parseDeposit; 
        document.getElementById("friend").value = '';
        document.getElementById("deposit").value = '';
    }

}

function removeElementLi() {
    while (listFriends.firstChild) {
        listFriends.removeChild(listFriends.firstChild);
    }
}

function invalid() {
    let div = document.createElement('div');
    div.className = 'alert alert-success';
    let p = document.createElement('p');
    p.textContent = 'El plazo no es válido, recuerda que el mínimo es 30 dias y el máximo un año.';
    div.appendChild(p);
    let button = document.createElement('button');
    button.innerHTML = "Cerrar";
    button.className = 'btn btn-success';
    div.appendChild(button);
    document.body.appendChild(div);
    button.onclick = function () {
        document.body.removeChild(div)
    }
}