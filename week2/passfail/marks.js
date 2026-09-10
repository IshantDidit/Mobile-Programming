function sum(){
    let num1 = Number(document.getElementById("a").value);
    let num2 = Number(document.getElementById("b").value);
    let num3 = Number(document.getElementById("c").value);
    let num4 = Number(document.getElementById("d").value);
    let num5 = Number(document.getElementById("e").value);
    let num6 = Number(document.getElementById("f").value);
    let num7 = Number(document.getElementById("g").value);
    let num8 = Number(document.getElementById("h").value);
    let sum = num1 + num2 + num3 + num4 + num5 + num6 + num7 + num8;

    document.getElementById("result1").innerHTML = "Sum: " + sum;


    let text = ""
    let text2=""
    let text3=""
    if (sum >= 600){
         text = "Distinction";
         text2="Pass"
    }
    else if (sum>=500){
        text = "First Division";
        text2="pass"
    }
    else if (sum>=400){
        text = "Second Divison";
        text3="Fail"
    }
    else if (sum<400){
        text="No divsion"
        text3="Fail"
    }
    document.getElementById("text1").innerHTML="Verdict: " + text;
    document.getElementById("text2").innerHTML= text2;
    document.getElementById("text3").innerHTML= text3;
    document.getElementById("text2").style.color = "green";
    document.getElementById("text3").style.color = "red";
}
