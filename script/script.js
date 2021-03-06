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

    isDepositValid() {
        return this.totalDeposit >= 15000;
    }
}

const formSolo = $('#form-solo');
const formGroup = $('#form-group');
const btnGetSolo = $('#get-solo');
const btnRemoveSolo = $('#remove-solo');
const btnAddFriend = $('#add-friend');
const btnUsdRates = $('#btn-rates');
const btnRemoveGroup = $('#btn-remove-group');
const totalDepositInput = $("#total-deposit");
const daysInput = $('#days');
const soloUl = $('#solo');
const friendInput = $('#friend');
const depositInput = $('#deposit');
const groupDaysInput = $('#range');
const listFriends = $('#list-friends');
let friends = [];
let totalDeposit = 0;
let btnCount = 0;
let banksRates = {};

$('document').ready(function() {
    const URL = 'data/fixedTermRates.json';
    $.getJSON(URL, function(response, status) {
        if (status === 'success') {
            banksRates = response;
        }
    });
});

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
    const rate = banksRates[$("input[name='bank-rate']:checked").val()];
    const fixedTermInvestment = new FixedTermInvestment(days, totalDeposit, rate);

    if (fixedTermInvestment.isTimeValid() && fixedTermInvestment.isDepositValid()) {
        const profit = fixedTermInvestment.getProfit();
        soloUl.hide();
        soloUl.append('<div class="card border-success mb-3" style="max-width: 77rem; margin-top: 2rem"><div class="card-body text-dark"><p class="card-text text-center">Tu ganancia en ' + days + ' dias ser?? de $' + profit.toFixed(2) + '.</p></div></div>');
        soloUl.fadeIn();
        localStorage.setItem('soloTotalDeposit', totalDeposit);
        localStorage.setItem('soloDays', days);
        daysInput.val('');
        totalDepositInput.val('');
    } else if (!fixedTermInvestment.isDepositValid()) {
        invalidMessage('invalid-solo', 'El monto ingresado debe ser mayor a $15000.');
    } else {
        invalidMessage('invalid-solo', 'El plazo no es v??lido, recuerda que el m??nimo es 30 dias y el m??ximo un a??o.');
    }
}

function getSolo() {
    totalDepositInput.val(localStorage.getItem('soloTotalDeposit'));
    daysInput.val(localStorage.getItem('soloDays'));
}

function removeSolo() {
    soloUl.fadeOut(300, function() {
        $(this).empty();
    });
    daysInput.val('');
    totalDepositInput.val('');
}

function removeGroup() {
    listFriends.fadeOut(300, function() {
        $(this).empty();
    });
    friendInput.val('');
    depositInput.val('');
    friends = [];
}

function groupButton() {
    const days = groupDaysInput.val();
    const rate = banksRates[$("input[name='bank-rate']:checked").val()];
    const fixedTermInvestment = new FixedTermInvestment(days, totalDeposit, rate);

    if (fixedTermInvestment.isTimeValid() && friends.length > 1 && totalDeposit >= 15000) {
        removeElementLi();
        const profit = fixedTermInvestment.getProfit();
        listFriends.hide();
        for (let i = 0; i < friends.length; i++) {
            let friendProfit = (friends[i].deposit / totalDeposit) * profit;
            listFriends.append('<div class="card border-success mb-3" style="max-width: 77rem; margin-top: 2rem"><div class="card-body text-dark"><p class="card-text text-center">La ganancia de ' + friends[i].name + ' en ' + days + ' dias ser?? de $ ' + friendProfit.toFixed(2) + '</p></div></div>');
        };
        listFriends.fadeIn();
        friends = [];
    } else if (friends.length <= 1) {
        invalidMessage('invalid-group', 'Debes ingresar al menos dos participantes para el Plazo Fijo Grupal.');
    } else if (totalDeposit < 15000) {
        invalidMessage('invalid-group', 'Entre todos los participantes deben ingresar al menos $15000.');
    } else {
        invalidMessage('invalid-group', 'El plazo no es v??lido, recuerda que el m??nimo es 30 dias y el m??ximo un a??o.');
    }
}

function addFriend() {
    const friend = friendInput.val();
    const deposit = depositInput.val();
    parseDeposit = parseFloat(deposit);
    if (friend == '') {
        invalidMessage('invalid-group', 'El campo de "Participante" no puede quedar vac??o');
    } else if(deposit == '' || deposit < 1) {
        invalidMessage('invalid-group', 'Debes completar el monto con un numero mayor a $1');
    } else {
        if (friends.length === 0) {
            removeElementLi();
        }
        listFriends.hide();
        listFriends.append('<li>' + friend + ' puso $' + parseDeposit +'</li>');
        listFriends.fadeIn();
        friends.push({name: friend, deposit: parseDeposit});
        totalDeposit += parseDeposit; 
        friendInput.val('');
        depositInput.val('');
    }
}

function removeElementLi() {
    listFriends.empty();
}

function invalidMessage(divId, errorMessage) {
    const invalid = $('#' + divId);
    btnCount++;
    invalid.append('<div class="alert alert-danger"><p>' + errorMessage + '</p><button class="btn btn-danger" id="btn-'+ divId + '-' + btnCount + '">Cerrar</button></div>');
    invalid.hide().fadeIn()
    $('#btn-'+ divId + '-' + btnCount).on("click", function(event) {
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
    $.getJSON(URL, function(response, status) {
        load.empty();
        const findName = $('#rates').val();
        if(status === 'success') {
            const rate = response.find(rate => rate.id === findName);
            load.append('<div class="card border-success mb-3" style="margin-top: 2rem"><div class="card-body text-dark"><p class="card-text text-center">' +' '+ 'Compra: $' + rate.compra + ' // ' + 'Venta: $' + rate.venta + '</p></div></div>');
        } else {
            load.append('<div class="alert alert-danger"><p>Algo sali?? mal... Intenta de nuevo m??s tarde.</p><button class="btn btn-danger" id="btnInvalid">Cerrar</button></div>')
        }
    })
}

$("#to-top").click(function () {
    $("html, body").animate({scrollTop: 0}, 50);
});

const
  range = document.getElementById('range'),
  rangeVal = document.getElementById('range-val'),
  setValue = ()=>{
    const
      newValue = Number( (range.value - range.min) * 100 / (range.max - range.min) ),
      newPosition = 10 - (newValue * 0.2);
    rangeVal.innerHTML = `<span>${range.value}</span>`;
    rangeVal.style.left = `calc(${newValue}% + (${newPosition}px))`;
  };
document.addEventListener("DOMContentLoaded", setValue);
range.addEventListener('input', setValue);
