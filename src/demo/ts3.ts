// 新版本引入了一种新的灵活且可扩展的方式来构建项目、对操作参数列表提供了更强大的支持、新的强制显式检查类型、更好的JSX支持、更好的错误UX，等等。

// 项目引用
const tsConfigJson = {
    compilerOptions: {
        // 用于项目引用
        composite: true,
        declaration: true,

        // 其他选项
    },
    references: [// references指定了其他tsconfig.json文件（或包含这个文件的文件夹）。每个引用都是一个带有路径字段的对象，TypeScript知道在构建当前项目时需要首先构建被引用的项目。
        { path: "../foo" },
    ],
};

// 利用元组提取和传递参数列表
// 当函数的 Rest 形参具有元组类型时，元组类型被展开为一系列独立的形参。例如，以下两个定义是等价的：
declare function foo(...args: [number, string, boolean]): void;
declare function foo(args0: number, args1: string, args2: boolean): void;
// 推导
declare function bind<T, U extends any[], V>(f: (x: T, ...args: U) => V, x: T): (...args: U) => V;
declare function f3(x: number, y: string, z: boolean): void;
const f2 = bind(f3, 42);  // (y: string, z: boolean) => void
const f1 = bind(f2, "hello");  // (z: boolean) => void
const f0 = bind(f1, true);  // () => void
f3(42, "hello", true);
f2("hello", true);
f1(true);
f0();

// 元组支持尾部可选元素
// type Coordinate = [number, number, number?];
function foo2(a: boolean, b = 100, c?: string) {
    // ...
}
foo2(true);
foo2(true, undefined, "hello");
foo2(true, 200);

// 元组现在也支持尾部的剩余元素。
// type OneNumberAndSomeStrings = [number, ...string[]];
function foo3(...rest: string[]) {
    // ...
}
foo3();
foo3("hello");
foo3("hello", "world");

// 当没有其他元素存在时，元组中的剩余元素与其自身相同：
type Foo = [...number[]]; // 等同于 `number[]`.

// 最后，元组现在可以是空的！
// type EmptyTuple = [];
function foo4() {
    // ...
}
foo4();

// 错误提示
// const foo5: IFoo = { a: { b: { c: 10000}}};
// type IFoo = { a: { b: { c: string}}};

// 与any一样，可以把任意值赋给unknown。不过，与any不同的是，如果没有使用类型断言，则几乎没有可赋的值。你也不能访问unknown的任何属性，或者调用/构建它们。
// let foo6: unknown;
// console.log(foo6.s);
// let foo7: any;
// console.log(foo7.y);

// 导入重构
import * as dependency from "./dependency";
dependency.bar();
dependency.baz();
