let balance = 10000;
let PIN = 1234;

function isPinValid() {
    let enteredPin = document.getElementById("pin").value;
    if (enteredPin == PIN) {
        return true;
    } else {
        document.getElementById("message").innerText = "Error: Incorrect PIN!";
        return false;
    }
}

function checkBalance() {
    if (isPinValid()) {
        document.getElementById("message").innerText = "Your current balance is: Rs. " + balance;
    }
}

function withdraw() {
    if (isPinValid()) {
        let amount = Number(document.getElementById("amount").value);

        if (amount <= 0) {
            document.getElementById("message").innerText = "Error: Amount must be greater than 0.";
        } else if (amount % 100 !== 0) {
            document.getElementById("message").innerText = "Error: Amount must be a multiple of 100.";
        } else if (amount > balance) {
            document.getElementById("message").innerText = "Error: NOT ENOUGH balance!";
        } else {
            balance = balance - amount;
            document.getElementById("message").innerText = "Withdrawal successful! New balance: Rs. " + balance;
        }
    }
}

function deposit() {
    if (isPinValid()) {
        let amount = Number(document.getElementById("amount").value);

        if (amount <= 0) {
            document.getElementById("message").innerText = "Error: Amount must be greater than 0.";
        } else if (amount % 100 !== 0) {
            document.getElementById("message").innerText = "Error: Amount must be a multiple of 100.";
        } else {
            balance = balance + amount;
            document.getElementById("message").innerText = "Deposit successful! New balance: Rs. " + balance;
        }
    }
}