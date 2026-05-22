
let output = document.getElementById("outputelement")
let fromBtn = document.getElementById("inputFrom")
let toBtn = document.getElementById("inputTo")  
const OUTPUT_STATES = ["output--success", "output--error", "output--neutral"]

fromBtn.addEventListener("click",()=>{
    if (fromBtn.value == "Bin"){
        document.getElementById("forminput").placeholder = "e.g. 10101101"
    } else {
         document.getElementById("forminput").placeholder = "Enter decimal number"
    }
})


// for displaying the output with correct state
function setOutputState(state, message) {
    output.classList.remove(...OUTPUT_STATES)
    output.classList.add(state)
    output.innerText = message
}

//function to convert binary to decimal
function BintoDec(input){
    

    let inputValue = input;
    let decRep = [32768,16384,8192,4096,2048,1024,512,256,128,64,32,16,8,4,2,1];
    let array = inputValue.split("");

    if (inputValue.length === 0){
        setOutputState("output--error", "Please enter a binary number.");
        return;
    }
    
    if (array.length > 16){
        setOutputState("output--error", "Max 16 digits.");
        return;
    }

    let extraLength = 0;

    if (array.length < 16) {

        extraLength = 16 - array.length ;

    }
    
    let decimalNumber=0;
    for(let i = array.length-1; i>=0; i--){

        const digit = Number(array[i]);

        if (digit !== 0 && digit !== 1){
            setOutputState("output--error", "Only binary numbers are allowed.")
            return;
        }
        decimalNumber += digit * decRep[i + extraLength]
    }
    setOutputState("output--success", `Decimal value: ${decimalNumber}`)

}


//function to convert Decimal to Binary
function DectoBin(inputData) {

    let inputValue = Number(inputData);
    let quotient = inputValue;
    let reminder = 0;
    let BinaryNumber = [];
    BinaryNumber.push(inputValue % 2)
    while(quotient != 1){
             quotient = Math.floor(quotient / 2);
             reminder = quotient % 2;
             BinaryNumber.push(reminder);
        }
        
     let result =  BinaryNumber.reverse().join("");
     setOutputState("output--success", `Binary Value: ${result}`);  

    }




// function triggers the convert button
function handleConvert(){
    let inputValue =  document.getElementById("forminput").value.trim()
    let inputFrom = fromBtn.value
    let inputTo = toBtn.value;

    if (inputValue === ""){
        setOutputState("output--error", "Input field is empty.");
        return;
    }

    if (inputValue.length > 16){
        setOutputState("output--error", "Max 16 digits.");
        return;
    }

    if (inputFrom == "Bin" && inputTo == "Dec"){
        BintoDec(inputValue);
    }
    else if (inputFrom == "Dec" && inputTo == "Bin") {
        DectoBin(inputValue);
    }else {
         setOutputState("output--error", `Please choose valid options to convert.`)

    }
}