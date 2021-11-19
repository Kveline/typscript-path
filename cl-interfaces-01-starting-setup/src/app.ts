class Department{
    // private : cannot access it outside class, and extending class
    // protected : cannot access it outside class, but not for extending class
    // private readonly id: string;
    // private name: string;
    protected employees: string[] = [];
    constructor(private readonly id: string, public name: string){
        this.id = id;
        this.name = name;
    }
    describe(this: Department){
        console.log(`Department (${this.id}: ${this.name})`);
    }
    addEmployee(employee: string){
        this.employees.push(employee);
    }
    printEmployeeInformation(){
        console.log(this.employees.length);
        console.log(this.employees);
    }
}
// extends => inheritance
class ITDepartment extends Department{
    admins: string[];
    constructor(id: string, admins: string[]){
        // super() => call departement constructor
        super(id, 'IT');    
        this.admins = admins;
    }
}

class AccountingDepartment extends Department{
    private lastReport: string;

    // getter
    get mostRecentReport(){
        if(this.lastReport){
            return this.lastReport;
        }
        throw new Error("No report found.");
    }
    // setter
    set mostRecentReport(value: string){
        if(!value){
            throw new Error("Please pass in a valid value!");
        }
        this.addReport(value);
    }

    constructor(id: string, private reports: string[]){
        // super() => call departement constructor
        super(id, 'IT');    
        this.lastReport = reports[0];
    }

    addEmployee(name: string){
        if(name === 'Yusuf'){
            return;
        }
        this.employees.push(name);
    }

    addReport(text: string){
        this.reports.push(text);
        this.lastReport = text;
    }

    printReports(){
        console.log(this.reports);
    }
}

const it =  new ITDepartment('D1', ['Yusuf']);
it.addEmployee('Yusuf');
it.addEmployee('Yudhistira');

it.describe();
it.printEmployeeInformation();

console.log(it);

const accounting = new AccountingDepartment('D2', []);

accounting.mostRecentReport = 'Year End Report';
accounting.addReport('Something went wrong!');
console.log(accounting.mostRecentReport);

accounting.addEmployee('Yusuf');
accounting.addEmployee('Kveline');

accounting.printReports();
accounting.printEmployeeInformation();

// const accountingCopy = {name: 'Computer Science', describe: accounting.describe};
// accountingCopy.describe();
