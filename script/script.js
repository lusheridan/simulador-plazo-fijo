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
const btnUsdRates = $('#btn-rates');
const btnRemoveGroup = $('#btn-remove-group')
const groupDaysInput = $('#groupDays');
const listFriends = $('#listFriends');
let friends = [];
let totalDeposit = 0;

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

btnUsdRates.on("click", function(event) {
    event.preventDefault();
    usdRates()
});

btnRemoveGroup.on("click", function(event) {
    event.preventDefault();
    removeGroup();
});

function soloButton() {
    const totalDeposit = totalDepositInput.val();
    const days = daysInput.val();
    const rate = 0.35;
    const fixedTermInvestment = new FixedTermInvestment(days, totalDeposit, rate);

    if (fixedTermInvestment.isTimeValid()) {
        const profit = fixedTermInvestment.getProfit();
        soloUl.append('<div class="card border-success mb-3" style="max-width: 77rem; margin-top: 2rem"><div class="card-body text-dark"><p class="card-text text-center">Tu ganancia en ' + days + ' dias será de $' + profit.toFixed(2) + '.</p></div></div>');
        localStorage.setItem('soloTotalDeposit', totalDeposit);
        localStorage.setItem('soloDays', days);
        daysInput.val('');
        totalDepositInput.val('');
    } else {
        invalid('invalid-solo');
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

function removeGroup() {
    listFriends.empty();
    groupDaysInput.val('');
    friendInput.val('');
    depositInput.val('');
}

function groupButton() {
    const days = groupDaysInput.val();
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
        invalid('invalid-group');
    }
}

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

function invalid(divId) {
    const invalid = $('#' + divId);
    invalid.append('<div class="alert alert-danger"><p>El plazo no es válido, recuerda que el mínimo es 30 dias y el máximo un año.</p><button class="btn btn-danger" id="btn-'+ divId + '">Cerrar</button></div>');
    invalid.hide().fadeIn()
    $('#btn-'+ divId).on("click", function(event){
        event.preventDefault();
        invalid.fadeOut(300, function() {
            $(this).empty();
        });
    })         
}

function usdRates() {
    const URL = 'data/usdRates.json';
    const load =$('#load');
    load.append('<div class="d-flex justify-content-center"><div class="spinner-border text-success" role="status"><span class="sr-only"></span></div></div>')  
    $.getJSON(URL, function(response, status){
        load.empty();
        const findName = $('#rates').val();
        if(status === 'success') {
            const rate = response.find(rate => rate.id === findName);
            load.append('<div class="card border-success mb-3" style="max-width: 77rem; margin-top: 2rem"><div class="card-body text-dark"><p class="card-text text-center">' + rate.nombre + rate.compra + rate.venta + '</p></div></div>');
        }
        else{
            load.append('<div class="alert alert-danger"><p>Algo salió mal... Intenta de nuevo más tarde.</p><button class="btn btn-danger" id="btnInvalid">Cerrar</button></div>')
        }
    })
}