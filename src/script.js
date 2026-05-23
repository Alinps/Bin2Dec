
let output = document.getElementById("outputelement")
let fromBtn = document.getElementById("inputFrom")
let toBtn = document.getElementById("inputTo")  
const OUTPUT_STATES = ["output--success", "output--error", "output--neutral"]

fromBtn.addEventListener("click",()=>{

    let BtnValue = fromBtn.value;

    switch (BtnValue) {
        case "Bin":
            document.getElementById("forminput").placeholder = "Enter Binary";
            break;
        case "Dec":
            document.getElementById("forminput").placeholder = "Enter Decimal number";
            break;
        case "Hex":
            document.getElementById("forminput").placeholder = "Enter Hexadecimal number"
            break;
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


// function to convert Decimal to Hexadecimal
function DectoHex(inputData){

    let base16Value = Number(inputData);

    if (isNaN(base16Value)){
        setOutputState("output--error", `Please enter a valid decimal number.`)
        return
    }

    let base16 = [0,1,2,3,4,5,6,7,8,9,"A","B","C","D","E","F"]
    let quotient = base16Value;
    let reminder = [];
    reminder.push(quotient % 16)

    while (quotient > 0){
         
        quotient = Math.floor(quotient/16)
        if (quotient < 16) {

            if( quotient === 0){
                break;
            }
            reminder.push(quotient)
        }else{
            reminder.push(quotient % 16);
        }
    }
   let reversedReminder = reminder.reverse();
   let HexArray = reversedReminder.map((value) => base16[value]);
   let result ="0x" + HexArray.join("");
   setOutputState("output--success", `Hexadecimal Value: ${result}`);  
}



function HextoBin(inputData) {
    let HexValue = inputData.toUpperCase();

    if (HexValue.length > 4) {
        setOutputState("output--error", `Enter upto 16 bit Hexadecimal Number`);
        return;
    }

    let HexBinBase  = {
        "0":"0000",
        "1":"0001",
        "2":"0010",
        "3":"0011",
        "4":"0100",
        "5":"0101",
        "6":"0110",
        "7":"0111",
        "8":"1000",
        "9":"1001",
        "A":"1010",
        "B":"1011",
        "C":"1100",
        "D":"1101",
        "E":"1110",
        "F":"1111"
    }
     let HexArray = HexValue.split("")

     for (let value of HexArray) {

        let keys = Object.keys(HexBinBase)

        if(!keys.includes(value)) {
          setOutputState("output--error",`Please enter valid Hexadecimal`)
          return;
        }

     }
     let BinArray = HexArray.map((value) => HexBinBase[value]);

     let result = BinArray.join("");
     setOutputState("output--success",`Binary Value: ${result}`)
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
    }
    else if (inputFrom == "Dec" && inputTo == "Hex"){
        DectoHex(inputValue);
    }
    else if (inputFrom == "Hex" && inputTo == "Bin"){
        HextoBin(inputValue);
    }
    
    else {
         setOutputState("output--error", `Please choose valid options to convert.`)

    }
}