

# Flutter单例

```dart
class EventBus {
  //私有构造函数
  EventBus._internal();

  //保存单例
  static EventBus _singleton = new EventBus._internal();

  //工厂构造函数
  factory EventBus()=> _singleton;
}


/// 调用，获取事件总线单例
var bus = EventBus();
```



**写法二**

```dart
class EventBus {
  /// 私有构造函数
  EventBus._internal() {
    // 初始化...
  }

  /// 实例对象
  static EventBus _instance;

  /// 工厂构造函数
  factory EventBus() => _getInstance();

  /// 获取实例对象
  static EventBus _getInstance() {
    if (_instance == null) {
      _instance = new EventBus._internal();
    }
    return _instance;
  }
}

/// 调用
var bus = EventBus();
```



