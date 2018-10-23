// 实现类
interface ILabelledValue {
  size?: number;
  label: string;
  [propName: string]: any; // 不推荐
}

function printLabel(labelledObj: ILabelledValue) {
  console.log(labelledObj.label);
}

let myObj = {size: 10, label: "Size 10 Object"};
printLabel(myObj);

// ====================================================================
// 函数类型
type ISearchFunc = (source: string, subString: string) => boolean;
let mySearch: ISearchFunc;
mySearch = (source: string, subString: string) => {
  const result = source.search(subString);
  return result > -1;
};

// ====================================================================
// 继承接口
interface IShape {
  color: string;
}

interface IPenStroke {
    penWidth: number;
}

interface ISquare extends IShape, IPenStroke {
    sideLength: number;
}

let square = <ISquare> {};
square.color = "blue";
square.sideLength = 10;
square.penWidth = 5.0;

// ====================================================================
// 接口继承类
// 当接口继承了一个类类型时，它会继承类的成员但不包括其实现。
// 就好像接口声明了所有类中存在的成员，但并没有提供具体实现一样。
// 接口同样会继承到类的private和protected成员。 这意味着当你创建了一个接口继承了一个拥有私有或受保护的成员的类时，这个接口类型只能被这个类或其子类所实现（implement）。
// 类定义会创建两个东西：类的实例类型和一个构造函数。
class Control {
  private state: any;
}

interface ISelectableControl extends Control {
  select(): void;
}

class Button extends Control implements ISelectableControl {
  public select() { }
}

class TextBox extends Control {
  public select() { }
}

// 错误：“Image”类型缺少“state”属性。
class Image implements ISelectableControl {
  public select() { }
}
// 在上面的例子里，SelectableControl包含了Control的所有成员，包括私有成员state。
// 因为 state是私有成员，所以只能够是Control的子类们才能实现SelectableControl接口。 因为只有 Control的子类才能够拥有一个声明于Control的私有成员state，这对私有成员的兼容性是必需的。

// 在Control类内部，是允许通过SelectableControl的实例来访问私有成员state的。
// 实际上， SelectableControl接口和拥有select方法的Control类是一样的。
// Button和TextBox类是SelectableControl的子类（因为它们都继承自Control并有select方法），但Image并不是这样的。

// ====================================================================
// 类
class Greeter {
  public greeting: string;
  constructor(message: string) {
      this.greeting = message;
  }
  public greet() {
      return "Hello, " + this.greeting;
  }
}

let greeter = new Greeter("world");

// ====================================================================
// 类继承
class Animal {
  public name: string;
  constructor(theName: string) { this.name = theName; }
  public move(distanceInMeters: number = 0) {
      console.log(`${this.name} moved ${distanceInMeters}m.`);
  }
}
// 在构造函数里访问 this的属性之前，一定要调用 super()。这个是TypeScript强制执行的一条重要规则。
class Snake extends Animal {
  constructor(name: string) { super(name); }
  public move(distanceInMeters = 5) {
      console.log(distanceInMeters, "Slithering...");
  }
}

class Horse extends Animal {
  constructor(name: string) { super(name); }
  public move(distanceInMeters = 45) {
      console.log(distanceInMeters, "Galloping...");
  }
}

let sam: Snake = new Snake("Sammy the Python");
let tom: Animal = new Horse("Tommy the Palomino");

sam.move();
tom.move(34);
