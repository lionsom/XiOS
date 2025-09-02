

# 安全区域

## 旧版本

* SnapKit可以使用 `topLayoutGuide` 和 `bottomLayoutGuide` 对视图进行布局
* `topLayoutGuide` 和 `bottomLayoutGuide` 是 `ViewController` 的属性
* 两个属性在`iOS 11`已经被废弃

```swift
// topLayoutGuide
orangeView.snp.makeConstraints { (make) in
    make.top.equalTo(topLayoutGuide.snp.top) //  注意这里，topLayoutGuide的顶部
    make.left.equalTo(10)
    make.right.equalTo(-250)
    make.bottom.equalTo(bottomLayoutGuide.snp.bottom)
}
blueView.snp.makeConstraints { (make) in
    make.top.equalTo(topLayoutGuide.snp.bottom) //  注意这里，topLayoutGuide的底部
    make.right.equalTo(-10)
    make.left.equalTo(250)
    make.bottom.equalTo(bottomLayoutGuide.snp.bottom)
}

// bottomLayoutGuide
orangeView.snp.makeConstraints { (make) in
    make.top.equalTo(topLayoutGuide.snp.top) 
    make.left.equalTo(10)
    make.right.equalTo(-250)
    make.bottom.equalTo(bottomLayoutGuide.snp.top) // 注意这里，bottomLayoutGuide的顶部
}
blueView.snp.makeConstraints { (make) in
    make.top.equalTo(topLayoutGuide.snp.top)
    make.right.equalTo(-10)
    make.left.equalTo(250)
    make.bottom.equalTo(bottomLayoutGuide.snp.bottom) // 注意这里，bottomLayoutGuide的底部
}
```





## safeAreaLayoutGuide

* 这里的`safeAreaLayoutGuide`不再是`ViewController`的属性，而是`View`的属性

```swift
magentaView.snp.makeConstraints { (make) in
    make.top.equalTo(view.safeAreaLayoutGuide.snp.top)
    make.left.right.equalToSuperview()
    make.bottom.equalTo(view.safeAreaLayoutGuide.snp.bottom)
}
```

