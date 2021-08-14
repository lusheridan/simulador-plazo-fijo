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

const formSolo = $('#formSolo');
const btnGetSolo = $('#getSolo');
const btnRemoveSolo = $('#removeSolo');

const formGroup = $('#formGroup');
const btnAddFriend = $('#addFriend');

const totalDepositInput = $("#totalDeposit");
const daysInput = $('#days');
const soloUl = $('#solo');

const friendInput = $('#friend');
const depositInput = $('#deposit');

btnGetSolo.on("click", function(event) {
    event.preventDefault();
    getSolo();
});

btnRemoveSolo.on("click", function(event) {
    event.preventDefault();
    removeSolo();
});

formSolo.submit(function(event) {
    event.preventDefault();
    soloButton();
});

btnAddFriend.on("click", function(event) {
    event.preventDefault();
    addFriend();
});

formGroup.submit(function(event) {
    event.preventDefault();
    groupButton();
});

const listFriends = $('#listFriends');

function soloButton() {
    const totalDeposit = totalDepositInput.val();
    const days = daysInput.val();
    const rate = 0.35;
    const fixedTermInvestment = new FixedTermInvestment(days, totalDeposit, rate);

    if (fixedTermInvestment.isTimeValid()) {
        const profit = fixedTermInvestment.getProfit();
        soloUl.append('<li>Tu ganancia en ' + days + ' dias será de $' + profit.toFixed(2) + '.</li>');
        localStorage.setItem('soloTotalDeposit', totalDeposit);
        localStorage.setItem('soloDays', days);
        daysInput.val('');
        totalDepositInput.val('');
    } else {
        invalid();
    }
}

function getSolo() {
    totalDepositInput.val(localStorage.getItem('soloTotalDeposit'));
    daysInput.val(localStorage.getItem('soloDays'));
}

function removeSolo() {
    soloUl.empty();
    daysInput.val('');
    totalDepositInput.val('');
}

function groupButton() {
    const days = $('#groupDays').val();
    const rate = 0.35;
    const fixedTermInvestment = new FixedTermInvestment(days, totalDeposit, rate);

    if (fixedTermInvestment.isTimeValid()) {
        removeElementLi();
        const profit = fixedTermInvestment.getProfit();
        for (let i = 0; i < friends.length; i++) {
            let friendProfit = (friends[i].deposit / totalDeposit) * profit;
            listFriends.append('<li>La ganancia de ' + friends[i].name + ' en ' + days + ' dias será de $' + friendProfit.toFixed(2) + '.</li>');
        };
        friends = [];
    } else {
        invalid();
    }
}

let friends = [];
let totalDeposit = 0;

function addFriend() {
    const friend = friendInput.val();
    const deposit = depositInput.val();
    parseDeposit = parseFloat(deposit);

    if (friend != '' && deposit != '') {
        if (friends.length === 0) {
            removeElementLi();
        }
        listFriends.append('<li>' + friend + ' puso $' + parseDeposit +'</li>');
        friends.push({name: friend, deposit: parseDeposit});
        totalDeposit += parseDeposit; 
        friendInput.val('');
        depositInput.val('');
    }

}

function removeElementLi() {
    listFriends.empty();
}

function invalid() {
    const invalid = $('#invalid');
    invalid.append('<div class="alert alert-success"><p>El plazo no es válido, recuerda que el mínimo es 30 dias y el máximo un año.</p><button class="btn btn-success" id="btnInvalid">Cerrar</button></div>');
    $('#btnInvalid').on("click", function(){
        invalid.empty();
    })         
}
