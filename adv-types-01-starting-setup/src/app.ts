type Admin = {
    name: string;
    privileges: string[];
};

type Employee = {
    name: string;
    startDate: Date;
}

// intersection : combine type || we can use it for makaing interface too
type ElevatedEmployee = Admin & Employee;

const e1: ElevatedEmployee = {
    name: 'Yusuf',
    privileges: ['Create-server'],
    startDate: new Date(),
}

type Combinable = string | number;
type Numeric = number | boolean;

type Universal = Combinable & Numeric;

// function overload (potential combination of add() function)
function add(a: number, b: number): number;
function add(a: string, b: string): string;
function add(a: string, b: number): string;
function add(a: number, b: string): string;

function add(a: Combinable, b: Combinable ){
    // type guard
    if(typeof a === 'string' || typeof b === 'string'){
        return a.toString() + b.toString();
    }
    return a + b;
}

const result = add('Yusuf', ' Yudhistira');
result.split(' ');

const fetchUserData = {
    id: 'U1',
    name: 'Yusuf',
    job: {
        title : 'Developer',
        description : 'My own Company'
    }
}

console.log(fetchUserData.job.title);

// null coalescing
const userInput = null;
const storedData = userInput ?? 'DEFAULT';

type UnknownEmployee = Employee | Admin;

function printEmployeeInformation(emp: UnknownEmployee){
    console.log('Name : ' + emp.name);
    // check if privilege property is in emp object
    if('privileges' in emp){
        console.log('Privileges : ' + emp.privileges);
    }
     // check if startDate property is in emp object
    if('startDate' in emp){
        console.log('Start date : ' + emp.startDate);
    }
}

printEmployeeInformation(e1);

class Car{
    drive(){
        console.log('Driving...');
    }
}

class Truck{
    drive(){
        console.log('Driving a truck...');
    }

    loadCargo(amount: number){
        console.log('Loading Cargo ...' + amount);
    }
}

type Vehicle = Car | Truck;

const v1 = new Car();
const v2 = new Truck();

function useVehicle(vehicle: Vehicle) {
    vehicle.drive();
    // another type guard
    if(vehicle instanceof Truck){
        vehicle.loadCargo(1000);
    }
}

useVehicle(v1);
useVehicle(v2);

// Discriminated unions
interface Bird{
    // type assignment to interface
    type: 'bird';
    flyingSpeed: number;
}

interface Horse{
    type: 'horse';
    runningSpeed: number;
}

type Animal = Bird | Horse;

function moveAnimal(animal: Animal){
    let speed: number;
    // another way for type guard 
    switch (animal.type){
        case 'bird': 
            speed = animal.flyingSpeed;
            break;
        case 'horse':
            speed = animal.runningSpeed;
            break;
    }
    console.log('Moving at speed : ' + speed);
}

moveAnimal({type: 'bird', flyingSpeed: 500});

//const userInputElement = <HTMLInputElement> document.getElementById('user-input')!;
const userInputElement = document.getElementById('user-input')! as HTMLInputElement;
userInputElement.value = 'Hi - there!';

interface ErrorContainer { // {email : 'Not a valid email', userName: 'Must start with a capital character'}
    [prop: string]: string;     
}

const errorBag: ErrorContainer = {
    email: 'Not a valid email!',
    userName: 'Must start with a capital character'
};




