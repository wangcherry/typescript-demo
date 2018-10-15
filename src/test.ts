// ==============1
// function say(text: string) {
//     console.log(text);
// }
// say('Hello!');
// say(996);

// ==============2
type Gender = 'man' | 'woman';
interface IProfile {
    name: string;
    gender: Gender;
    age: number;
    height?: number;
}
function printProfile(profile: IProfile): void {
    console.log('name', profile.name);
    console.log('gender', profile.gender);
    console.log('age', profile.age);
    if (profile.height) console.log('height', profile.height);
}
printProfile({name: 'WangYing', gender: 'woman', age: 23});
