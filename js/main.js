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
    // let page2 = document.createElement("div");
    // page2.classList.add("bg-green", "col-12", "text-center", "pt-md-4", "px-4", "text-white")
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
    let balanceCon = document.createElement("div");
    balanceCon.classList.add("d-flex", "bg-danger", "py-1", "py-md-2");

    // ``文字列シンタックスを使って、変数を文字列に挿入することができます。これらはテンプレートリテラルと呼ばれます。
    // テンプレートリテラルの中では、${変数}を使うことによって変数を挿入することができます。今回は$30のように、ドルと$[変数]が同時に使われているので注意しましょう。
    // HTMLコードを文字列として直接挿入することもできます。
    balanceCon.innerHTML =
    `
        <p class="col-8 text-left rem1p5">Available Balance</p>
        <p class="col-4 text-right rem1p5">$${bankAccount.money}</p>
    `;

    let menuCon = document.createElement("div");
    menuCon.classList.add("d-flex", "justify-content-center", "flex-wrap", "text-center", "py-3");
    menuCon.innerHTML = 
    `
        <div class="col-lg-4 col-12 py-1 py-md-3 px-0 px-md-1">
            <div id="withDrawBtn" class="p-3 bg-blue hover">
                <h5 class="">WITHDRAWAL</p>
                <i class="bi bi-wallet-fill icon-size"></i>
            </div>
        </div>
        <div class="col-lg-4 col-12 py-1 py-md-3 px-0 px-md-1">
            <div id="dipositBtn" class="p-3 bg-blue hover">
                <h5 class="">DEPOSIT</p>
                <i class="bi bi-coin icon-size"></i>
            </div>
        </div>
        <div class="col-lg-4 col-12 py-1 py-md-3 px-0 px-md-1">
            <div id="comeBackLaterBtn" class="p-3 bg-blue hover">
                <h5 class="">COME BACK LATER</p>
                <i class="bi bi-house-door icon-size"></i>    
            </div>
        </div>
    `;

        menuCon.querySelectorAll("#withDrawBtn")[0].addEventListener("click", 
    function(){
            alert("withdraw");
        });
        menuCon.querySelectorAll("#dipositBtn")[0].addEventListener("click", 
    function(){
        alert("diposit");
    });
        menuCon.querySelectorAll("#comeBackLaterBtn")[0].addEventListener("click", 
    function(){
        alert("come back later");
    });

    let container = document.createElement("div");
    container.append(infoCon, balanceCon, menuCon);

    return container;
}



// form.onsubmit = function(e) {

// }

// <div class="pb-2 pb-md-4 text-right">
//     <p class="py-1">Your Name: Kaiden Herman</p>
//     <p class="py-1">Your Back ID: 12345678</p>
//     <p class="py-1">Your First Deposit: $205.00</p>
// </div>