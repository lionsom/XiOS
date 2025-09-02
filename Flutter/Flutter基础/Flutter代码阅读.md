# 程序入口 main.dart

[Flutter框架分析（二）-- 初始化](https://juejin.im/post/6844903792006135821#heading-0)

> 默认程序入口 main.dart ，也可以设置程序入口（未研究）。



Flutter app的入口就是函数`runApp()`。

```
void main() {
  runApp(MyApp());
}
```

`runApp()`的函数体位于`widgets/binding.dart`。长这样：

```
void runApp(Widget app) {
  WidgetsFlutterBinding.ensureInitialized()
    ..attachRootWidget(app)
    ..scheduleWarmUpFrame();
}
```

