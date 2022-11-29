function displayNone(ele) {
  ele.classList.remove("d-block");
  ele.classList.add("d-none");
}

function displayBlock(ele) {
  ele.classList.remove("d-none");
  ele.classList.add("d-block");
}

const config = {
  initialForm: document.getElementById("initial-form"),
  bankPage: document.getElementById("bankPage"),
  sidePage: document.getElementById("sidePage"),
};

let BankAccount = class {
  constructor(firstName, lastName, email, type, accountNumber, money) {
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
  return Math.floor(Math.random() * (max - min) + min);
}

function initializeUserAccount() {
  const form = document.getElementById("bank-form");
  const userAccount = new BankAccount(
    form.querySelectorAll(`input[name="userFirstName"]`).item(0).value,
    form.querySelectorAll(`input[name="userLastName"]`).item(0).value,
    form.querySelectorAll(`input[name="userEmail"]`).item(0).value,
    form.querySelectorAll(`input[name="userAccountType"]`).item(0).value,
    getRandomInteger(1, Math.pow(10, 8)),
    parseInt(
      form.querySelectorAll(`input[name="userFirstDeposit"]`).item(0).value
    )
  );

  console.log(userAccount);

  // config.initialForm.classList.add("d-none");
  // config.bankPage.append(mainBankPage(userBankAccount));

  // 1ページ目非表示
  config.initialForm.classList.add("d-none");

  // 2ページ目の呼び出し
  config.bankPage.append(mainBankPage(userAccount));
}

// 入力ページ
function mainBankPage(userAccount) {
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
  nameP.innerHTML = userAccount.getFullName();
  bankIdP.innerHTML = userAccount.accountNumber;
  initialDepositP.innerHTML = userAccount.initialDeposit;

  infoCon.append(nameP, bankIdP, initialDepositP);
  //return infoCon;
  let balanceCon = document.createElement("div");
  balanceCon.classList.add("d-flex", "bg-danger", "py-1", "py-md-2");

  // ``文字列シンタックスを使って、変数を文字列に挿入することができます。これらはテンプレートリテラルと呼ばれます。
  // テンプレートリテラルの中では、${変数}を使うことによって変数を挿入することができます。今回は$30のように、ドルと$[変数]が同時に使われているので注意しましょう。
  // HTMLコードを文字列として直接挿入することもできます。
  balanceCon.innerHTML = `
        <p class="col-8 text-left rem1p5">Available Balance</p>
        <p class="col-4 text-right rem1p5">$${userAccount.money}</p>
    `;

  let menuCon = document.createElement("div");
  menuCon.classList.add(
    "d-flex",
    "justify-content-center",
    "flex-wrap",
    "text-center",
    "py-3"
  );
  menuCon.innerHTML = `
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

  menuCon
    .querySelectorAll("#withDrawBtn")[0]
    .addEventListener("click", function () {
      withdrawController(userAccount);
    });

  menuCon
    .querySelectorAll("#dipositBtn")[0]
    .addEventListener("click", function () {
      alert("diposit");
    });
  menuCon
    .querySelectorAll("#comeBackLaterBtn")[0]
    .addEventListener("click", function () {
      alert("come back later");
    });

  let container = document.createElement("div");
  container.append(infoCon, balanceCon, menuCon);

  return container;
}

// part of withdrawPage
function billInputSelector(title) {
  let container = document.createElement("div");
  container.innerHTML = `
    <h2 class="pb-3">${title}</h2>
    <div class="form-group row">
        <label for="moneyWithdraw100" class="col-2 col-form-label col-form-label-sm">$100</label>
        <div class="col-10">
            <input type="number" class="form-control form-control-sm text-right withdraw-bill bill-input" data-bill="100" id="moneyWithdraw100" placeholder="5">
        </div>
    </div>
    <div class="form-group row">
        <label for="moneyWithdraw50" class="col-2 col-form-label col-form-label-sm">$50</label>
        <div class="col-10">
            <input type="number" class="form-control form-control-sm text-right withdraw-bill bill-input" data-bill="50" id="moneyWithdraw50" placeholder="1">
        </div>
    </div>
    <div class="form-group row">
        <label for="moneyWithdraw20" class="col-2 col-form-label col-form-label-sm">$20</label>
        <div class="col-10">
            <input type="number" class="form-control form-control-sm text-right withdraw-bill bill-input" data-bill="20" id="moneyWithdraw20" placeholder="2">
        </div>
    </div>
    <div class="form-group row">
        <label for="moneyWithdraw10" class="col-2 col-form-label col-form-label-sm">$10</label>
        <div class="col-10">
            <input type="number" class="form-control form-control-sm text-right withdraw-bill bill-input" data-bill="10" id="moneyWithdraw10" placeholder="3">
        </div>
    </div>
    <div class="form-group row">
        <label for="moneyWithdraw5" class="col-2 col-form-label col-form-label-sm">$5</label>
        <div class="col-10">
            <input type="number" class="form-control form-control-sm text-right withdraw-bill bill-input" data-bill="5" id="moneyWithdraw5" placeholder="1">
        </div>
    </div>
    <div class="form-group row">
        <label for="moneyWithdraw1" class="col-2 col-form-label col-form-label-sm">$1</label>
        <div class="col-10">
            <input type="number" class="form-control form-control-sm text-right withdraw-bill bill-input" data-bill="1" id="moneyWithdraw1" placeholder="4">
        </div>
    </div>
    <div class="text-center money-box p-3">
        <p id="withdrawTotal">$0.00</p>
    </div>
    `;
  return container;
}

function backNextBtn(back, next) {
  let container = document.createElement("div");
  container.innerHTML = `
    <div class="d-flex justify-content-between">
        <div class="col-6 pl-0">
            <button id="withdrawGoBack" class="btn btn-outline-primary col-12 back-btn">${back}</button>
        </div>
        <div class="col-6 pr-0">
            <button id="withdrawProcess" class="btn btn-primary col-12 next-btn">${next}</button>
        </div>
    </div>
    `;
  return container;
}

//メインページからwithdrawページへ遷移
function withdrawController(userAccount) {
  displayNone(config.bankPage);
  displayBlock(config.sidePage);
  config.bankPage.innerHTML = "";
  config.sidePage.innerHTML = "";

  config.sidePage.append(withdrawPage(userAccount));
}

//withdrawPage→メインページへ遷移
function backBankPage(userAccount) {
  displayNone(config.sidePage);
  displayBlock(config.bankPage);
  config.bankPage.append(mainBankPage(userAccount));
}

//withdrawPage作成
function withdrawPage(userAccount) {
  let container = document.createElement("div");
  container.id = "sidePage";
  container.classList.add("p-5");
  let withdrawPage = document.createElement("div");
  container.append(withdrawPage);

  withdrawPage.append(billInputSelector("Please Enter The Withdrawal Amount"));
  withdrawPage.append(backNextBtn("back", "next"));

  let backBtn = withdrawPage.querySelectorAll(".back-btn")[0];
  backBtn.addEventListener("click", function () {
    backBankPage(userAccount);
  });

  let billInputs = withdrawPage.querySelectorAll(".bill-input");

  billInputs.forEach((element) => {
    element.addEventListener("change", (event) => {
      let withdrawTotal = document.getElementById("withdrawTotal");
      withdrawTotal.innerHTML = billSummation(
        billInputs,
        "data-bill"
      ).toString();
    });
  });

  let nextBtn = withdrawPage.querySelectorAll(".next-btn")[0];
  nextBtn.addEventListener("click", function () {
    // nextBtn押下時にpege作成
    config.sidePage.innerHTML = "";
    config.sidePage.append(
      billDialog(
        "The money you are going to take is ... ",
        billInputs,
        "data-bill"
      )
    );
  });

  return container;
}

// 入力値の合計算出
function billSummation(inputElementNodeList, multiplierAttribute) {
  let summation = 0;
  inputElementNodeList.forEach((element) => {
    let value = parseInt(element.value);
    if (element.hasAttribute(multiplierAttribute)) {
      value = parseInt(element.getAttribute(multiplierAttribute)) * value;
    }
    summation += value > 0 ? value : 0;
  });
  return summation;
}

function billDialog(title, inputElementNodeList, multiplierAttribute) {
  let container = document.createElement("div");

  let billElements = "";
  inputElementNodeList.forEach((element) => {
    let value = parseInt(element.value);

    if (value > 0) {
      let bill = "$" + element.getAttribute(multiplierAttribute);
      billElements += `<p class="rem1p3 calculation-box mb-1 pr-2">${value} × ${bill}</p>`;
    }
  });

  let totalString = `<p class="rem1p3 pr-2">total: $${billSummation(
    inputElementNodeList,
    multiplierAttribute
  )}</p>`;

  container.innerHTML = `
    <h2 class="pb-1">${title}</h2>
    <div class="d-flex justify-content-center">
        <div class="text-right col-8 px-1 calculation-box">
            ${billElements}
            ${totalString}
        </div>
    </div>
  `;

  return container;
}
