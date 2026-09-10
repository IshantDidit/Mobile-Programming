function math(operation){
    let num1 = Number(document.getElementById("a").value);
    let num2 = Number(document.getElementById("b").value);

    if (operation == 'sum')
    {
        let sum = num1 + num2;
        document.getElementById("result").innerHTML = "Sum: " + sum;
    }
    else if (operation == 'subtract')
    {
       let subtract = num1 - num2;
       document.getElementById("result").innerHTML = "Subtract " + subtract;

    }
    else
    {
        let multiply = num1 * num2;
        document.getElementById("result").innerHTML = "Mulitply: " + multiply;

    }

}