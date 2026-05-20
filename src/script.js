
let output = document.getElementById("outputelement")
const OUTPUT_STATES = ["output--success", "output--error", "output--neutral"]

function setOutputState(state, message) {
    output.classList.remove(...OUTPUT_STATES)
    output.classList.add(state)
    output.innerText = message
}

function BintoDec(){
    
    let input = document.getElementById("forminput").value.trim()
    let decRep = [128,64,32,16,8,4,2,1]
    let array = input.split("")

    if (input.length === 0){
        setOutputState("output--error", "Please enter a binary number.")
        return;
    }
    
    if (array.length > 8){
        setOutputState("output--error", "Max 8 digits.")
        return;
    }
    
    let decimalNumber=0;
    for(let i = array.length-1; i>=0; i--){

        const digit = Number(array[i])

        if (digit !== 0 && digit !== 1){
            setOutputState("output--error", "Only binary numbers are allowed.")
            return;
        }
        decimalNumber += digit * decRep[i]
    }
    setOutputState("output--success", `Decimal value: ${decimalNumber}`)
}
