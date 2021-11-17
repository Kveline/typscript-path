enum Status {ADMIN, READ_ONLY, AUTHOR};

const person: {
    name: string;
    age: number;
    hobbies: string[];
    // tupple, special array with specific length and data type
    role: [number, string];
    status:  Status;
} = {
    name : 'Yusuf',
    age : 20,
    hobbies: ['Sports', 'Cooking'],
    role: [2, 'author'],
    status: Status.ADMIN
}

let favoriteActivities: string[];
let favoriteLetter: any;
favoriteActivities = ["Cooking", "Jogging"];
console.log(person);

for(const hobby of person.hobbies){
    console.log(hobby);
}
