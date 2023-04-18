// import prompt from 'prompt-sync';

var prompt = require('prompt-sync')();

let foundCorrectNumber = false;
let arr = [];

const start = Date.now();
while (arr.length !== 3) {
  // Get user input
  let code = prompt('Enter RFID Code: ');
  
  if (arr.indexOf(code) === -1) {
    arr.push(code);
    console.log('Reading RFID Code : ' +  code);
    console.log("ARR SIZE: " + arr.length);
  }


  
  // Convert the string input to a number
  

//   foundCorrectNumber =  true;

}

const end = Date.now();
console.log(`Execution time: ${end - start} ms`);
console.log(arr);