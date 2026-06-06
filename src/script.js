
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
    return decimalNumber;

}


//function to convert Decimal to Binary
function DectoBin(inputData) {

    let inputValue = Number(inputData);
      if (isNaN(inputValue)){
        setOutputState("output--error", "Enter a valid decimal number");
        return;
    }
    if (inputValue < 0) {
        setOutputState("output-error", "Negative number conversion is not available.")
        return
    }
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
     return result;

    }


// function to convert Decimal to Hexadecimal
function DectoHex(inputData){

    let base16Value = Number(inputData);

    if (isNaN(base16Value)){
        setOutputState("output--error", `Please enter a valid decimal number.`)
        return
    }

    if (base16Value< 0) {
        setOutputState("output-error", "Negative number conversion is not available.")
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


// function to convert Hexadecimal number to Binary number
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



// function to convert Hexadecimal number to Decimal number.
function HextoDec(inputData){
    let hexDecBase = {
        "0":0,
        "1":1,
        "2":2,
        "3":3,
        "4":4,
        "5":5,
        "6":6,
        "7":7,
        "8":8,
        "9":9,
        "A":10,
        "B":11,
        "C":12,
        "D":13,
        "E":14,
        "F":15
        }

    let hexValue = inputData.toUpperCase();
    let hexArray = hexValue.split("");
    let arrayLength = hexArray.length;

    if (arrayLength > 4){
        setOutputState("output--error", "Enter upto 16 bit Hexadecimal Number.");
        return;
    }

    for (let value of hexArray) {
        
        let keys = Object.keys(hexDecBase);

        if(!keys.includes(value)) {
            setOutputState("output--error",`Please enter valid Hexadecimal`);
            return;
        }
    }

    let decValue = 0;

    for (let i = arrayLength - 1; i >=0; i--){
        decValue += hexDecBase[hexArray[i]] * (16 ** Math.abs((arrayLength-1)-i))
    }
   
    setOutputState("output--success",`Decimal Value: ${decValue}`)
    return decValue;
    
}


// convert decimal to octal number.
function DectoOct(inputData) {
    let inputValue = Number(inputData);
    if (isNaN(inputValue)){
        setOutputState("output--error", "Enter a valid decimal number");
        return;
    }
    if (inputValue < 0) {
        setOutputState("output-error", "Negative number conversion is not available.")
        return
    }
    let quotient = inputValue;
    let reminder;
    let octalValue = []

    while (quotient > 0) {
        reminder = quotient % 8 ;
        quotient = Math.floor(quotient / 8);
        octalValue.push(reminder);
    }
    octalValue = octalValue.reverse();
    let result = octalValue.join("");
    setOutputState("output--success",`Octal Value: ${result}`);
    return result;
    
}

// function to convert binary number to hexadecimal
function BintoHex(inputData){
    let inputBinValue = inputData;
    if (inputBinValue.length > 16){
        setOutputState("output--error","Enter upto 16 bit binary number")
        return;
    }
    let binHex = {
        "0000":0,
        "0001":1,
        "0010":2,
        "0011":3,
        "0100":4,
        "0101":5,
        "0110":6,
        "0111":7,
        "1000":8,
        "1001":9,
        "1010":"A",
        "1011":"B",
        "1100":"C",
        "1101":"D",
        "1110":"E",
        "1111":"F"
    
    }
    let result = [];
    let hexValue = [];
    for(let i=0; i<inputBinValue.length;i=i+4) {
        result.push(inputBinValue.slice(i,i+4));
   
        }
    for (let value of result){
        if( !(value in binHex)){
            setOutputState("output--error","Invalid Binary number");
            return;
        }
        hexValue.push(binHex[value])
    }
    hexValue = "0x" + hexValue.join("");
    setOutputState("output--success", `Hex Value: ${hexValue}`);    


   }


   function OctToDec(inputData){
    let input = inputData;
    let octDigit = [0,1,2,3,4,5,6,7];
    let inputArray = input.split("").reverse();
    let decValue = 0;
    for (let i = inputArray.length -1 ; i >= 0; i--){
        if (!(inputArray[i] in octDigit)){
            setOutputState("output--error", "Please enter a valid Octal number")
            return;
        }
        decValue += inputArray[i] * Math.pow(8,i)
    }
    setOutputState("output--success", `Decimal Value: ${decValue}`)
}

        
 

   // binary to octal
   function BintoOct(inputData){
    let input =  Number(inputData);
    if (isNaN(input)){
        setOutputState("output--error", "Enter a valid binary number");
        return;
    }
    input = String(input)
    if (input < 0) {
        setOutputState("output-error", "Negative number conversion is not available.")
        return
    }
    let decValue = BintoDec(input)
    let OctValue = DectoOct(decValue)
    setOutputState("output--success", `Oct Value: ${OctValue}`);    

   }


   function HextoOct(inputData){
    let input = inputData;
    if (input.length > 4){
        setOutputState("output--error",`Enter upto 16 bit Hexadecimal Number`);
        return
    }
    let DecValue = HextoDec(input);
    let OctValue = DectoOct(DecValue);
    setOutputState("output--success",`Octal Value: ${OctValue}`)
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
    else if(inputFrom == "Bin" && inputTo == "Hex"){
        BintoHex(inputValue);
    }
    else if(inputFrom == "Bin" && inputTo == "Oct"){
        BintoOct(inputValue);
    }
    else if (inputFrom == "Dec" && inputTo == "Bin") {
        DectoBin(inputValue);
    }
    else if (inputFrom == "Dec" && inputTo == "Hex"){
        DectoHex(inputValue);
    }
     else if (inputFrom == "Dec" && inputTo == "Oct"){
        DectoOct(inputValue);
    }
    else if (inputFrom == "Hex" && inputTo == "Bin"){
        HextoBin(inputValue);
    }
    else if (inputFrom == "Hex" && inputTo == "Dec" ){
        HextoDec(inputValue);
    }
    else if (inputFrom == "Hex" && inputTo == "Oct"){
        HextoOct(inputValue);
    }
    else if (inputFrom = "Oct" && inputTo == "Dec"){
        OctToDec(inputValue);
    }
 
    
    else {
         setOutputState("output--error", `Please choose valid options to convert.`)

    }
}