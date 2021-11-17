let userInput: unknown;
let userName: string;

userInput = 5;
userInput = 'Yusuf';
// unknown data type : check before asign, any data type does not need it
if(typeof userInput === 'string'){
    userName = userInput;
}
// never: does not return anything including 'undifined'
function generateError(message: string, code: number):never {
    throw {message: message, errorCode: code}
}

const result = generateError('An error occured', 500);
console.log(result);

