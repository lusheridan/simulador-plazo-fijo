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

function soloButton() {
    const totalDeposit = prompt('Ingresa monto a invertir: ');
    const days = prompt('Ingresa el tiempo en el cual deseas mantener el plazo fijo (NOTA: Mínimo 30 dias y Máximo un año).');
    const rate = 0.35;
    const fixedTermInvestment = new FixedTermInvestment(days, totalDeposit, rate);

    if (fixedTermInvestment.isTimeValid()) {
        const profit = fixedTermInvestment.getProfit();
        alert('Tu ganancia en ' + days + ' dias será de $' + profit.toFixed(2) + '.');
    } else {
        alert('El plazo no es válido, recuerda que el mínimo es 30 dias y el máximo un año.');
    }
}

function groupButton() {
    let deposit;
    let friend;
    let friends = [];
    let parseDeposit;
    let inStopAdd = 'SI';
    let totalDeposit = 0;

    while (inStopAdd === 'SI'){
        friend = prompt('Ingresa el nombre de la persona:');
        deposit = prompt('¿Cuanto va a aportar ' + friend + '?');
        parseDeposit = parseFloat(deposit);
        inStopAdd = prompt('Ingresa "SI" para agregar otra persona al Plazo Fijo y NO para continuar con el Simulacro.').toUpperCase();
        friends.push({name: friend, deposit: parseDeposit});
        totalDeposit += parseDeposit;
    };

    const days = prompt('Ingresa el tiempo en el cual deseas mantener el plazo fijo (NOTA: Mínimo 30 dias y Máximo un año).');
    const rate = 0.35;
    const fixedTermInvestment = new FixedTermInvestment(days, totalDeposit, rate);

    if (fixedTermInvestment.isTimeValid()) {
        const profit = fixedTermInvestment.getProfit();
        alert('La ganancia total entre todos en ' + days + ' dias será de $' + profit.toFixed(2) + '.');
        for (let i = 0; i < friends.length; i++) {
            let friendProfit = (friends[i].deposit / totalDeposit) * profit;
            const li = document.createElement('li');
            li.textContent = 'La ganancia de ' + friends[i].name + ' en ' + days + ' dias será de $' + friendProfit.toFixed(2) + '.'
            listFriends.appendChild(li);
        };
    } else {
        alert('El plazo no es válido, recuerda que el mínimo es 30 dias y el máximo un año.');
    }

}

function removeElementLi() {
    while ( listFriends.firstChild ) {
        listFriends.removeChild( listFriends.firstChild );
    }
}