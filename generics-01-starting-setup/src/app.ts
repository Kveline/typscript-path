// generic type => additional type information
const names: Array<string>= []; //string[]
//names[0].split(' ');

const promise: Promise<string> = new Promise((resolve) => {
    setTimeout(() => {
        resolve('This is done!');
    }, 2000);
})

promise.then(data => {
    data.split(' '); 
})

// genetic function
function merge<T extends Object, U extends Object>(objA: T, objB: U){
     return Object.assign(objA, objB);
}

const mergeObj = merge({name: 'Yusuf'}, {age: 30});
console.log(mergeObj);

interface Lengthy{
    length: number;
}

function countAndDescribe<T extends Lengthy>(element: T): [T, string] {
    let descriptionText = 'Got no value';
    if(element.length === 1){
        descriptionText = 'Got 1 elements.';
    } else if (element.length > 1){
        descriptionText = 'Got ' + element.length + ' elements.';
    }
    return [element, descriptionText];
}

console.log(countAndDescribe('Hi There'));

function extractAndConvert<T extends object, U extends keyof T>(obj: T, key: U){
    return 'Extracted Value : ' + obj[key];
}

console.log(extractAndConvert({name: 'Yusuf', age: 30}, 'name'));

class DataStorage<T extends string | number | boolean>{
    private data: T[] = [];

    addItem(item: T){ 
        this.data.push(item);
    }

    removeItem(item: T){
        if(this.data.indexOf(item) === -1){
            return;
        }
        this.data.splice(this.data.indexOf(item), 1);
    }

    getItems(){
        return [...this.data]
    }
}

const textStorage = new DataStorage<string>();
textStorage.addItem('Yusuf');
textStorage.addItem('Yudhistira');
textStorage.removeItem('Yusuf');
console.log(textStorage.getItems());

const numberStorage = new DataStorage<number>();

// const objStorage = new DataStorage<object>();
// objStorage.addItem({name: 'Yusuf'});
// objStorage.addItem({name: 'Yudhistira'});
// objStorage.removeItem({name: 'Yusuf'});

// console.log(objStorage.getItems());

interface CourseGoal {
    title: string;
    description: string;
    completeUntil: Date;
}

function createCourseGoal(title: string, description: string, completeUntil: Date): CourseGoal{
    // Partial<CourseGoal> => all properties in CourseGoal (interface) are optional
    let courseGoal: Partial<CourseGoal> = {};
    courseGoal.title = title;
    courseGoal.description = description;
    courseGoal.completeUntil = completeUntil;
    return courseGoal as CourseGoal;
}

// read only generic
const names2: Readonly<string[]> = ['Yusuf', 'Yudhistira'];
// names2.push('Perdana');











