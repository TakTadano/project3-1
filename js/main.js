const config = {
    initialForm: document.getElementById("initial-form"),
    bankPage: document.getElementById("bankPage"),
}


let BankAccount = class {
    constructor(firstName, lastName, email, type, accountNumber, money){
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.type = type;
        this.accountNumber = accountNumber;
        this.money = money;
        this.initialDeposit = money;
    }

    getFullName() {
        return this.firstName + " " + this.lastName;
    }
};


function getRandomInteger(max, min) {
    return Math.floor(Math.random() * (max-min) + min);
}

function initializeUserAccount() {
    const form = document.getElementById("bank-form");
    const userAccount = new BankAccount(
        form.querySelectorAll(`input[name="userFirstName"]`).item(0).value,
        form.querySelectorAll(`input[name="userLastName"]`).item(0).value,
        form.querySelectorAll(`input[name="userEmail"]`).item(0).value,
        form.querySelectorAll(`input[name="userAccountType"]`).item(0).value,
        getRandomInteger(1, Math.pow(10, 8)),
        parseInt(form.querySelectorAll(`input[name="userFirstDeposit"]`).item(0).value),
    );
    
    console.log(userAccount);
}

// form.onsubmit = function(e) {

// }