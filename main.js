addEventListener('DOMContentLoaded', (event) => {

    document.getElementById("bill-amount").addEventListener("keyup", () =>
        calculate()
    );

    document.getElementById("people-no").addEventListener("keyup", () =>
        calculate()
    );

    function clearClass() {
        const activeClass = document.querySelector(".tipPercentage.active")
        if (activeClass) {
            activeClass.classList.remove("active");
        }
    }

    const tipButtons = document.getElementsByClassName("tipPercentage")
        for (var i = 0; i < tipButtons.length; i++){
            tipButtons[i].addEventListener("click", (event) => {
                clearClass();
                event.target.classList.add("active");
                document.getElementById("custom-tip").value = "";
                calculate()
            })
        }

    document.getElementById("custom-tip").addEventListener("keyup", () => {
        const removeActive = document.getElementsByClassName("tipPercentage");
        for(i = 0; i < removeActive.length; i++){
            removeActive[i].classList.remove("active")
        }
        calculate()

    });

    document.getElementById("reset").addEventListener("click", () => {
        const inputs = document.getElementsByTagName("input");
        for(i = 0; i < inputs.length; i++){
            inputs[i].value = ""
        }

        const removeActive = document.getElementsByClassName("tipPercentage");
        for(i = 0; i < removeActive.length; i++){
            removeActive[i].classList.remove("active")
        }

        calculate()

    })

});


function calculate () {
    document.getElementById("tip-amount-person").innerText = "0";
    document.getElementById("total-amount-person").innerText = "0";

    const billAmount = parseFloat(document.getElementById("bill-amount").value);

    if (isNaN(billAmount)) return;

    const tip = document.querySelector(".tipPercentage.active");
    const customPercentage = parseInt(document.getElementById("custom-tip").value);

    if (tip == null && customPercentage == 0) {
       return;
    }

    let tipPercentage = 0;

    if(customPercentage){
        tipPercentage = customPercentage;
    } else if(tip != null) {
        tipPercentage = tip.dataset.percentage;
    }

    if(tipPercentage <= 0) return;

    const nrPeople = parseInt(document.getElementById('people-no').value);

    if (isNaN(nrPeople)) return;

    const calculatedTip = calculateTip(billAmount, tipPercentage, nrPeople);

    document.getElementById("tip-amount-person").innerText = calculatedTip.tip;
    document.getElementById("total-amount-person").innerText = calculatedTip.total;
}

function calculateTip (billAmount, tipPercentage, nrPeople) {

    const tipAmountPerson = tipPercentage / 100 * billAmount / nrPeople;
    const totalAmountPerson = billAmount / nrPeople + tipAmountPerson;
    const calculationValues = {
        tip: Math.round(tipAmountPerson * 100)/100,
        total: Math.round(totalAmountPerson * 100)/100
    };
    return calculationValues;
}