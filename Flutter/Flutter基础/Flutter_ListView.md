

ListView 加载原理

https://loveky.github.io/2018/07/13/flutter-listview-child-visibility-monitor/



```
ListView({
  List<Widget> children, 
})

ListView.builder({
  int: itemCount,
  IndexedWidgetBuilder itemBuilder,
})

ListView.custom({
  SliverChildDelegate childrenDelegate,
})
```







大家可能对前两种比较熟悉，分别是传入一个子元素列表或是传入一个根据索引创建子元素的函数。其实前两种方式都是第三种方式的“快捷方式”。因为 ListView 内部是[靠这个 `childrenDelegate` 属性动态初始化子元素的](https://github.com/flutter/flutter/blob/master/packages/flutter/lib/src/widgets/scroll_view.dart#L822-L831)。





抽象类：`SliverChildDelegate`

子类：`SliverChildListDelegate `

`SliverChildListDelegate` 中主要逻辑就是实现了 `SliverChildDelegate` 中定义的 `build` 方法：

当通过 `ListView.builder` 方式创建 ListView 时，构造函数自动帮我们创建的是 `SliverChildBuilderDelegate` 实例