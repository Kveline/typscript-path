// nterface : describe the structure of an object, how this object look like
// interface : not a blueprint like a class, but it is a custom type, interface cannot store the value

// interface function
interface AddFn{
    (a: number, b: number): number;
}

let add: AddFn;
add = (n1: number, n2: number) =>{
    return n1+n2;
}

// interface object
interface Named{
    readonly name: string;
    // add '?' because => this property might exist or not (up to you), you can use this '?' with class too
    outputName?: string;
}

// interface object
// extending interface with 'extends'
interface Greetable extends Named{
    greet(phrase: string): void;
}

class Person implements Greetable{
    name: string;
    age = 20;
    constructor(n: string){
        this.name = n;
    }

    greet(phrase: string){
        console.log(phrase + ' ' + this.name);
    }   
}

// interface as a type
let user1: Greetable;
user1 = new Person('Yusuf');

user1.greet('Hi there - I am');
console.log(user1);
