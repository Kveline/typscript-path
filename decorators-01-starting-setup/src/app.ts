// Decorator => doing something with a function when your class is defined
function Logger(logString: String){
    return function(constructor: Function){ 
        console.log(logString);
        console.log(constructor);
    }
}

function WithTemplate(template: string, hookId: string){
    return function<T extends {new(...args: any[]): {name: string}}>(originalConstructor: T){
        // return new contructor function
        return class extends originalConstructor{
            constructor(..._: any){
                // using super() to save original class
                super();
                console.log("Rendering template...");
                const hookEl = document.getElementById(hookId);
                if(hookEl){
                    hookEl.innerHTML = template;
                    hookEl.querySelector('h1')!.textContent = this.name;
                } 
            }
        }
    }
}

@Logger('LOGGING - PERSON ...') //decorator run when this class is defined
@WithTemplate('<h1> My First App! </h1>', 'app')
class Person{
    name = 'Yusuf'
    constructor(){
        console.log("Creating person object...");
    }   
}

const pers = new Person();
console.log(pers);

function Log(target: any, propertyName: string | symbol){
    console.log('Property Decorator!');
    console.log(target, propertyName);
}

function Log2(target: any, name: string, descriptor: PropertyDescriptor): PropertyDescriptor {
    console.log('Accesor decorator!');
    console.log(target);
    console.log(name);
    console.log(descriptor);
    return {};
}
 
function Log3(target: any, name: string | Symbol, descriptor: PropertyDescriptor){
    console.log('Method decorator!');
    console.log(target);
    console.log(name);
    console.log(descriptor);
}

function Log4(target: any, name: string | Symbol, position: number){
    console.log('Parameter decorator!');
    console.log(target);
    console.log(name);
    // parameter position which has decorator
    console.log(position);
}

class Product{
    // property decorator
    @Log
    title: string;
    private _price: number;
    // accessor decorator
    @Log2
    set Price(value: number){
        if(value > 0){
            this._price = value;
        } else {
            throw new Error("Invalid Price - Should be positive!");
        }
    }
    
    constructor(t: string, p: number){
        this.title = t;
        this._price = p;
    }
    // method decorator
    @Log3
    // Log4 => parameter decorator
    getPriceWithTax(@Log4 tax: number){
        return this._price * (1+tax);
    }   
}

const p1 = new Product('Book-1', 19);
const p2 = new Product('Book-2', 19);

function AutoBind(_: any, _2: string, descriptor: PropertyDescriptor){
    const originalMethod = descriptor.value;
    const adjDescriptor: PropertyDescriptor = {
        configurable: true,
        enumerable: false,
        get(){
            const boundFunction = originalMethod.bind(this);
            return boundFunction
        }
    };
    return adjDescriptor;
}

class Printer {
    message = 'This is work!';
    
    @AutoBind
    showMessage(){
        console.log(this.message);
    }
}

const p = new Printer();
const button = document.querySelector('button')!;
button.addEventListener('click', p.showMessage);

// -------------- Validating with decorator ------------- //

interface ValidateConfig{
    [property: string]:{
        [validateProp: string]: string[] // ['required', 'positive']
    }
}

const registeredValidators: ValidateConfig = {};

function Required(target: any, propName: string){
    registeredValidators[target.constructor.name] = {
        ...registeredValidators[target.constructor.name],
        [propName]: ['required']
    }
}
function PositiveNumber(target: any, propName: string){
    registeredValidators[target.constructor.name] = {
        ...registeredValidators[target.constructor.name],
        [propName]: ['positive']
    }
}
function validate(obj: any){
    const objValidatorConfig = registeredValidators[obj.constructor.name];
    if(!objValidatorConfig) return true;
    let isValid = true;
    for(const prop in objValidatorConfig){
        for(const validator of objValidatorConfig[prop]){
            switch (validator){
                case 'required': 
                    isValid = isValid && !!obj[prop];
                    return !!obj[prop];
                case 'positive':
                    isValid = isValid && obj[prop] > 0;
            }
        }
    }
    return isValid;
}

class Course{
    @Required
    title: string;
    @PositiveNumber
    price: number;

    constructor(t: string, p: number){
        this.title = t;
        this.price = p;
    }
}

const courseForm = document.querySelector('form')!;
courseForm.addEventListener('submit', event => {
    event.preventDefault();
    const titleEl = document.getElementById('title') as HTMLInputElement;
    const priceEl = document.getElementById('price') as HTMLInputElement;

    const title = titleEl.value;
    const price = +priceEl.value;

    const createdCourse = new Course(title, price);
    if(!validate(createdCourse)){
        alert("Invalid input, please try again!");
        return;
    }
    console.log(createdCourse);
})