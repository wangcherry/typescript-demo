let flag: boolean = false;

let num: number = 6;

let title: string = "hello world!";

// 数组，有两种写法
let list: number[] = [1, 2, 3];
let list1: Array<number> = [1, 2, 3];

// 元组(Tuple)
let x: [string, number] = ["hello", 10];

// 枚举
enum Color {Red = 1, Green = 2, Blue = 4}
let c: Color = Color.Green;

// 不确定的可以先声明为any
let notSure: any = 4;

// 声明没有返回值
function warnUser(): void {
    alert("This is my warning message");
}

// 默认情况下null和undefined是所有类型的子类型。 就是说你可以把 null和undefined赋值给number类型的变量。
// 然而，当你指定了--strictNullChecks标记，null和undefined只能赋值给void和它们各自。
let u: undefined = undefined;

let n: null = null;

// 表示的是那些永不存在的值的类型
function error(message: string): never {
    throw new Error(message);
}

// object表示非原始类型，也就是除number，string，boolean，symbol，null或undefined之外的类型。
declare function create(o: object | null): void;
create({ prop: 0 });

// 类型断言，就是知道的比编译器多，主动告诉编译器更多信息，有两种写法
let someValue: any = "this is a string";
let strLength: number = (<string> someValue).length;
let strLength1: number = (someValue as string).length;
