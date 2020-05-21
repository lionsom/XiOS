# 修饰词

public

protected

public

default



# 继承

## 继承要点：

> 1. 父类也称为超类、基类、派生类等；
> 2. Java中只有单继承，没有C++那样的多继承；
> 3. Java类没有多继承，但接口有多继承；
> 4. 子类继承父类，可以得到父类的全部属性和方法（**除了父类构造方法**），但不见得可以直接访问（如：**父类的Private属性和方法**）；
> 5. 如果定义一个类没有extends，则它的父类默认为：**java.lang.Object**。

## instanceof

> 等同与iOS中的 isKindofClass，判断一个对象是否为某个类的对象。

```
Boolean isSub = stu instanceof Student;
Boolean isSub1 = stu1 instanceof Father;
System.out.println(isSub);
System.out.println(isSub1);
```



# 重写

> 子类重写父类方法
>
> super.run(); 可以先调用父类方法，再执行子类。

## 要点

> 1. 『==』：方法名、形参列表相同；
> 2. 『<=』：返回值类型和声明异常类型，子类小于等于父类；
> 3. 『>=』：访问权限，子类大于等于父类；

```
class Vehicle {
    void run() {
        System.out.println("Father run");
    }
}

class Horse extends Vehicle {

    @Override
    void run() {
        super.run();
        System.out.println("Son run");
    }
}
```



# Object类用法及重写

```
public native int hashCode();

// native 表示需要调用系统内容，而不是java自己实现。
```

## toString()

```
// Object 方法
public String toString() {
        return getClass().getName() + "@" + Integer.toHexString(hashCode());
}

// 调用
Horse h = new Horse();
System.out.println(h.toString());
// out
com.lx.oo.Horse@61bbe9ba

// 重写
@Override
public String toString() {
    return "这是重写的toString";
}

// 重写后再调用
Horse h = new Horse();
System.out.println(h.toString());
// out
这是重写的toString
```

## equals() 与 ==

> ==：表示双方是否相同，基本类型则表示值相等；引用类型表示地址相同则为同一对象。
>
> equals()：Object类中有定义，提供『对象内容相等』的逻辑。

### Object的equals()

```
// Object 默认equals（）
public boolean equals(Object obj) {
		return (this == obj);
}
```

eg1:

```
User u1 = new User(10,"lx", "123");
User u2 = new User(10,"lx", "123");
System.out.println(u1==u2);
System.out.println(u1.equals(u2));

// out
false
falst
```

自定义User类的equals()方法，当id相同时，则认为两个对象相同。

```
@Override
public boolean equals(Object obj) {
    if (this == obj) {
        return true;
    }
    if (obj == null) {
        return false;
    }
    if (getClass() != obj.getClass()) {
        return false;
    }
    // 强制类型转换
    User temp = (User)obj;
    if (id == temp.id) {
        return true;
    }
    return false;
}

User u1 = new User(10,"lx", "123");
User u2 = new User(10,"lxx", "12333");
System.out.println(u1==u2);
System.out.println(u1.equals(u2));

// out
false
ture
```

### Stirng的equals()

```
// String类内部也重写了equals()方法
public boolean equals(Object anObject) {
    if (this == anObject) {
        return true;
    }
    if (anObject instanceof String) {
        String anotherString = (String)anObject;
        int n = value.length;
        if (n == anotherString.value.length) {
            char v1[] = value;
            char v2[] = anotherString.value;
            int i = 0;
            while (n-- != 0) {
                if (v1[i] != v2[i])
                    return false;
                i++;
            }
            return true;
        }
    }
    return false;
}
```

eg:

```
String str1 = new String("111");
String str2 = new String("111");
System.out.println(str1==str2);  // 两个不同对象
System.out.println(str1.equals(str2));	// 读源码，一个个字符比较，字符相等

// out
false
ture
```



# super

> 1. super.run(); 子类中调用覆盖的父类方法；（eg1）
> 2. 子类构造函数中，默认super();调用父类的构造方法，无论写不写，都默认先调用父类构造方法。(eg2)【同静态初始化块，初始化类也是先执行父类的静态初始化块】

eg1：

```
public class Father {
    void run() {
        System.out.println("xx");
    }
}

class Student extends Father {    
    // 重写父类的方法
		@Override	
		void run() {	
				super.run();	// 调用父类的方法
				System.out.println("Son run");
    }
}
```

eg2:

```
class Vehicle extends Object{
		// 父类构造方法
    public Vehicle() {
        System.out.println("父类构造方法");
    }
}

class Horse extends Vehicle {
		// 子类构造方法
    public Horse() {
    		super();  // 无论写不写，都默认先调用父类构造方法
        System.out.println("子类构造方法");
    }
}

// out
父类构造方法
子类构造方法
```



# 封装



















