[swifter - 命名空间](https://swifter.tips/namespace/)

[关于 Swift Namespace](https://zhuanlan.zhihu.com/p/133786679)





OC中没有命名空间这一说，都是使用类前缀(Class Prefix)，当作命名空间用区分名称相同的文件，苹果规定，两字前缀苹果拥有所有权，三个字母的前缀为开发者使用。但是不冲突就没事。例如AFNetWorking NSString MBProgressHUD ···

Swift中终于添加了命名空间，在任意类中打印一下self 会出现"命名空间.className"，

Swift 的命名空间是基于 module 而不是在代码中显式地指明，每个 module 代表了 Swift 中的一个命名空间。也就是说，同一个 target 里的类型名称还是不能相同的。

在同一个命名空间下,所有全局变量或者函数共享,不需要import





## 用 `{}` 创建 Namespace

```swift
 func getTrackName(from audio: Audio) -> String? {
      // 1
      var trackName: String? = nil

      // 2
      if let trackName = audio.info[Audio.InfoKey.trackName] as? String {
          // 2
          return trackName
      } else {
          // 只是举个例子，这个 else 什么也不做
          // 3
          var trackName = "另一平行世界里的 trackName"
      }

      do {
          // 4
          var trackName: String = try Shazam.shared.getTrackName(from: audio)
          return trackName
      }

      // 1
      return trackName
  }

  // 5
  var trackName = getTrackName(from: 伏拉夫音频)
```



## 用模块创建 Namespace





## 利用 Namespace

**利用 Namespace 我们可以大幅简化命名**。

比如经常有人写这样的模型：

```swift
struct Student {
    var student_id: String
    var student_name: String
}
```

当然可以改成：

```swift
struct Student {
    var id: String
    var name: String
}
```



## 自己的命名空间

**原理：** 对原类型进行一层封装。然后，对这个封装进行自定义的方法扩展。

https://juejin.cn/post/6844903886407335950

https://www.jianshu.com/p/527ca32ef380

https://medium.com/@thibault.wittemberg/versatile-namespace-in-swift-3e8bbd6b6250