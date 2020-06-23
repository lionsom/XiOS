

# 一、Document

[Apple Developer - UserDefaults](https://developer.apple.com/documentation/foundation/userdefaults)

[stackoverflow - How can I use UserDefaults in Swift?](https://stackoverflow.com/questions/31203241/how-can-i-use-userdefaults-in-swift)

# 二、Tips

### 1. NSUbiquitousKeyValueStore

实现数据的跨设备缓存

### 2. 存储默认对象

默认对象必须是属性列表，即 `NSData，NSString，NSNumber，NSNumber，NSDate，NSArray或NSDictionary` 的实例（或对于集合而言，是实例的组合）。 

如果要存储任何 **其他类型的对象**，通常应将其归档以创建NSData实例。

### 3.持久文件引用

如果您使用set（_：forKey :)方法存储特定文件的位置，并且用户移动了该文件，则您的应用在下次启动时可能无法找到该文件。 要通过文件的文件系统标识存储对文件的引用，您可以改用bookmarkData（options：includesResourceValuesForKeys：relativeTo :)方法创建NSURL书签数据，并使用set（_：forKey :)方法将其持久化。 然后，您可以使用URLByResolvingBookmarkData：options：relativeToURL：bookmarkDataIsStale：error：方法将用户默认存储的书签数据解析为文件URL。

### 4.响应默认值更改

您可以使用键值观察来通知对特定默认值的任何更新。 您还可以在默认通知中心上注册didChangeNotification的观察员，以便收到有关本地默认数据库的所有更新的通知。

### 5.在托管环境中使用默认值

### 6.沙箱注意事项

### 7.UserDefaults类是线程安全的。



# 二、How to use

* Swift 3 and above

### Store

```swift
UserDefaults.standard.set(true, forKey: "Key")      //Bool
UserDefaults.standard.set(1, forKey: "Key")         //Integer
UserDefaults.standard.set("TEST", forKey: "Key")    //setObject
```

### Retrieve

```swift
 UserDefaults.standard.bool(forKey: "Key")
 UserDefaults.standard.integer(forKey: "Key")
 UserDefaults.standard.string(forKey: "Key")
```

### Remove

```swift
 UserDefaults.standard.removeObject(forKey: "Key")
```

### Remove all Keys

```swift
 if let appDomain = Bundle.main.bundleIdentifier {
		UserDefaults.standard.removePersistentDomain(forName: appDomain)
 }
```







