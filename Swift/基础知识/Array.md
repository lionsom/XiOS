

# 数组

> 数组以有序的方式来储存相同类型的值。



# 一、初始化

## 1.1、创建空数组

```
// 1.创建空数组
let emptyArray = [String]()				// 使用 let 来声明常量，使用 var 来声明变量。
var someInts = [Int]();
print("someInts is of type [Int] with \(someInts.count) items.")

// print
someInts is of type [Int] with 0 items.
```

## 1.2、创建一个带有默认值的数组

```
var threeDoubles = Array(repeating: 0.0, count: 3)
// threeDoubles 是一种 [Double] 数组，等价于 [0.0, 0.0, 0.0]

var threeDoubles1 = [Int](repeating: 1, count: 3);
// 
```

## 1.3、两个相同类型数组拼接成新数组

```
var threeDoubles = Array(repeating: 0.0, count: 3)
// threeDoubles 是一种 [Double] 数组，等价于 [0.0, 0.0, 0.0]

var anotherThreeDoubles = Array(repeating: 2.5, count: 3)
// anotherThreeDoubles 被推断为 [Double]，等价于 [2.5, 2.5, 2.5]

var sixDoubles = threeDoubles + anotherThreeDoubles
// sixDoubles 被推断为 [Double]，等价于 [0.0, 0.0, 0.0, 2.5, 2.5, 2.5]
```

## 1.4、用数组字面量构造数组

```
var shoppingList = ["Eggs", "Milk"]   
// 由于 Swift 的类型推断机制，所以不必写类型

var shoppingList: [String] = ["Eggs", "Milk"]
// shoppingList 已经被构造并且拥有两个初始项。
```



# 二、访问、修改数组

## 2.1、数据数量 count

```
print("The shopping list contains \(shoppingList.count) items.")
// 输出“The shopping list contains 2 items.”（这个数组有2个项）
```

## 2.2、检测数组为空 isEmpty

```
if shoppingList.isEmpty {
    print("The shopping list is empty.")
} else {
    print("The shopping list is not empty.")
}
// 打印“The shopping list is not empty.”（shoppinglist 不是空的）
```

## 2.3、*下标语法* 来获取数组中的数据项

```
var firstItem = shoppingList[0]
// 第一项是“Eggs”
```

## 2.4、*下标语法* 赋值

```
shoppingList[0] = "Six eggs"
// 其中的第一项现在是“Six eggs”而不是“Eggs”

var shoppingList = ["Eggs", "Milk1", "Milk2", "Milk3", "Milk4", "Milk5"];
shoppingList[3...5] = ["Bananas", "Apples"]
// 将后面3个元素，替换成了2个元素，此时数组数量为5
  [0] = "Eggs"
  [1] = "Milk1"
  [2] = "Milk2"
  [3] = "Bananas"
  [4] = "Apples"
```

## 2.5、插入 insert(_:at:)

```
shoppingList.insert("newInsert", at: 0)
// shoppingList 现在增加1项
// 现在是这个列表中的第一项是“newInsert”
```

## 2.6、后面添加元素 append  / +=

```
shoppingList.append("DDDD")

shoppingList += ["123"]
```

## 2.7、移除 remove(at:)

```
shoppingList.remove(at: 0);
// shoppingList 现在减少1项
// 移除数据项“newInsert”
```

## 2.8、移除头 removeFirst() / 尾 removeLast()

```
shoppingList.removeFirst()
shoppingList.removeLast();
```



# 三、遍历

```
var shoppingList = ["Eggs", "Milk1", "Milk2", "Milk3", "Milk4", "Milk5"];
```

## 3.1、for - in

```
for item in shoppingList {
		print(item);
}
```

## 3.2、enumerate() 获取元素、下标

```
for (index, value) in shoppingList.enumerated() {
		print(index, value);
}

0 Milk1
1 Milk2
2 Bananas
3 DDDD
4 123
```



## 截取













