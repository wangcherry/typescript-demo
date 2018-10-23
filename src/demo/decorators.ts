// 装饰器是一种特殊类型的声明，它能够被附加到类声明，方法， 访问符，属性或参数上。 装饰器使用 @expression这种形式，expression求值后必须为一个函数，它会在运行时被调用，被装饰的声明信息做为参数传入。

// 多个装饰器
// 1,由上至下依次对装饰器表达式求值。
// 2,求值的结果会被当作函数，由下至上依次调用。
function f() {// 这是一个装饰器工厂
    console.log("f(): evaluated");
    return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {//  这是装饰器
        console.log("f(): called");
    };
}

function g() {
    console.log("g(): evaluated");
    return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
        console.log("g(): called");
    };
}

class C {
    @f()
    @g()
    public method() {}
}
// f(): evaluated
// g(): evaluated
// g(): called
// f(): called

// 一个例子
export function error(message: string = '请求出错！') {
    return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
        const fn = descriptor.value;
        descriptor.value = async function(...args: any[]) {
            try {
                await fn.call(this, ...args);
            } catch (err) {
                alert((err && err.errorCode) || (err && err.desc) || message);
            }
        };
    };
}
