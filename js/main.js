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
    
    // config.initialForm.classList.add("d-none");
    // config.bankPage.append(mainBankPage(userBankAccount));

        // 1ページ目非表示
    config.initialForm.classList.add("d-none");

        // 2ページ目の呼び出し
    config.bankPage.append(mainBankPage(userAccount));
}

function mainBankPage(bankAccount) {
    let infoCon = document.createElement("div");
    infoCon.classList.add("pb-2", "pb-md-4", "text-right");

    let nameP = document.createElement("p");
    nameP.classList.add("py-1");

    // namePと全く同じクラスを持っているのでコピーします。
    let bankIdP = nameP.cloneNode(true);
    let initialDepositP = nameP.cloneNode(true);

    // オブジェクトの情報を挿入
    nameP.innerHTML = bankAccount.getFullName();
    bankIdP.innerHTML = bankAccount.accountNumber;
    initialDepositP.innerHTML = bankAccount.initialDeposit;

    infoCon.append(nameP, bankIdP, initialDepositP);
    //return infoCon;
}



// form.onsubmit = function(e) {

// }

// <div class="pb-2 pb-md-4 text-right">
//     <p class="py-1">Your Name: Kaiden Herman</p>
//     <p class="py-1">Your Back ID: 12345678</p>
//     <p class="py-1">Your First Deposit: $205.00</p>
// </div>