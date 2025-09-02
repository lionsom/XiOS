# 网站

[Dart官网](https://dart.cn/)



[Dart中文网](https://www.dartcn.com/)

[DartPad编程](https://dartpad.cn/)

[Effective Dart: 风格](https://www.dartcn.com/guides/language/effective-dart/style)

[Dart 编程语言规范](https://www.dartcn.com/guides/language/spec)





```dart
// 定义一个函数
printInteger(int aNumber) {
  print('The number is $aNumber.'); // 打印到控制台。
}

// 应用从这里开始执行。
main() {
  var number = 42; // 声明并初始化一个变量。
  printInteger(number); // 调用函数。
}
```

字面量。字面量是一种编译型常量。



## 重要的概念

在学习 Dart 语言时, 应该基于以下事实和概念：

- 任何保存在变量中的都是一个 *对象* ， 并且所有的对象都是对应一个 *类* 的实例。 无论是数字，函数和 `null` 都是对象。所有对象继承自 [Object](https://api.dartlang.org/stable/dart-core/Object-class.html) 类。
- 尽管 Dart 是强类型的，但是 Dart 可以推断类型，所以类型注释是可选的。 在上面的代码中， `number` 被推断为 `int` 类型。 如果要明确说明不需要任何类型， [需要使用特殊类型 `dynamic`](https://www.dartcn.com/guides/language/effective-dart/design#do-annotate-with-object-instead-of-dynamic-to-indicate-any-object-is-allowed) 。

**强类型语言是一种强制类型定义的语言，即一旦某一个变量被定义类型，如果不经强制转换，那么它永远就死该数据类型。而弱类型语言是一种弱类型定义的语言，某一个变量被定义类型，该变量可以根据环境变化自动进行转换，不需要经过现行强制转换。**

* Dart 的类型安全意味着不能使用 `if (*nonbooleanValue*)` 或者 `assert (*nonbooleanValue*)`。 而是应该像下面这样，明确的进行值检查：









## 变量

```dart
// 推荐
var name = 'Bob';

// 如果对象不限定为单个类型，可以指定为 对象类型 或 动态类型
dynamic name = 'Bob';

// 显式声明可以推断出的类型
String name = 'Bob';
```





### 默认值

未初始化的变量默认值是 `null`。即使变量是数字 类型默认值也是 null，因为在 Dart 中一切都是对象，数字类型 也不例外。

```dart
int lineCount;
assert(lineCount == null);
```



### Final 和 Const

**场景**

> 使用过程中从来不会被修改的变量， 可以使用 `final` 或 `const`, 而不是 `var` 或者其他类型。

**区别**

* Final 变量的值只能被设置一次； Const 变量在编译时就已经固定；
* Const 变量 是隐式 Final 的类型；
*  实例变量可以是 `final` 类型但不能是 `const` 类型。 必须在构造函数体执行之前初始化 final 实例变量（在变量声明中，参数构造函数中或构造函数的[初始化列表](https://www.dartcn.com/guides/language/language-tour#initializer-list)中进行初始化。）。
* 如果需要在**编译时**就固定变量的值，可以使用 `const` 类型变量。 
* 如果 Const 变量是类级别的，需要标记为 `static const`。

```dart
const bar = 1000000; // 压力单位 (dynes/cm2)
const double atm = 1.01325 * bar; // 标准气压
```

* Const 关键字不仅可以用于声明常量变量。 还可以用来创建常量值，以及声明创建常量值的构造函数。 任何变量都可以拥有常量值。

```dart
var foo = const [];
final bar = const [];

// 声明 const 的初始化表达式中 const 可以被省略。
const baz = []; // Equivalent to `const []`   
```

* 非 Final ， 非 const 的变量是可以被修改的，即使这些变量 曾经引用过 const 值。

```dart
foo = [1, 2, 3]; // 曾经引用过 const [] 常量值。
```

* Const 变量的值不可以修改：

```dart
baz = [42]; // Error: 常量变量不能赋值修改。
```



## 内建类型

- Number
- String
- Boolean
- List (也被称为 *Array*)
- Map
- Set
- Rune (用于在字符串中表示 Unicode 字符)
- Symbol

### 类型初始化

* 这些类型都可以被初始化为字面量。 例如, `'this is a string'` 是一个字符串的字面量， `true` 是一个布尔的字面量。
* 因为在 Dart 所有的变量终究是一个对象（一个类的实例）， 所以变量可以使用 *构造涵数* 进行初始化。
* 一些内建类型拥有自己的构造函数。 例如， 通过 `Map()` 来构造一个 map 变量。

### Number

Dart 语言的 Number 有两种类型:

| int    | 整数值不大于64位，具体取决于平台。 在 Dart VM 上， 值的范围从 -2^63 到 2^63 - 1. Dart 被编译为 JavaScript 时，使用 [JavaScript numbers,](https://stackoverflow.com/questions/2802957/number-of-bits-in-javascript-numbers/2803010#2803010) 值的范围从 -2^53 到 2^53 - 1. |
| ------ | ------------------------------------------------------------ |
| double | 64位（双精度）浮点数，依据 IEEE 754 标准。                   |

* 数字与字符串转换

```dart
// String -> int
var one = int.parse('1');
assert(one == 1);

// String -> double
var onePointOne = double.parse('1.1');
assert(onePointOne == 1.1);

// int -> String
String oneAsString = 1.toString();
assert(oneAsString == '1');

// double -> String
String piAsString = 3.14159.toStringAsFixed(2);
assert(piAsString == '3.14');
```

* int 特有的传统按位运算操作，移位（<<， >>），按位与（&）以及 按位或（|）。 例如：

```dart
assert((3 << 1) == 6); // 0011 << 1 == 0110
assert((3 >> 1) == 1); // 0011 >> 1 == 0001
assert((3 | 4) == 7);  // 0011 | 0100 == 0111
```



### String

Dart 字符串是一系列 UTF-16 编码单元

* 字符串拼接
* 字符串相等
* 字符串内嵌
* 多行字符串创建
* 创建 “原始 raw” 字符串

```dart
/// 字符串一些基本操作
stringAction() {
  // 1.拼接
  String a = '123';
  var b = a + '456';
  print(b);

  // 2.相等
  if (a == '123') {
    print('相等');
  }

  // 3.内嵌
  var c = 100;
  var d = 'AAAAA插入数字为:$c';
  print(d);

  var e = '插入表达式：${d.toLowerCase()}';
  print(e);

  // 4.多行
  var f = '''123
  3445
  456
  789''';
  print(f);

  // 5.转义字符
  var h = '123\n567';
  print(h);
  var h1 = r'123\n567';
  print(h1);
}
```





### Boolean

Dart 使用 `bool` 类型表示布尔值。 Dart 只有字面量 `true` and `false` 是布尔类型， 这两个对象都是编译时常量。

Dart 的类型安全意味着不能使用 `if (*nonbooleanValue*)` 或者 `assert (*nonbooleanValue*)`。 而是应该像下面这样，明确的进行值检查：

```dart
// 检查空字符串。
var fullName = '';
assert(fullName.isEmpty);

// 检查 0 值。
var hitPoints = 0;
assert(hitPoints <= 0);

// 检查 null 值。
var unicorn;
assert(unicorn == null);

// 检查 NaN 。
var iMeantToDoThis = 0 / 0;
assert(iMeantToDoThis.isNaN);
```



### List

```
var list = [1, 2, 3];

【提示】： Dart 推断 list 的类型为 List<int> 。 如果尝试将非整数对象添加到此 List 中， 则分析器或运行时会引发错误。
```



在 List 字面量之前添加 const 关键字，可以定义 List 类型的编译时常量：

```dart
var constantList = const [1, 2, 3];

constantList[1] = 1; // Error
```



###  Set

在 Dart 中 Set 是一个元素唯一且无需的集合。 Dart 为 Set 提供了 Set 字面量和 [Set](https://api.dartlang.org/stable/dart-core/Set-class.html) 类型。



字面量创建 Set 的一个简单示例：

```dart
var halogens = {'fluorine', 'chlorine', 'bromine', 'iodine', 'astatine'};

【提示】: Dart 推断 halogens 类型为 Set<String> 。如果尝试为它添加一个 错误类型的值，分析器或执行时会抛出错误。
```



要创建一个空集，使用前面带有类型参数的 `{}` ，或者将 `{}` 赋值给 `Set` 类型的变量：

```dart
var names = <String>{};
// Set<String> names = {}; // 这样也是可以的。
// var names = {}; // 这样会创建一个 Map ，而不是 Set 。
```

> 【解惑】**是 Set 还是 Map ？** Map 字面量语法同 Set 字面量语法非常相似。 因为先有的 Map 字母量语法，所以 `{}` 默认是 `Map` 类型。  如果忘记在 `{}` 上注释类型或赋值到一个未声明类型的变量上，  那么 Dart 会创建一个类型为 `Map<dynamic, dynamic>` 的对象。



**日常操作**

* 新增add
* 获取长度

```dart
var elements = <String>{};

// add() 或 addAll() 
elements.add('fluorine');
elements.addAll(halogens);

// length
assert(elements.length == 5);
```



在 Set 字面量前增加 `const` ，来创建一个编译时 Set 常量：

```dart
final constantSet = const {
  'fluorine',
  'chlorine',
  'bromine',
  'iodine',
  'astatine',
};

constantSet.add('helium'); // ERROR
```



### Map

```dart
var gifts = {
  // Key:    Value
  'first': 'partridge',
  'second': 'turtledoves',
  'fifth': 'golden rings'
};

var nobleGases = {
  2: 'helium',
  10: 'neon',
  18: 'argon',
};

提示： Dart 会将 `gifts` 的类型推断为 `Map<String, String>`， `nobleGases` 的类型推断为 `Map<int, String>` 。 如果尝试在上面的 map 中添加错误类型，那么分析器或者运行时会引发错误。 
```

使用 Map 构造函数创建：

```dart
var gifts = Map();
gifts['first'] = 'partridge';
gifts['second'] = 'turtledoves';
gifts['fifth'] = 'golden rings';

var nobleGases = Map();
nobleGases[2] = 'helium';
nobleGases[10] = 'neon';
nobleGases[18] = 'argon';
```



**日常用法**

```dart
var gifts = {'first': 'partridge'};
assert(gifts['first'] == 'partridge');

var gifts = {'first': 'partridge'};
assert(gifts['fifth'] == null);

var gifts = {'first': 'partridge'};
gifts['fourth'] = 'calling birds';
assert(gifts.length == 2);


///  Map 类型运行时常量
final constantMap = const {
  2: 'helium',
  10: 'neon',
  18: 'argon',
};
```





### Rune

在 Dart 中， Rune 用来表示字符串中的 UTF-32 编码字符。

Unicode 定义了一个全球的书写系统编码， 系统中使用的所有字母，数字和符号都对应唯一的数值编码。 

由于 Dart 字符串是一系列 UTF-16 编码单元， 因此要在字符串中表示32位 Unicode 值需要特殊语法支持。



表示 Unicode 编码的常用方法是， `\uXXXX`, 这里 XXXX 是一个4位的16进制数。 例如，心形符号 (♥) 是 `\u2665`。 对于特殊的非 4 个数值的情况， 把编码值放到大括号中即可。 例如，emoji 的笑脸 (�) 是 `\u{1f600}`。



```dart
	var clapping = '\u{1f44f}';
  print(clapping);
  print(clapping.codeUnits);
  print(clapping.runes.toList());

  Runes input = new Runes(
      '\u2665  \u{1f605}  \u{1f60e}  \u{1f47b}  \u{1f596}  \u{1f44d}');
  print(new String.fromCharCodes(input));


/// ============ Console ============
👏
[55357, 56399]
[128079]
♥  😅  😎  👻  🖖  👍
```



### Symbol







# 函数

> Dart 是一门真正面向对象的语言， 甚至其中的函数也是对象，并且有它的类型 [Function](https://api.dartlang.org/stable/dart-core/Function-class.html) 。 这也意味着函数可以被赋值给变量或者作为参数传递给其他函数。 也可以把 Dart 类的实例当做方法来调用。



```dart
// 推荐什么返回类型
bool isNoble(int atomicNumber) {
  return atomicNumber == null;
}

// 也可
isNoble1(int atomicNumber) {
  return atomicNumber == null;
}

// 简写
// => expr 语法是 { return expr; } 的简写。
isNoble2(int atomicNumber) => atomicNumber == null;
// 提示： 在箭头 (=>) 和分号 (;) 之间只能使用一个 表达式 ，不能是 语句 。 例如：不能使用 if 语句 ，但是可以是用 条件表达式.
```



## 函数分类

```dart
void foo() {} // 顶级函数

class A {
  static void bar() {} // 静态方法：为类所有
  void baz() {} // 实例方法：为对象所有
}

// 调用
foo();

A.bar();

A a = A();
a.baz();
```



## 创建函数

> 函数有两种参数类型: required 和 optional。 required 类型参数在参数最前面， 随后是 optional 类型参数。 

* 无命名参数 

```dart
void funtion_1(String firstParam, String secondParam) {
  print('函数参数1' + firstParam + secondParam);
}

// 调用
funtion_1('123', '455');
```

* 位置可选参数

```dart
void funtion_1_1(String firstParam, String secondParam, [String thirdParam]) {
  if (thirdParam == null) {
    print('函数参数1_1' + firstParam + secondParam);
  } else {
    print('函数参数1_1' + firstParam + secondParam + thirdParam);
  }
}

// 调用
funtion_1_1('firstParam', 'secondParam');
funtion_1_1('firstParam', 'secondParam', '可选');
```

* 指定命名参数

```dart
void funtion_2({String firstParam, String secondParam}) {
  if (firstParam == null) {
    print('函数参数2 无first' + secondParam);
  } else {
    print('函数参数2' + firstParam + secondParam);
  }
}

// 调用
funtion_2(secondParam: '123');
funtion_2(firstParam: '123', secondParam: '777');
```

* 参数*@required*，在调用方法是默认出现此参数

```dart
void funtion_3({String firstParam, @required String secondParam}) {
  print('函数参数2' + secondParam);
}

// 调用
funtion_3(secondParam: '12344');
funtion_3(firstParam: '122', secondParam: '2223');
```

* 参数默认值

```dart
void function_4({bool first = true, String second = '123'}) {
  print('$first + $second');
}

// 调用
function_4();
function_4(first: false, second: '568');
```



## 匿名函数

```dart
([[Type] param1[, …]]) {
  codeBlock;
};


var list = ['apples', 'bananas', 'oranges'];
list.forEach((item) {
  print('${list.indexOf(item)}: $item');
});


list.forEach(
    (item) => print('${list.indexOf(item)}: $item'));
```



## 函数返回值

所有函数都会返回一个值。 如果没有明确指定返回值， 函数体会被隐式的添加 `return null;` 语句。

```dart
foo() {}

assert(foo() == null);
```





# 运算符

## 条件表达式

Dart有两个运算符，有时可以替换 [if-else](https://www.dartcn.com/guides/language/language-tour#if-和-else) 表达式， 让表达式更简洁：

```dart
// 如果条件为 true, 执行 expr1 (并返回它的值)： 否则, 执行并返回 expr2 的值。
condition ? expr1 : expr2

// 如果 expr1 是 non-null， 返回 expr1 的值； 否则, 执行并返回 expr2 的值。
expr1 ?? expr2
```

* 场景

> 1. 如果赋值是根据布尔值， 考虑使用 `?:`。
>
>    ```
>    var visibility = isPublic ? 'public' : 'private';
>    ```
>
> 2. 如果赋值是基于判定是否为 null， 考虑使用 `??`。
>
>    ```
>    String playerName(String name) => name ?? 'Guest';
>    ```



## 级联运算符 (..)

```dart
querySelector('#confirm') // 获取对象。
  ..text = 'Confirm' // 调用成员变量。
  ..classes.add('important')
  ..onClick.listen((e) => window.alert('Confirmed!'));
  
// 等价于
var button = querySelector('#confirm');
button.text = 'Confirm';
button.classes.add('important');
button.onClick.listen((e) => window.alert('Confirmed!'));

// 嵌套
final addressBook = (AddressBookBuilder()
      ..name = 'jenny'
      ..email = 'jenny@example.com'
      ..phone = (PhoneNumberBuilder()
            ..number = '415-555-0100'
            ..label = 'home')
          .build())
    .build();
```





# 类

* 每个对象都是一个类的实例，所有的类都继承于 [Object.](https://api.dartlang.org/stable/dart-core/Object-class.html) 。 



## 类的成员变量

```dart
var p = Point(2, 2);

// 为实例的变量 y 设置值。
p.y = 3;

// 可以避免因为左边对象可能为 null 导致的异常
// 如果 p 为 non-null，设置它变量 y 的值为 4。
p?.y = 4;
```



## 构造函数

* 默认构造函数

  在没有声明构造函数的情况下， Dart 会提供一个默认的构造函数。 默认构造函数没有参数并会调用父类的无参构造函数。

* 构造函数不被继承

  子类不会继承父类的构造函数。 子类不声明构造函数，那么它就只有默认构造函数 (匿名，没有参数) 。

* 生成构造函数

```dart
class Point {
  num x, y;

  Point(num x, num y) {
    this.x = x;
    this.y = y;
  }
  
  // 精简
  Point(this.x, this.y);
}

// 使用 this 关键字引用当前实例。
// 若没有命名冲突时，可省略this
```

* 命名构造函数

  使用命名构造函数可为一个类实现多个构造函数， 也可以使用命名构造函数来更清晰的表明函数意图：

```dart
class Point {
  num x, y;

  Point(this.x, this.y);

  // 命名构造函数
  Point.origin() {
    x = 0;
    y = 0;
  }
}
```

* 构造函数调用顺序
  1. 默认情况下，子类的构造函数会自动调用父类的默认构造函数（匿名，无参数）。
  2. 父类的构造函数在子类构造函数体开始执行的位置被调用。 
  3. 如果提供了一个 [initializer list](https://www.dartcn.com/guides/language/language-tour#initializer-list) （初始化参数列表）， 则初始化参数列表在父类构造函数执行之前执行。

```
initializer list （初始化参数列表）
superclass’s no-arg constructor （父类的无名构造函数）
main class’s no-arg constructor （主类的无名构造函数）
```













## 获取对象的类型

使用对象的 `runtimeType` 属性， 可以在运行时获取对象的类型， `runtimeType` 属性回返回一个 [Type](https://api.dartlang.org/stable/dart-core/Type-class.html) 对象。

```dart
print('The type of a is ${a.runtimeType}');
```



## 实例变量

* 声明

```dart
class Point {
  num x; // 声明示例变量 x，初始值为 null 。
  num y; // 声明示例变量 y，初始值为 null 。
  num z = 0; // 声明示例变量 z，初始值为 0 。
}
```

* setter / getter

所有实例变量都生成隐式 *getter* 方法。 非 final 的实例变量同样会生成隐式 *setter* 方法。

```dart
class Point {
  num x;
  num y;
  final z = 20;   // 只有getter，没有setter
}

void main() {
  var point = Point();
  point.x = 4; // Use the setter method for x.
  assert(point.x == 4); // Use the getter method for x.
  assert(point.y == null); // Values default to null.
}
```







## 方法

> 方法是为对象提供行为的函数。



* #### 实例方法

对象的实例方法可以访问 `this` 和实例变量。 以下示例中的 `distanceTo()` 方法就是实例方法：

```dart
import 'dart:math';

class Point {
  num x, y;

  Point(this.x, this.y);

  num distanceTo(Point other) {
    var dx = x - other.x;
    var dy = y - other.y;
    return sqrt(dx * dx + dy * dy);
  }
}
```



* #### Getter 和 Setter

  1. Getter 和 Setter 是用于对象属性读和写的特殊方法；
  2. 每个实例变量都有一个隐式 Getter ，通常情况下还会有一个 Setter；
  3. 使用 `get` 和 `set` 关键字实现 Getter 和 Setter ，能够为实例创建额外的属性。

```dart
class Rectangle {
  num left, top, width, height;

  Rectangle(this.left, this.top, this.width, this.height);

  // 定义两个计算属性： right 和 bottom。
  num get right => left + width;
  set right(num value) => left = value - width;
  num get bottom => top + height;
  set bottom(num value) => top = value - height;
}
```



* ####抽象类

  1. 使用 `abstract` 修饰符来定义 *抽象类* — 抽象类不能实例化。
  2. 抽象类通常用来定义接口，以及部分实现。
  3. 如果希望抽象类能够被实例化，那么可以通过定义一个 [工厂构造函数](https://www.dartcn.com/guides/language/language-tour#工厂构造函数) 来实现。
  4. 抽象类通常具有 [抽象方法](https://www.dartcn.com/guides/language/language-tour#abstract-methods)。

```dart
// 这个类被定义为抽象类，
// 所以不能被实例化。
abstract class AbstractContainer {
  // 定义构造行数，字段，方法...

  void updateChildren(); // 抽象方法。
}
```



* #### 抽象方法

实例方法， getter， 和 setter 方法可以是抽象的， 只定义接口不进行实现，而是留给其他类去实现。 抽象方法只存在于 [抽象类](https://www.dartcn.com/guides/language/language-tour#抽象类) 中。

定义一个抽象函数，使用分号 (;) 来代替函数体：

```dart
abstract class Doer {
  // 定义实例变量和方法 ...

  void doSomething(); // 定义一个抽象方法。
}

class EffectiveDoer extends Doer {
  void doSomething() {
    // 提供方法实现，所以这里的方法就不是抽象方法了...
  }
}
```





## 隐式接口

每个类都隐式的定义了一个接口，接口包含了该类所有的实例成员及其实现的接口。 如果要创建一个 A 类，A 要支持 B 类的 API ，但是不需要继承 B 的实现， 那么可以通过 A 实现 B 的接口。

```dart
// person 类。 隐式接口里面包含了 greet() 方法声明。
class Person {
  // 包含在接口里，但只在当前库中可见。
  final _name;

  // 不包含在接口里，因为这是一个构造函数。
  Person(this._name);

  // 包含在接口里。
  String greet(String who) => 'Hello, $who. I am $_name.';
}

// person 接口的实现。
class Impostor implements Person {
  get _name => '';

  String greet(String who) => 'Hi $who. Do you know who I am?';
}
```

多个接口

```dart
class Point implements Comparable, Location {...}
```





## 枚举类型

```dart
enum Color { red, green, blue }

// 枚举中的每个值都有一个 index getter 方法， 该方法返回值所在枚举类型定义中的位置（从 0 开始）。
assert(Color.red.index == 0);
assert(Color.green.index == 1);
assert(Color.blue.index == 2);

// 使用枚举的 values 常量， 获取所有枚举值列表（ list ）。
List<Color> colors = Color.values;
assert(colors[2] == Color.blue);

// 可以在 switch 语句 中使用枚举， 如果不处理所有枚举值，会收到警告：
var aColor = Color.blue;

switch (aColor) {
  case Color.red:
    print('Red as roses!');
    break;
  case Color.green:
    print('Green as grass!');
    break;
  default: // 没有这个，会看到一个警告。
    print(aColor); // 'Color.blue'
}
```



## 为类添加功能： Mixin

基于 * Mixin 继承* 意味着每个类（除 Object 外） 都只有一个超类， 一个类中的代码可以在其他多个继承类中重复使用。





## 类变量和方法

使用 `static` 关键字实现类范围的变量和方法。





* ####静态变量

静态变量（类变量）对于类级别的状态是非常有用的：

```dart
// 静态变量只到它们被使用的时候才会初始化。

class Queue {
  static const initialCapacity = 16;
  // ···
}

void main() {
  assert(Queue.initialCapacity == 16);
}
```



* ####静态方法

静态方法（类方法）不能在实例上使用，因此它们不能访问 `this` 。 例如：

```dart
import 'dart:math';

class Point {
  num x, y;
  Point(this.x, this.y);

  static num distanceBetween(Point a, Point b) {
    var dx = a.x - b.x;
    var dy = a.y - b.y;
    return sqrt(dx * dx + dy * dy);
  }
}

void main() {
  var a = Point(2, 2);
  var b = Point(4, 4);
  var distance = Point.distanceBetween(a, b);
  assert(2.8 < distance && distance < 2.9);
  print(distance);
}
```





# 泛型







## 使用集合字面量

```dart
var names = <String>['Seth', 'Kathy', 'Lars'];
var uniqueNames = <String>{'Seth', 'Kathy', 'Lars'};
var pages = <String, String>{
  'index.html': 'Homepage',
  'robots.txt': 'Hints for web robots',
  'humans.txt': 'We are people, not machines'
};
```













