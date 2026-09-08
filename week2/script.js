function sum(){
    let num1 = Number(document.getElementById("a").value);
    let num2 = Number(document.getElementById("b").value);
    let sum = num1 + num2;
    document.getElementById("result1").innerHTML = "Sum: " + sum;
}

function subtract(){
    let num1 = Number(document.getElementById("a").value);
    let num2 = Number(document.getElementById("b").value);
    let difference = num1 - num2;
    document.getElementById("result2").innerHTML = "Difference: " + difference;
}

function multiply(){
    let num1 = Number(document.getElementById("a").value);
    let num2 = Number(document.getElementById("b").value);
    let product = num1 * num2;
    document.getElementById("result3").innerHTML = "Product: " + product;
}